from rest_framework import viewsets, permissions,status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import ValidationError

from .models import Flight,Place, Ticket, Week, Passenger
from django.contrib.auth.models import User
from .serializers import FlightSerializer, PlaceSerializer, TicketSerializer, WeekSerializer, PassengerSerializer, UserSerializer, UserLoginSerializer, UserRegisterSerializer
from django.contrib.auth import authenticate, login, logout

# viewsets define the view behavior.
class FlightViewSet(viewsets.ModelViewSet):
    queryset = Flight.objects.all()
    serializer_class = FlightSerializer
    permission_classes = [AllowAny]

class PlaceViewSet(viewsets.ModelViewSet):
    queryset = Place.objects.all()
    serializer_class = PlaceSerializer
    permission_classes = [AllowAny]

class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    permission_classes = [IsAuthenticated]

class WeekViewSet(viewsets.ModelViewSet):
    queryset = Week.objects.all()
    serializer_class = WeekSerializer
    permission_classes = [AllowAny]

class PassengerViewSet(viewsets.ModelViewSet):
    queryset = Passenger.objects.all()
    serializer_class = PassengerSerializer
    permission_classes = [IsAuthenticated]

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

@api_view(['GET'])
@permission_classes([AllowAny])
def query(request, q):
    places = Place.objects.all()
    filters = []
    q = q.lower()
    for place in places:
        if (q in place.city.lower()) or (q in place.airport.lower()) or (q in place.code.lower()) or (q in place.country.lower()):
            filters.append(place)
    serializer = PlaceSerializer(filters, many=True)
    return Response(serializer.data, status=200)

# somebody once told me the world is gonna roll me i aint the sharpest tool in the shed she was looking kind of dumb with her finger and her thumb in the shape of an L on her forehead well the years start coming and they dont stop coming fed to the rules and i hit the ground running didnt make sense not to live for fun your brain gets smart but your head gets dumb so much to do so much to see so whats wrong with taking the back streets youll never know if you dont go youll never shine if you dont glow hey now youre an all star get your game on go play hey now youre a rock star get the show on get paid and all that glitters is gold only shooting stars break the mold its a cool place and they say it gets colder youre bundled up now wait till you get older but the meteor 

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .serializers import UserLoginSerializer

@api_view(['POST'])
@permission_classes([AllowAny])
def user_login(request):
    serializer = UserLoginSerializer(data=request.data)
    if serializer.is_valid():
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            response = {
                'success': True,
                'username': user.username,
                'email': user.email,
                'token': token.key
            }
            return Response(response, status=status.HTTP_200_OK)
        else:
            response = {
                'success': False,
                'detail': 'Invalid username or password'
            }
            return Response(response, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def user_register(request):
    serializer = UserRegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        response = {
            'success': True,
            'user': serializer.data,
            'token': Token.objects.get(user=User.objects.get(username=serializer.data['username'])).key
        }
        return Response(response, status=status.HTTP_200_OK)
    raise ValidationError(serializer.errors, code=status.HTTP_406_NOT_ACCEPTABLE)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def user_logout(request):
    token = Token.objects.get(user=request.user)
    token.delete()
    return Response({"success": True, "detail": "Logged out!"}, status=status.HTTP_200_OK)

