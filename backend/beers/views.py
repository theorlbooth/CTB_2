from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Beer
from .serializers.common import BeerSerializer
from .serializers.populated import PopulatedBeerSerializer


class BeerListView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, _request):
        beers = Beer.objects.all()
        serialized_beers = BeerSerializer(beers, many=True)
        return Response(serialized_beers.data, status=status.HTTP_200_OK)

    def post(self, request):
        beer_to_create = BeerSerializer(data=request.data)
        if beer_to_create.is_valid():
            beer_to_create.save()
            return Response(beer_to_create.data, status=status.HTTP_201_CREATED)
        return Response(beer_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class BeerDetailView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get_beer(self, pk):
        try:
            return Beer.objects.get(pk=pk)
        except Beer.DoesNotExist:
            raise NotFound()

    def get(self, _request, pk):
        beer = self.get_beer(pk=pk)
        serialized_beer = PopulatedBeerSerializer(beer)
        return Response(serialized_beer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        beer_to_update = self.get_beer(pk=pk)
        updated_beer = BeerSerializer(beer_to_update, data=request.data)
        if updated_beer.is_valid():
            updated_beer.save()
            return Response(updated_beer.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_beer.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, _request, pk):
        beer_to_delete = self.get_beer(pk=pk)
        beer_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
