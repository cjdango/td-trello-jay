import ast

from django.shortcuts import render, get_object_or_404

from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from  rest_framework.permissions import IsAuthenticated

from core.permissions import IsMember
from .models import Board, List, Card
from .serializers import BoardSerializer, ListSerializer, CardSerializer


class BoardAPI(ViewSet):
    """Board API"""
    permission_classes = (IsAuthenticated, IsMember,)

    def create(self, *args, **kwargs):
        initial_data = {
            **self.request.data,
            'is_archived': False
        }
        serializer = BoardSerializer(data=initial_data, context={'request': self.request})

        serializer.is_valid(raise_exception=True)
        user = self.request.user
        serializer.save(owner=user)
        return Response(serializer.data, status=200)
    
    def update(self, *args, **kwargs):
        board = get_object_or_404(Board, pk=kwargs['pk'], is_archived=False)
        self.check_object_permissions(self.request, board)
        serializer = BoardSerializer(
            board, 
            data=self.request.data, 
            context={'request': self.request},
            partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=200)

    
    def all(self, *args, **kwargs):
        boards = Board.objects.filter(members=self.request.user, is_archived=False)
        serializer = BoardSerializer(boards, context={'request': self.request}, many=True)
        return Response(serializer.data, status=200)
    
    def fetch(self, *args, **kwargs):
        board = get_object_or_404(Board, pk=kwargs['pk'], is_archived=False)
        self.check_object_permissions(self.request, board)

        serializer = BoardSerializer(board, context={'request': self.request})
        return Response(serializer.data, status=200)


class ListAPI(ViewSet):
    """List API"""
    permission_classes = (IsAuthenticated, IsMember,)

    def create(self, *args, **kwargs):
        board = get_object_or_404(Board, pk=kwargs.get('board_pk'), is_archived=False)
        self.check_object_permissions(self.request, board)

        initial_data = {
            **self.request.data,
            'is_archived': False
        }

        serializer = ListSerializer(data=initial_data, context={'request': self.request})
        serializer.is_valid(raise_exception=True)
        serializer.save(board=board)
        return Response(serializer.data, status=201)

    def all(self, *args, **kwargs):
        board = get_object_or_404(Board, pk=kwargs['board_pk'], is_archived=False)
        self.check_object_permissions(self.request, board)

        lists = List.objects.filter(board=board, is_archived=False)
        serializer = ListSerializer(lists, context={'request': self.request}, many=True)
        return Response(serializer.data, status=200)

    def fetch(self, *args, **kwargs):
        lst = get_object_or_404(List, pk=kwargs['pk'], is_archived=False)
        self.check_object_permissions(self.request, lst)
        
        serializer = ListSerializer(lst, context={'request': self.request})
        return Response(serializer.data, status=200)
    
    def update(self, *args, **kwargs):
        lst = get_object_or_404(List, pk=kwargs['pk'], is_archived=False)
        self.check_object_permissions(self.request, lst)

        data = {
            **self.request.data,
            'cards_positions': str(self.request.data['cards_positions'])
        }

        serializer = ListSerializer(
            lst, 
            data=data, 
            context={'request': self.request},
            partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=200)


class CardAPI(ViewSet):
    """Card API"""
    permission_classes = (IsAuthenticated, IsMember,)

    def create(self, *args, **kwargs):
        lst = get_object_or_404(List, pk=kwargs.get('list_pk'), is_archived=False)
        self.check_object_permissions(self.request, lst)

        initial_data = {
            **self.request.data,
            'lst': lst.pk,
            'position': Card.get_next_pos(),
            'is_archived': False
        }

        serializer = CardSerializer(data=initial_data, context={'request': self.request})
        serializer.is_valid(raise_exception=True)
        serializer.save(lst=lst)

        return Response(serializer.data, status=201)
    
    def all(self, *args, **kwargs):
        lst = get_object_or_404(List, pk=kwargs['list_pk'], is_archived=False)
        self.check_object_permissions(self.request, lst)

        cards = Card.objects.filter(lst=lst, is_archived=False).in_bulk()
        cards_positions = ast.literal_eval(lst.cards_positions)
        cards = [cards[x] for x in cards_positions]

        serializer = CardSerializer(cards, context={'request': self.request}, many=True)
        return Response(serializer.data, status=200)

    def fetch(self, *args, **kwargs):
        card = get_object_or_404(Card, pk=kwargs['pk'], is_archived=False)
        self.check_object_permissions(self.request, card)
        
        serializer = CardSerializer(card, context={'request': self.request})
        return Response(serializer.data, status=200)
    
    def update(self, *args, **kwargs):
        card = get_object_or_404(Card, pk=kwargs['pk'], is_archived=False)
        self.check_object_permissions(self.request, card)
        serializer = CardSerializer(
            card, 
            data=self.request.data, 
            context={'request': self.request},
            partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=200)
