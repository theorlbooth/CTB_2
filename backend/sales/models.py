from django.db import models

class Sale(models.Model):
    notes = models.TextField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    number_of_kegs = models.PositiveIntegerField(unique=False)
    price_per_keg = models.DecimalField(max_digits=6, decimal_places=2, unique=False)
    beer = models.ForeignKey(
        'beers.Beer',
        related_name='sales',
        on_delete=models.PROTECT
    )
    user = models.ForeignKey(
        'jwt_auth.User',
        related_name='sales',
        on_delete=models.PROTECT
    )

    def __str__(self):
        return f'Sale #{self.id} - {self.number_of_kegs} kegs of {self.beer.name}'
