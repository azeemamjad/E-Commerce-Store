from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id', 'profile_pic', 'full_name', 'username', 'email', 'member_since',
            'is_active', 'is_staff', 'is_superuser'
        ]
        read_only_fields = ['id', 'member_since', 'is_active', 'is_staff', 'is_superuser']


