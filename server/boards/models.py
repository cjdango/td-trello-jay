import ast

from decimal import Decimal

from django.db import models
from django.contrib.auth import get_user_model


class Board(models.Model):
    title = models.CharField(max_length=50)
    owner = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        related_name='board_owned_set')
    members = models.ManyToManyField(
        get_user_model(), related_name='board_set')
    is_archived = models.BooleanField(default=False)
    lists_positions = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.title

    def get_sorted_lists(self, *args, **kwargs):
        lists = self.list_set.all().in_bulk()

        if self.lists_positions:
            lists_positions = ast.literal_eval(self.lists_positions)
            lists = [lists.get(x) for x in lists_positions if lists.get(x)]
        return lists


class List(models.Model):
    title = models.CharField(max_length=50)
    board = models.ForeignKey(Board, on_delete=models.CASCADE)
    is_archived = models.BooleanField(default=False)
    cards_positions = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.title

    def get_sorted_cards(self, *args, **kwargs):
        cards = self.card_set.all().in_bulk()

        if self.cards_positions:
            cards_positions = ast.literal_eval(self.cards_positions)
            cards = [cards.get(x) for x in cards_positions if cards.get(x)]
        return cards

class Card(models.Model):
    title = models.CharField(max_length=50)
    lst = models.ForeignKey(List, on_delete=models.CASCADE)
    is_archived = models.BooleanField(default=False)

    def __str__(self):
        return self.title
