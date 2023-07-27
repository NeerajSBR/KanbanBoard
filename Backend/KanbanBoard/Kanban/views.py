from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import *
from rest_framework import status
from .models import *
from django.contrib.auth.hashers import make_password, check_password


# Create your views here
class GetData(APIView):    #Get fucntion
    def get(self, request, pk=None):
        pass
    
class PostData(APIView):   #Post fucntion
    def post(self, request, pk):
        pass

class PutData(APIView):    #Put fucntion
    def put(self, request, pk):
        pass
    
class DeletData(APIView):  #Delete fucntion
    def delete(self, request, pk):
        pass
    

class UsersTB(GetData, PostData, PutData, DeletData):  #User table CRED
    def get(self, request, pk=None ):
        if pk == None:
            users = Users.objects.all()  
            serialized = UserSerializer(users, many=True)
            nullChecker(serialized)
            return JsonResponse(serialized.data, safe=False)       
        try:                     
            users = Users.objects.filter(user_id = pk)
            if users.exists():
                serialized = UserSerializer(users, many = True)
                return JsonResponse(serialized.data, status = status.HTTP_200_OK, safe=False) 
            return JsonResponse(f"Your key {pk} is not in our database", status = status.HTTP_400_BAD_REQUEST, safe=False)  
        except ValueError:         
            return JsonResponse(f"Input for key is not an integer", status = status.HTTP_400_BAD_REQUEST, safe=False)

    def post(self, request):
        serialized = UserSerializer(data = request.data)
        
        if serialized.is_valid() :
            serialized.save()
            return JsonResponse(serialized.data, status.HTTP_201_CREATED, safe=False)      
        # except AttributeError:  
        return JsonResponse(serialized.errors, status = status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, pk):
        users = Users.objects.get(user_id = pk)
        serialized = UserSerializer(users, data = request.data)
        if serialized.is_valid():
            serialized.save()
            return JsonResponse(serialized.data, status = status.HTTP_200_OK, safe=False)        
        return Response(serialized.errors, status = status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, pk):
        users = Users.objects.get(user_id = pk)        
        users.delete()
        return JsonResponse("Deleted", status = status.HTTP_200_OK, safe=False)
        
                            
class CardsTB(GetData, PostData, PutData, DeletData):  #Cards table CRED
    def get(self, request, pk=None):
        if pk == None:
            cards = Cards.objects.all()
            serialized = CardSerializer(cards, many=True)
            return JsonResponse(serialized.data, safe=False)
        try:                     
            cards = Cards.objects.filter(card_id = pk)
            if cards.exists():
                serialized = CardSerializer(cards, many = True)
                return JsonResponse(serialized.data, status = status.HTTP_200_OK, safe=False) 
            return JsonResponse(f"Your key {pk} is not in our database", status = status.HTTP_400_BAD_REQUEST, safe=False)  
        except ValueError:         
            return JsonResponse(f"Input for key is not an integer", status = status.HTTP_400_BAD_REQUEST, safe=False)
    
    def post(self, request):
        serialized = CardSerializer(data = request.data)
        if serialized.is_valid() :
            serialized.save()
            return JsonResponse(serialized.data, status = status.HTTP_201_CREATED, safe=False)        
        return JsonResponse(serialized.errors, status = status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, pk):
        cards = Cards.objects.get(card_id = pk)
        serialized = CardSerializer(cards, data = request.data)
        if serialized.is_valid():
            serialized.save()
            return JsonResponse(serialized.data, status = status.HTTP_200_OK, safe=False)        
        return Response(serialized.errors, status = status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, pk):
        cards = Cards.objects.get(card_id = pk)    
        cards.delete()
        return JsonResponse("deleted", status = status.HTTP_200_OK, safe=False)
    
