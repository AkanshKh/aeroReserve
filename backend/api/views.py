from rest_framework import viewsets, permissions,status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import ValidationError

from .models import Flight,Place, Ticket, Week, Passenger
from django.contrib.auth.models import User
from .serializers import *
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import get_object_or_404
from django.http import JsonResponse, HttpResponse
from django.utils import timezone
from django.template.loader import get_template
from django.views.decorators.csrf import csrf_exempt

from io import BytesIO
from xhtml2pdf import pisa
import math
from datetime import datetime
import secrets
import os

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

# somebody once told me the world is gonna roll me i aint the sharpest tool in the shed she was looking kind of dumb with her finger and her thumb in the shape of an L on her forehead well the years start coming and they dont stop coming fed to the rules and i hit the ground running didnt make sense not to live for fun your brain gets smart but your head gets dumb so much to do so much to see so whats wrong with taking the back streets youll never know if you dont go youll never shine if you dont glow hey now youre an all star get your game on go play hey now youre a rock star get the show on get paid and all that glitters is gold only shooting stars break the mold its a cool place and they say it gets colder youre bundled up now wait till you get older but the meteor 
@api_view(['GET'])
@permission_classes([AllowAny])
@csrf_exempt
def query(request, q):
    places = Place.objects.all()
    filters = []
    q = q.lower()
    for place in places:
        if (q in place.city.lower()) or (q in place.airport.lower()) or (q in place.code.lower()) or (q in place.country.lower()):
            filters.append(place)
    serializer = PlaceSerializer(filters, many=True)
    return Response(serializer.data, status=200)


