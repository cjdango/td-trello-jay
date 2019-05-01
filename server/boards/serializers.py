from rest_framework import serializers

from .models import Board, List, Card


class BoardSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="boards:board_fetch")
    owner = serializers.PrimaryKeyRelatedField(read_only=True)
    members = serializers.PrimaryKeyRelatedField(read_only=True, many=True)
    is_archived = serializers.BooleanField(write_only=True)
    
    class Meta:
        model = Board
        fields = ['pk', 'url', 'title', 'is_archived', 'owner', 'members']

    def create(self, validated_data):
        board = Board.objects.create(**validated_data)
        board.members.add(validated_data['owner'])
        return board
    
    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.is_archived = validated_data.get('is_archived', instance.is_archived)
        instance.save()
        return instance


class ListSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="boards:list_fetch")
    board = serializers.PrimaryKeyRelatedField(read_only=True)
    is_archived = serializers.BooleanField(write_only=True)
    
    class Meta:
        model = List
        fields = ['pk', 'url', 'position', 'is_archived', 'board', 'title']


class CardSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="boards:card_fetch")
    lst = serializers.PrimaryKeyRelatedField(queryset=List.objects.all())
    is_archived = serializers.BooleanField(write_only=True)
    
    class Meta:
        model = Card
        fields = ['pk', 'url', 'position', 'is_archived', 'lst', 'title']
