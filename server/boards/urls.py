from django.urls import path
from .views import BoardAPI

board_create = BoardAPI.as_view({
    'post': 'create',
    'get': 'list'
})

board_fetch = BoardAPI.as_view({
    'get': 'fetch'
})

app_name = 'boards'
urlpatterns = [
    path('', board_create, name='create'),
    path('<int:pk>/', board_fetch, name='fetch')
]