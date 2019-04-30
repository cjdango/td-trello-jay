from rest_framework import permissions

from boards.models import Board, List


class IsMember(permissions.BasePermission):
    """
    Object-level permission to only allow members of an object to edit it.
    Assumes the model instance has an `members` attribute.
    """

    def has_object_permission(self, request, view, obj):
        # Instance must have an attribute named `members`.
        if isinstance(obj, Board):
            return obj.members.filter(pk=request.user.pk).exists()
        elif isinstance(obj, List):
            return obj.board.members.filter(pk=request.user.pk).exists()
         