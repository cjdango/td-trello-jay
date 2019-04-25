from rest_framework import serializers

from .models import Board


class BoardSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="boards:fetch")
    owner = serializers.PrimaryKeyRelatedField(read_only=True)
    members = serializers.PrimaryKeyRelatedField(read_only=True, many=True)
    
    class Meta:
        model = Board
        fields = ['pk', 'url', 'title', 'owner', 'members']

    def create(self, validated_data):
        board = Board.objects.create(**validated_data)
        board.members.add(validated_data['owner'])
        return board
