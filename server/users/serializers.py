from collections import defaultdict
import os
import gzip

from django.core import exceptions
from django.conf import settings
import django.contrib.auth.password_validation as validators
from django.contrib.auth.tokens import default_token_generator
from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import EmailMultiAlternatives
from django.template import loader
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django import __file__ as django_dir

from rest_framework import serializers

from .models import User, ResetPassToken


class UserAuthSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        users = User.objects.filter(email=email)
        user = users.first()
        if not users or not user.check_password(password):
            raise serializers.ValidationError("Email/Password is incorrect. Please try again.")

        self.user = user
        return data


class UserSerializer(serializers.ModelSerializer):
    """Serializer of a user"""
    password2 = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)

    PASS_MIN_LENGTH = 8

    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'password', 'password2']
    
    def __init__(self, *args, **kwargs): 
        super(UserSerializer, self).__init__(*args, **kwargs)
        self._store_common_passwords()
        
    def _store_common_passwords(self):
        """
        Open and save common passwords into 
        self.commont_passwords for validation reference
        """
        pass_list_path = os.path.dirname(django_dir) + '/contrib/auth/common-passwords.txt.gz'
        try:
            with gzip.open(str(pass_list_path)) as f:
                common_passwords_lines = f.read().decode().splitlines()
        except IOError:
            with open(str(pass_list_path)) as f:
                common_passwords_lines = f.readlines()
        
        self.common_passwords = {p.strip() for p in common_passwords_lines}


    def validate(self, data):
        password = data['password']
        password2 = data['password2']

        if password != password2:
            raise serializers.ValidationError({
                'password2': ["Passwords does not match"]
            })            

        return data
    
    def validate_password(self, password):
        if password.isdigit():
            raise serializers.ValidationError('This password is entirely numeric.')
            
        if password in self.common_passwords:
            raise serializers.ValidationError('This password is too common.')

        if len(password) < self.PASS_MIN_LENGTH:
            raise serializers.ValidationError(f'This password is too short. It must contain at least {self.PASS_MIN_LENGTH} characters.')

        return password
        
    def create(self, validated_data):
        user_data = dict(self.validated_data)
        user_data.pop('password2')
        user = User.objects.create_user(**user_data)
        user.set_password(user_data['password'])
        user.save()
        return user


class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=254)

    SUBJECT_TEMPLATE_NAME = 'registration/password_reset_subject.txt'
    EMAIL_TEMPLATE_NAME = 'registration/password_reset_email.html'

    def send_mail(self, context, to_email):
        """
        Send a django.core.mail.EmailMultiAlternatives to `to_email`.
        """
        subject = loader.render_to_string(self.SUBJECT_TEMPLATE_NAME, context)

        # Email subject *must not* contain newlines
        subject = ''.join(subject.splitlines())
        body = loader.render_to_string(self.EMAIL_TEMPLATE_NAME, context)

        email_message = EmailMultiAlternatives(subject, body, to=[to_email])
        email_message.send()


    def save_reset_token(self):
        """
        Generate a one-use only link for resetting password and send it to the
        user.
        """
        email = self.validated_data["email"]
        user = User.objects.filter(email__iexact=email).first()
        if user and user.has_usable_password():
            context = {
                'domain': settings.CLIENT_IP,
                'site_name': settings.SITE_NAME,
                'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                'token': default_token_generator.make_token(user),
            }

            reset_pass_token = ResetPassToken.objects.get_or_create(uid=context['uid'], token=context['token'])

            self.send_mail(context, email)     


class SetPasswordSerializer(serializers.Serializer):
    """
    A serializer that lets a user change set their password without entering the old
    password
    """
    new_password1 = serializers.CharField()
    new_password2 = serializers.CharField()

    def __init__(self, user, *args, **kwargs):
        self.user = user
        super().__init__(*args, **kwargs)

    def validate(self, data):
        password1 = data['new_password1']
        password2 = data['new_password2']

        errors = defaultdict(list)

        if password1 and password2:
            if password1 != password2:
                errors['password'] = ["Passwords does not match"]

        try:
            validators.validate_password(password=password2, user=self.user)
        except exceptions.ValidationError as e:
            errors['password'] += list(e.messages)

        if errors:
            raise serializers.ValidationError(errors)

        return data
    
    def save(self, commit=True):
        password = self.validated_data["new_password1"]
        self.user.set_password(password)
        if commit:
            self.user.save()
        return self.user