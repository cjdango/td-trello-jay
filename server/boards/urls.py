from django.urls import path
from .views import BoardAPI, ListAPI

board_create = BoardAPI.as_view({
    'post': 'create',
    'get': 'all'
})

board_fetch = BoardAPI.as_view({
    'get': 'fetch',
    'put': 'update',
})

list_create = ListAPI.as_view({
    'post': 'create',
    'get': 'all',
})

list_fetch = ListAPI.as_view({
    'get': 'fetch',
    'put': 'update',
})

app_name = 'boards'
urlpatterns = [
    # BOARDS ENDPOINTS
    path('', board_create, name='board_create'),
    path('<int:pk>/', board_fetch, name='board_fetch'),

    # LISTS ENDPOINTS
    path('<int:board_pk>/lists/', list_create, name='list_create'),
    path('lists/<int:pk>/', list_fetch, name='list_fetch'),
]