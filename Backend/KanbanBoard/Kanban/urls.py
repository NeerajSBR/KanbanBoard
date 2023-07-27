from django.urls import path
from .views import * 



urlpatterns = [
     path('users/', UsersTB.as_view(), name = 'ToUsers'), #Get, Post to user table with api path
     path('users/<str:pk>/', UsersTB.as_view(), name = "ToUsersByID"),  #Get, Put, Delete from user table with key
     path('lists/', ListTB.as_view(), name = "ToList"),  #Get, Post to lists table with api path
     path('lists/<str:pk>/', ListTB.as_view(), name = "ToListByID"), #Get, Put, Delete from lists table with key
     path('cards/', CardsTB.as_view(), name = "ToCards"),  #Get, Post to cards table with api path
     path('cards/<str:pk>/', CardsTB.as_view(), name = "ToCardsById"), #Get, Put, Delete from cars table with key
     path('auth/', AuthUser.as_view(), name = "To User table")
     # path('commits/', CommitTB.as_view(), name = "ToCommit"),  Get, Post to commit table with api path
     # path('commits/<str:pk>/', CommitTB.as_view(), name = "ToCommitById"), Get, Put, Delete from commit table with key
]