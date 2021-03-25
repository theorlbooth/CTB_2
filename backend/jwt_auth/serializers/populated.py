from ..serializers.common import UserSerializer
from backend.beers.serializers.common import BeerSerializer
from backend.sales.serializers.common import SaleSerializer

class PopulatedUserSerializer(UserSerializer):

    sales = SaleSerializer(many=True)
    