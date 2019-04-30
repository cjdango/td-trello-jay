from rest_framework import serializers

from .models import Board, List


class BoardSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="boards:board_fetch")
    owner = serializers.PrimaryKeyRelatedField(read_only=True)
    members = serializers.PrimaryKeyRelatedField(read_only=True, many=True)
    
    class Meta:
        model = Board
        fields = ['pk', 'url', 'title', 'owner', 'members']

    def create(self, validated_data):
        board = Board.objects.create(**validated_data)
        board.members.add(validated_data['owner'])
        return board


class ListSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="boards:list_fetch")
    board = serializers.PrimaryKeyRelatedField(read_only=True)
    
    class Meta:
        model = List
        fields = ['pk', 'url', 'position', 'board', 'title']

    def create(self, validated_data):
        lst = List.objects.create(**validated_data)
        return lst

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.position = validated_data.get('position', instance.position)
        instance.save()
        return instance
