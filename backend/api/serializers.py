from rest_framework import serializers
from .models import Flight, Place, Ticket, Week, Passenger
from django.contrib.auth.models import User
from rest_framework.exceptions import ValidationError
from rest_framework import status
from rest_framework.authtoken.models import Token

class FlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flight
        fields = '__all__'

class PlaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Place
        fields = '__all__'

class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = '__all__'

class WeekSerializer(serializers.ModelSerializer):
    class Meta:
        model = Week
        fields = '__all__'

class PassengerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Passenger
        fields = ['first_name', 'last_name', 'gender']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class UserLoginSerializer(serializers.ModelSerializer):
    id = serializers.PrimaryKeyRelatedField(read_only=True)
    username = serializers.CharField(read_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "password"]


class UserRegisterSerializer(serializers.ModelSerializer):
    id = serializers.PrimaryKeyRelatedField(read_only=True)
    username = serializers.CharField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ["id", "username", "first_name",
                  "last_name", "email", "password"]
        extra_kwargs = {
            'password': {"write_only": True}
        }

    def validate_username(self, username):
        if User.objects.filter(username=username).exists():
            detail = {
                "detail": "User Already exist!"
            }
            raise ValidationError(detail=detail)
        return username

    def validate(self, instance):
        if User.objects.filter(email=instance['email']).exists():
            raise ValidationError({"message": "Email already taken!"})

        return instance

    def create(self, validated_data):
        passowrd = validated_data.pop('password')
        user = User.objects.create(**validated_data)
        user.set_password(passowrd)
        user.save()
        Token.objects.create(user=user)
        return user

class FlightSearchSerializer(serializers.Serializer):
    Origin = serializers.CharField(max_length=3)
    Destination = serializers.CharField(max_length=3)
    TripType = serializers.ChoiceField(choices=[('1', 'One Way'), ('2', 'Round Trip')])
    DepartDate = serializers.DateField(required=True, format="%Y-%m-%d")
    ReturnDate = serializers.DateField(required=False, format="%Y-%m-%d")
    SeatClass = serializers.ChoiceField(choices=[('economy', 'Economy'), ('business', 'Business'), ('first', 'First')])

class ReviewRequestSerializer(serializers.Serializer):
    flight1Id = serializers.IntegerField(required=True)
    flight1Date = serializers.DateField(required=True, format="%Y-%m-%d")
    flight2Id = serializers.IntegerField(required=False)
    flight2Date = serializers.DateField(required=False, format="%Y-%m-%d")
    seatClass = serializers.ChoiceField(choices=['economy', 'business', 'first'], required=True)


class BookingSerializer(serializers.Serializer):
    flight1 = serializers.IntegerField(required=True)
    flight1Date = serializers.DateField(required=True)
    flight1Class = serializers.ChoiceField(choices=['Economy', 'Business', 'First'])
    flight2 = serializers.IntegerField(required=False)
    flight2Date = serializers.DateField(required=False)
    flight2Class = serializers.ChoiceField(choices=['Economy', 'Business', 'First'], required=False)
    countryCode = serializers.CharField(max_length=10)
    mobile = serializers.CharField(max_length=15)
    email = serializers.EmailField()
    passengersCount = serializers.IntegerField(min_value=1)
    passengers = PassengerSerializer(many=True)
    coupon = serializers.CharField(max_length=20, required=False)

class FlightSerializerv2(serializers.ModelSerializer):
    origin = PlaceSerializer()
    destination = PlaceSerializer()
    class Meta:
        model = Flight
        fields = '__all__'

class TicketSerializerv2(serializers.ModelSerializer):
    flight = FlightSerializerv2()
    class Meta:
        model = Ticket
        fields = '__all__'