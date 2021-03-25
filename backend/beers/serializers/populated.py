from backend.sales.serializers.common import SaleSerializer
from ..serializers.common import BeerSerializer

class PopulatedBeerSerializer(BeerSerializer):

    sales = SaleSerializer(many=True)
    