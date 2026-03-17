from rest_framework import status, generics, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import User
from .serializers import UserSerializer, RegisterSerializer, MyTokenObtainPairSerializer

# MyTokenObtainPairView for login with email
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# RegisterView for user registration
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        tokens = MyTokenObtainPairSerializer.get_token(user)
        return Response({
            'user': UserSerializer(user).data,
            'refresh': str(tokens),
            'access': str(tokens.access_token),
            'message': 'User registered successfully'
        }, status=status.HTTP_201_CREATED)

# UserProfileView to get current user's profile
class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return self.request.user

# AdminUserListView to list all users (admin only)
class AdminUserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    def get(self, request, *args, **kwargs):
        if request.user.role != 'Admin':
            return Response({'error': 'Only admins can view user list'}, status=status.HTTP_403_FORBIDDEN)
        return super().get(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        if request.user.role != 'Admin':
            return Response({'error': 'Only admins can edit users'}, status=status.HTTP_403_FORBIDDEN)
        user_id = request.data.get('id')
        if not user_id:
            return Response({'id': 'User id is required'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = UserSerializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, *args, **kwargs):
        if request.user.role != 'Admin':
            return Response({'error': 'Only admins can delete users'}, status=status.HTTP_403_FORBIDDEN)
        user_id = request.data.get('id')
        if not user_id:
            return Response({'id': 'User id is required'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