@api_view(['POST'])
@permission_classes([AllowAny])
@csrf_exempt
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
@csrf_exempt
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
@csrf_exempt
def user_logout(request):
    token = Token.objects.get(user=request.user)
    token.delete()
    return Response({"success": True, "detail": "Logged out!"}, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([AllowAny])
@csrf_exempt
def flight_search(request):
    serializer = FlightSearchSerializer(data=request.GET)
    
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    data = serializer.validated_data
    o_place = data.get('Origin')
    d_place = data.get('Destination')
    trip_type = data.get('TripType')
    depart_date = data.get('DepartDate')
    return_date = data.get('ReturnDate')
    seat = data.get('SeatClass')
    
    flightday = Week.objects.get(number=depart_date.weekday())
    destination = Place.objects.get(code=d_place.upper())
    origin = Place.objects.get(code=o_place.upper())
    
    if trip_type == '2' and return_date:
        flightday2 = Week.objects.get(number=return_date.weekday())
        origin2 = Place.objects.get(code=d_place.upper())
        destination2 = Place.objects.get(code=o_place.upper())

    if seat == 'economy':
        flights = Flight.objects.filter(depart_day=flightday, origin=origin, destination=destination).exclude(economy_fare=0).order_by('economy_fare')
        try:
            max_price = flights.last().economy_fare
            min_price = flights.first().economy_fare
        except AttributeError:
            max_price = 0
            min_price = 0

        if trip_type == '2':
            flights2 = Flight.objects.filter(depart_day=flightday2, origin=origin2, destination=destination2).exclude(economy_fare=0).order_by('economy_fare')
            try:
                max_price2 = flights2.last().economy_fare
                min_price2 = flights2.first().economy_fare
            except AttributeError:
                max_price2 = 0
                min_price2 = 0

    elif seat == 'business':
        flights = Flight.objects.filter(depart_day=flightday, origin=origin, destination=destination).exclude(business_fare=0).order_by('business_fare')
        try:
            max_price = flights.last().business_fare
            min_price = flights.first().business_fare
        except AttributeError:
            max_price = 0
            min_price = 0

        if trip_type == '2':
            flights2 = Flight.objects.filter(depart_day=flightday2, origin=origin2, destination=destination2).exclude(business_fare=0).order_by('business_fare')
            try:
                max_price2 = flights2.last().business_fare
                min_price2 = flights2.first().business_fare
            except AttributeError:
                max_price2 = 0
                min_price2 = 0

    elif seat == 'first':
        flights = Flight.objects.filter(depart_day=flightday, origin=origin, destination=destination).exclude(first_fare=0).order_by('first_fare')
        try:
            max_price = flights.last().first_fare
            min_price = flights.first().first_fare
        except AttributeError:
            max_price = 0
            min_price = 0

        if trip_type == '2':
            flights2 = Flight.objects.filter(depart_day=flightday2, origin=origin2, destination=destination2).exclude(first_fare=0).order_by('first_fare')
            try:
                max_price2 = flights2.last().first_fare
                min_price2 = flights2.first().first_fare
            except AttributeError:
                max_price2 = 0
                min_price2 = 0

    response_data = {
        'flights': list(flights.values()),
        'origin': origin.code,
        'destination': destination.code,
        'seat': seat.capitalize(),
        'trip_type': trip_type,
        'depart_date': depart_date,
        'max_price': math.ceil(max_price / 100) * 100,
        'min_price': math.floor(min_price / 100) * 100
    }

    if trip_type == '2':
        response_data.update({
            'flights2': list(flights2.values()),
            'origin2': origin2.code,
            'destination2': destination2.code,
            'return_date': return_date,
            'max_price2': math.ceil(max_price2 / 100) * 100,
            'min_price2': math.floor(min_price2 / 100) * 100
        })

    return Response(response_data, status=status.HTTP_200_OK)

FEE = 100

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@csrf_exempt
def review(request):
    serializer = ReviewRequestSerializer(data=request.GET)
    
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    data = serializer.validated_data
    flight_1_id = data['flight1Id']
    flight_1_date = data['flight1Date']
    seat_class = data['seatClass']
    flight_2_id = data.get('flight2Id')
    flight_2_date = data.get('flight2Date')

    flight1 = get_object_or_404(Flight, id=flight_1_id)
    flight1_departure_datetime = datetime.combine(flight_1_date, flight1.depart_time)
    flight1_arrival_datetime = flight1_departure_datetime + flight1.duration

    flight2 = None
    flight2_departure_datetime = None
    flight2_arrival_datetime = None

    if flight_2_id and flight_2_date:
        flight2 = get_object_or_404(Flight, id=flight_2_id)
        flight2_departure_datetime = datetime.combine(flight_2_date, flight2.depart_time)
        flight2_arrival_datetime = flight2_departure_datetime + flight2.duration

    # Calculate base fare
    if seat_class == 'first':
        base_fare = flight1.first_fare
        if flight2:
            base_fare += flight2.first_fare
    elif seat_class == 'business':
        base_fare = flight1.business_fare
        if flight2:
            base_fare += flight2.business_fare
    elif seat_class == 'economy':
        base_fare = flight1.economy_fare
        if flight2:
            base_fare += flight2.economy_fare
    else:
        base_fare = 0

    total_fare = base_fare + FEE

    response_data = {
        'flight1': {
            'id': flight1.id,
            'departure_datetime': flight1_departure_datetime,
            'arrival_datetime': flight1_arrival_datetime,
            'origin': flight1.origin.code,
            'destination': flight1.destination.code,
            'plane':flight1.plane,
            'airline':flight1.airline,
            'seat_class': seat_class,
            'base_fare': base_fare,
            'duration_hr': flight1.duration.seconds//3600,
            'duration_min': (flight1.duration.seconds%3600)//60,
        },
        'fee': FEE,
        'total_fare': total_fare
    }

    if flight2:
        response_data['flight2'] = {
            'id': flight2.id,
            'departure_datetime': flight2_departure_datetime,
            'arrival_datetime': flight2_arrival_datetime,
            'origin': flight2.origin.code,
            'destination': flight2.destination.code,
            'base_fare': base_fare
        }

    return Response(response_data, status=status.HTTP_200_OK)

def generate_unique_ref_no():
    while True:
        ref_no = secrets.token_hex(3).upper()
        if not Ticket.objects.filter(ref_no=ref_no).exists():
            return ref_no

def createticket(user, passengers, passengerscount, flight, flight_date, flight_class, coupon, countrycode, email, mobile):
    ticket = Ticket.objects.create()
    ticket.user = user
    ticket.ref_no = generate_unique_ref_no()
    for passenger in passengers:
        ticket.passengers.add(passenger)
    ticket.flight = flight
    ticket.flight_ddate = datetime(int(flight_date.split('-')[0]), int(flight_date.split('-')[1]), int(flight_date.split('-')[2]))
    
    flight_ddate = datetime(int(flight_date.split('-')[0]), int(flight_date.split('-')[1]), int(flight_date.split('-')[2]), flight.depart_time.hour, flight.depart_time.minute)
    flight_adate = (flight_ddate + flight.duration)
    
    ticket.flight_adate = datetime(flight_adate.year, flight_adate.month, flight_adate.day)
    
    if flight_class.lower() == 'first':
        ticket.flight_fare = flight.first_fare * int(passengerscount)
    elif flight_class.lower() == 'business':
        ticket.flight_fare = flight.business_fare * int(passengerscount)
    else:
        ticket.flight_fare = flight.economy_fare * int(passengerscount)
    
    ticket.other_charges = FEE
    ticket.coupon_used = coupon if coupon else ''
    ticket.total_fare = ticket.flight_fare + FEE
    ticket.seat_class = flight_class.lower()
    ticket.status = 'PENDING'
    ticket.mobile = f'+{countrycode} {mobile}'
    ticket.email = email
    ticket.save()
    return ticket

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@csrf_exempt
def book(request):
    if request.method == 'POST':
        data = request.data

        # Extract data from JSON payload
        flight_1 = data.get('flight1')
        flight_1date = data.get('flight1Date')
        flight_1class = data.get('flight1Class')
        flight_2 = data.get('flight2')
        flight_2date = data.get('flight2Date')
        flight_2class = data.get('flight2Class')
        countrycode = data.get('countryCode')
        mobile = data.get('mobile')
        email = data.get('email')
        passengerscount = data.get('passengersCount')
        passengers_data = data.get('passengers')
        coupon = data.get('coupon')

        # Convert passengers data into Passenger objects
        passengers = []
        for passenger_data in passengers_data:
            passenger = Passenger.objects.create(
                first_name=passenger_data.get('fname'),
                last_name=passenger_data.get('lname'),
                gender=passenger_data.get('gender').lower()
            )
            passengers.append(passenger)

        try:
            # Retrieve flights from database
            flight1 = Flight.objects.get(id=flight_1)
            flight2 = Flight.objects.get(id=flight_2) if flight_2 else None

            # Create tickets for the flights
            ticket1 = createticket(request.user, passengers, passengerscount, flight1, flight_1date, flight_1class, coupon, countrycode, email, mobile)
            ticket2 = createticket(request.user, passengers, passengerscount, flight2, flight_2date, flight_2class, coupon, countrycode, email, mobile) if flight2 else None

            # Calculate total fare including FEE
            if flight_1class == 'Economy':
                fare = (flight1.economy_fare * int(passengerscount)) + (flight2.economy_fare * int(passengerscount)) if flight2 else flight1.economy_fare * int(passengerscount)
            elif flight_1class == 'Business':
                fare = (flight1.business_fare * int(passengerscount)) + (flight2.business_fare * int(passengerscount)) if flight2 else flight1.business_fare * int(passengerscount)
            elif flight_1class == 'First':
                fare = (flight1.first_fare * int(passengerscount)) + (flight2.first_fare * int(passengerscount)) if flight2 else flight1.first_fare * int(passengerscount)
            flightdata = FlightSerializer(flight1).data
            origincity = PlaceSerializer(Place.objects.get(code=flight1.origin.code)).data
            destinationcity = PlaceSerializer(Place.objects.get(code=flight1.destination.code)).data
            response_data = {
                'fare': fare + FEE,
                'ticket1ref': ticket1.ref_no,
                'details':{
                    # flight details
                    "flight":flightdata,
                    "passengercount":passengerscount,
                    'origin':origincity,
                    'destination':destinationcity,
                    #booking date
                    'booking_date':ticket1.booking_date,
                    #flight date
                    'flight_date':ticket1.flight_ddate,
                },
            }
            return JsonResponse(response_data)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return HttpResponse("Method must be POST.")


@api_view(['POST'])
@permission_classes([IsAuthenticated])
@csrf_exempt
def payment(request):
    if request.method == 'POST':
        data = request.data
        
        ticket_refno = data.get('ticket1ref')
        t2 = False
        # ticket2_id = data.get('ticket2')
        # if ticket2_id:
        #     t2 = True
        fare = data.get('fare')
        card_number = data.get('cardNumber')
        card_holder_name = data.get('cardHolderName')
        exp_month = data.get('expMonth')
        exp_year = data.get('expYear')
        cvv = data.get('cvv')

        try:
            ticket = Ticket.objects.get(ref_no=ticket_refno)
            if(ticket.status == 'CONFIRMED'):
                return Response({'error': 'Ticket already confirmed.'}, status=status.HTTP_400_BAD_REQUEST)
            ticket.status = 'CONFIRMED'
            ticket.booking_date = timezone.now()
            ticket.save()
            
            response_data = {
                'ticket1': ticket.id,
                'ticket1ref':ticket.ref_no,
                'origin': ticket.flight.origin.code,
                'destination': ticket.flight.destination.code,
                'ticket2': None
            }

            # if t2:
            #     ticket2 = Ticket.objects.get(id=ticket2_id)
            #     ticket2.status = 'CONFIRMED'
            #     ticket2.save()
            #     response_data['ticket2'] = ticket2.id

            return Response(response_data, status=status.HTTP_200_OK)
        except Ticket.DoesNotExist:
            return Response({'error': 'Ticket not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'error': 'Method must be POST.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@csrf_exempt
def ticket_data(request, ref):
    try:
        ticket = Ticket.objects.get(ref_no=ref)
        data = {
            'ref': ticket.ref_no,
            'from': ticket.flight.origin.code,
            'to': ticket.flight.destination.code,
            'flight_date': ticket.flight_ddate.strftime('%Y-%m-%d %H:%M:%S'), # Serialize datetime to string
            'status': ticket.status
        }
        return Response(data, status=status.HTTP_200_OK)
    except Ticket.DoesNotExist:
        return Response({'error': 'Ticket not found.'}, status=status.HTTP_404_NOT_FOUND)



def render_to_pdf(template_src, context_dict={}):
    template = get_template(template_src)
    html = template.render(context_dict)
    result = BytesIO()
    pdf = pisa.pisaDocument(BytesIO(html.encode("ISO-8859-1")), result)
    if not pdf.err:
        return result.getvalue()
    return None

@api_view(['GET'])
@csrf_exempt
def get_ticket(request,ref):
    try:
        ticket1 = get_object_or_404(Ticket, ref_no=ref)
        data = {
            'ticket1': ticket1,
            'current_year': datetime.now().year
        }
        pdf = render_to_pdf('ticket.html', data)
        if pdf:
            response = HttpResponse(pdf, content_type='application/pdf')
            response['Content-Disposition'] = f'inline; filename="ticket_{ref}.pdf"'
            return response
        return Response({"error": "Failed to generate PDF"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    except Ticket.DoesNotExist:
        return Response({'error': 'Ticket not found.'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@csrf_exempt
def bookings(request):
    tickets = Ticket.objects.filter(user=request.user,status="CONFIRMED").order_by('-booking_date')
    serializer = TicketSerializer(tickets, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Ticket

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@csrf_exempt
def cancel_ticket(request):
    ref = request.data.get('ref')
    if not ref:
        return Response({'success': False, 'error': 'Reference number is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        ticket = Ticket.objects.get(ref_no=ref)
        if ticket.user == request.user:
            ticket.status = 'CANCELLED'
            ticket.save()
            return Response({'success': True}, status=status.HTTP_200_OK)
        else:
            return Response({'success': False, 'error': 'User unauthorised'}, status=status.HTTP_403_FORBIDDEN)
    except Ticket.DoesNotExist:
        return Response({'success': False, 'error': 'Ticket not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'success': False, 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Ticket

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@csrf_exempt
def resume_booking(request):
    ref = request.data.get('ref')
    if not ref:
        return Response({'error': 'Reference number is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        ticket = Ticket.objects.get(ref_no=ref)
        if ticket.user == request.user:
            return Response({
                'fare': ticket.total_fare,
                'ticket_id': ticket.id
            }, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'User unauthorized'}, status=status.HTTP_403_FORBIDDEN)
    except Ticket.DoesNotExist:
        return Response({'error': 'Ticket not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

