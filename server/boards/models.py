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

    def __str__(self):
        return self.title


class List(models.Model):
    title = models.CharField(max_length=50)
    board = models.ForeignKey(Board, on_delete=models.CASCADE)
    is_archived = models.BooleanField(default=False)
    cards_positions = models.TextField(null=True)

    def __str__(self):
        return self.title

    @classmethod
    def get_next_pos(self, *args, **kwargs):
        """Generate the next list position. (card_with_highest_position + 1)"""
        max_pos = List.objects.all().aggregate(models.Max('position'))
        return (max_pos.get('position__max') or 0) + 1


class Card(models.Model):
    title = models.CharField(max_length=50)
    lst = models.ForeignKey(List, on_delete=models.CASCADE)
    is_archived = models.BooleanField(default=False)

    def __str__(self):
        return self.title
