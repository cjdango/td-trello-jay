from django.shortcuts import render, get_object_or_404

from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from  rest_framework.permissions import IsAuthenticated

from core.permissions import IsMember
from .models import Board
from .serializers import BoardSerializer


class BoardAPI(ViewSet):
    """Board API"""
    permission_classes = (IsAuthenticated, IsMember,)

    def create(self, *args, **kwargs):
        user = self.request.user
        serializer = BoardSerializer(data=self.request.data, context={'request': self.request})

        if serializer.is_valid():
            serializer.save(owner=user)
            return Response(serializer.data, status=200)

        return Response(serializer.errors, status=400)
    
    def list(self, *args, **kwargs):
        boards = Board.objects.filter(members=self.request.user, is_archived=False)
        serializer = BoardSerializer(boards, context={'request': self.request}, many=True)
        return Response(serializer.data, status=200)
    
    def fetch(self, *args, **kwargs):
        board = get_object_or_404(Board, pk=kwargs['pk'], is_archived=False)
        self.check_object_permissions(self.request, board)

        serializer = BoardSerializer(board, context={'request': self.request})
        return Response(serializer.data, status=200)