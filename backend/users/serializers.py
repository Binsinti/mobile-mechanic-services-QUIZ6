from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'first_name', 'last_name', 'phone_number', 
                  'location', 'gender', 'role', 'merchant_id', 'created_at']
        read_only_fields = ['id', 'created_at', 'merchant_id']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(min_length=8, write_only=True)
    confirm_password = serializers.CharField(min_length=8, write_only=True)
    
    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'confirm_password', 'phone_number',
                  'first_name', 'last_name', 'location', 'gender']
    
    def validate(self, data):
        if data['password'] != data.pop('confirm_password'):
            raise serializers.ValidationError({"password": "Passwords do not match"})
        return data
    
    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            password=validated_data['password'],
            phone_number=validated_data.get('phone_number', ''),
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            location=validated_data.get('location', ''),
            gender=validated_data.get('gender', ''),
            role='User'  # Default role
        )
        return user

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = User.EMAIL_FIELD

    def validate(self, attrs):
        if 'email' in attrs and User.EMAIL_FIELD not in attrs:
            attrs[User.EMAIL_FIELD] = attrs['email']
        data = super().validate(attrs)
        data['user'] = UserSerializer(self.user).data
        return data
    
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        token['username'] = user.username
        token['role'] = user.role
        token['user_id'] = user.id
        return token