class ListTB(GetData, PostData, PutData, DeletData):   #List table CRED
    def get(self, request, pk=None):
        if pk == None:
            list = List.objects.all()
            serialized = ListSerializer(list, many=True)
            return JsonResponse(serialized.data, safe=False)
        try:                     
            lists = List.objects.filter(list_id = pk)
            if lists.exists():
                serialized = ListSerializer(lists, many = True)
                return JsonResponse(serialized.data, status = status.HTTP_200_OK, safe=False) 
            return JsonResponse(f"Your key {pk} is not in our database", status = status.HTTP_400_BAD_REQUEST, safe=False)  
        except ValueError:         
            return JsonResponse(f"Input for key is not an integer", status = status.HTTP_400_BAD_REQUEST, safe=False)
    
    def post(self, request):
        serialized = ListSerializer(data = request.data)
        if serialized.is_valid() :
            serialized.save()
            return JsonResponse(serialized.data,status = status.HTTP_201_CREATED, safe=False)        
        return JsonResponse(serialized.errors, status = status.HTTP_400_BAD_REQUEST)
        
    def put(self, request, pk):
        lists = List.objects.get(list_id = pk)
        serialized = ListSerializer(lists, data = request.data)
        if serialized.is_valid():
            serialized.save()
            return JsonResponse(serialized.data, status = status.HTTP_200_OK, safe=False)
        return Response(serialized.errors, status = status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, pk):
        lists = List.objects.get(list_id = pk)
        lists.delete()
        return JsonResponse("deleted", status = status.HTTP_200_OK, safe=False)
    
# class CommitTB(GetData, PostData, PutData, DeletData):    #Commit table CRED
#     def get(self, request, pk=None):
#         if pk==None:
#             comment = Committ.objects.all()
#             serialized = CommitSerializer(comment, many = True)
#             return JsonResponse(serialized.data, safe = False)
#         try:                     
#             comment = Committ.objects.filter(committ_id = pk)
#             if comment.exists():
#                 serialized = CommitSerializer(comment, many = True)
#                 return JsonResponse(serialized.data, status = status.HTTP_200_OK, safe=False) 
#             return JsonResponse(f"Your key {pk} is not in our database", status = status.HTTP_400_BAD_REQUEST, safe=False)  
#         except ValueError:         
#             return JsonResponse(f"Input for key is not an integer", status = status.HTTP_400_BAD_REQUEST, safe=False)
    
#     def post(self, request):
#         serialized = CommitSerializer(data = request.data)
#         if serialized.is_valid() :
#             serialized.save()
#             return JsonResponse(serialized.data, status = status.HTTP_201_CREATED, safe=False)        
#         return JsonResponse(serialized.errors, status = status.HTTP_400_BAD_REQUEST)
    
#     def put(self, request, pk):
#         commits = Committ.objects.get(committ_id = pk)
#         serialized = CommitSerializer(commits, data = request.data)
#         if serialized.is_valid():
#             serialized.save()
#             return JsonResponse(serialized.data, status = status.HTTP_200_OK, safe=False)
#         return Response(serialized.errors, status = status.HTTP_400_BAD_REQUEST)
        
#     def delete(self, request, pk):
#         commits = Committ.objects.get(committ_id = pk)
#         commits.delete()
#         return JsonResponse("Deleted", status = status.HTTP_200_OK , safe=False)
    

class AuthUser(APIView): 
    def put(self, request):
        try:
            emailFilter = request.data.get('emailid')
            userPasswordFilter =  request.data.get('password')   
            print("Password: ",userPasswordFilter)
            #print(emailFilter, "password:", userPasswordFilter)
            try:       
                newus = Users.objects.get(emailid = emailFilter)          
            except:
                return JsonResponse("Not a registered user", status = status.HTTP_400_BAD_REQUEST, safe = False)
 
            if check_password(userPasswordFilter, newus.password):
                return JsonResponse({"empname": newus.user_name,    
                                     "empid": newus.user_id},status = status.HTTP_200_OK, safe = False)
            return JsonResponse("Email or Password incorrect", status = status.HTTP_401_UNAUTHORIZED, safe= False)
        except:
            return JsonResponse("No response received", status = status.HTTP_400_BAD_REQUEST, safe = False)
        
    def post(self,  request):
        try:
            emailFilter = request.data.get('emailid')
            uname = request.data.get('user_name')
            passie = make_password(request.data.get('password'))
            #userPasswordFilter = request.data.get('password')
            print("unam: ",uname,"email:",emailFilter,"passie", passie)
            try:
                newus = Users.objects.get(emailid = emailFilter)
                return JsonResponse("User Exists", status = status.HTTP_201_CREATED, safe = False)
            except:
                newus = Users.objects.create(user_name = uname, 
                                             emailid = emailFilter, 
                                             password =  passie )
                print(newus)
                newus.save()
                return JsonResponse("Account created", status = status.HTTP_200_OK, safe = False)
        except:
            return JsonResponse("Internal server error", status = status.HTTP_400_BAD_REQUEST, safe = False)
            
            
    # def post (self, request):
    #     return
            
        
    

    
def nullChecker (value) :
    if value == "":
        return JsonResponse(status = status.HTTP_204_NO_CONTENT)
    
