import ast

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

class CardSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="boards:card_fetch")
    lst = serializers.PrimaryKeyRelatedField(queryset=List.objects.all())
    is_archived = serializers.BooleanField(write_only=True)
    
    class Meta:
        model = Card
        fields = ['pk', 'url', 'is_archived', 'lst', 'title']

    def create(self, validated_data):
        card = Card.objects.create(**validated_data)
        lst = card.lst

        if lst.cards_positions:
            cards_positions = ast.literal_eval(lst.cards_positions)
            cards_positions.append(card.pk)
        else:
            cards_positions = [card.pk]

        lst.cards_positions = cards_positions
        lst.save()

        return card

class ListSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="boards:list_fetch")
    board = serializers.PrimaryKeyRelatedField(read_only=True)
    is_archived = serializers.BooleanField(write_only=True)
    card_set = serializers.SerializerMethodField()
    
    class Meta:
        model = List
        fields = ['pk', 'url', 'cards_positions', 'is_archived', 'board', 'title', 'card_set']

    def get_card_set(self, instance):
        cards = instance.card_set.all().in_bulk()

        if instance.cards_positions:
            cards_positions = ast.literal_eval(instance.cards_positions)
            cards = [cards.get(x) for x in cards_positions if cards.get(x)]

        return CardSerializer(
            cards, 
            context={'request': self.context['request']},
            many=True
        ).data


