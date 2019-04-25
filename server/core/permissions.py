from rest_framework import permissions


class IsMember(permissions.BasePermission):
    """
    Object-level permission to only allow members of an object to edit it.
    Assumes the model instance has an `members` attribute.
    """

    def has_object_permission(self, request, view, obj):
        # Instance must have an attribute named `members`.
        return obj.members.filter(pk=request.user.pk).exists()