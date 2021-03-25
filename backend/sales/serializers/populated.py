from ..serializers.common import SaleSerializer
from backend.jwt_auth.serializers.common import NestedUserSerializer
from backend.beers.serializers.common import NestedBeerSerializer

class PopulatedSaleSerializer(SaleSerializer):

    user = NestedUserSerializer()
    beer = NestedBeerSerializer()
    