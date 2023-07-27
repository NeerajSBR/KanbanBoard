from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):  #User table Serializer 
    class Meta:
        model = Users
        fields = '__all__'
        

class CardSerializer(serializers.ModelSerializer):  #Card table Serializer 
    class Meta:
        model = Cards
        fields = '__all__'
 
class ListSerializer(serializers.ModelSerializer):  #List table Serializer 
    class Meta:
        model = List
        fields = '__all__'
        
# class CommitSerializer(serializers.ModelSerializer):   #Commit table Serializer 
#     class Meta:
#         model = Committ
#         fields = '__all__'
               
        
        
        
