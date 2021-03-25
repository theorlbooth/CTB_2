from django.db import models

class Beer(models.Model):
    name = models.CharField(max_length=20, unique=True)
    abv = models.DecimalField(max_digits=5, decimal_places=1, unique=False)
    description = models.CharField(max_length=500)
    image = models.CharField(max_length=300)
    keg_size = models.PositiveIntegerField(unique=False)
    keg_price = models.DecimalField(max_digits=6, decimal_places=2, unique=False)

    def __str__(self):
        return f'{self.name} - {self.abv}%'
        