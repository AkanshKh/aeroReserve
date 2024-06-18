from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .models import Flight,Place, Ticket, Week, Passenger
from django.contrib.auth.models import User
from .serializers import FlightSerializer, PlaceSerializer, TicketSerializer, WeekSerializer, PassengerSerializer, UserSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
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

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get("username")
    password = request.data.get("password")
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return Response({"message": "Login successful"}, status=200)
    else:
        return Response({"message": "Invalid username and/or password"}, status=400)

@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    fname = request.data['firstname']
    lname = request.data['lastname']
    username = request.data["username"]
    email = request.data["email"]
    password = request.data["password"]
    confirmation = request.data["confirmation"]

    if password != confirmation:
        return Response({"message": "Passwords must match."}, status=400)

    try:
        user = User.objects.create_user(username, email, password)
        user.first_name = fname
        user.last_name = lname
        user.save()
    except:
        return Response({"message": "Username already taken."}, status=400)
    
    login(request, user)
    return Response({"message": "Registration successful"}, status=200)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    logout(request)
    return Response({"message": "Logout successful"}, status=200)

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
