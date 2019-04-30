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
    position = models.DecimalField(unique=True, max_digits=10, decimal_places=5)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['position']

    def save(self, *args, **kwargs):
        if self.position is None:
            max_pos = List.objects.all().aggregate(models.Max('position'))
            self.position = (max_pos.get('position__max') or 0) + 1

        return super(List, self).save(*args, **kwargs)


class Card(models.Model):
    title = models.CharField(max_length=50)
    lst = models.ForeignKey(List, on_delete=models.CASCADE)
    is_archived = models.BooleanField(default=False)
    position = models.DecimalField(unique=True, max_digits=10, decimal_places=5)

    class Meta:
        ordering = ['position']

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if self.position is None:
            max_pos = Card.objects.all().aggregate(models.Max('position'))
            self.position = (max_pos.get('position__max') or 0) + 1

        return super(Card, self).save(*args, **kwargs)