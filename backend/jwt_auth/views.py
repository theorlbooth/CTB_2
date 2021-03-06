from datetime import datetime, timedelta
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from django.conf import settings
from django.contrib.auth import get_user_model
import jwt
from .serializers.common import UserSerializer

# from django.views.decorators.csrf import csrf_exempt


User = get_user_model()

class RegisterView(APIView):

    def post(self, request):
        user_to_create = UserSerializer(data=request.data)
        if user_to_create.is_valid():
            user_to_create.save()
            return Response({ 'message': 'Registration Successful' }, status=status.HTTP_201_CREATED)
        return Response(user_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class LoginView(APIView):

    # @csrf_exempt
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            user_to_login = User.objects.get(email=email)
        except User.DoesNotExist:
            raise PermissionDenied(detail='Invalid Credentials')

        if not user_to_login.check_password(password):
            raise PermissionDenied(detail='Invalid Credentials')

        expiry_time = datetime.now() + timedelta(days=1)
        token = jwt.encode(
          { 'sub': user_to_login.id, 'exp': int(expiry_time.strftime('%s')) },
          settings.SECRET_KEY,
          algorithm='HS256'
        )
        return Response(
          { 'token': token, 'message': f'Welcome Back {user_to_login.username}' }
        )
