from rest_framework import serializers

from .models import Board, List, Card


class BoardSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="boards:board_fetch")
    owner = serializers.PrimaryKeyRelatedField(read_only=True)
    members = serializers.PrimaryKeyRelatedField(read_only=True, many=True)
    
    class Meta:
        model = Board
        fields = ['pk', 'url', 'title', 'is_archived', 'owner', 'members']

    def create(self, validated_data):
        board = Board.objects.create(**validated_data)
        board.members.add(validated_data['owner'])
        return board


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
