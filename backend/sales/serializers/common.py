from rest_framework import serializers
from ..models import Sale

class SaleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Sale
        fields = '__all__'


class LimitedSaleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Sale
        fields = (
          'date',
          'number_of_kegs'
        )