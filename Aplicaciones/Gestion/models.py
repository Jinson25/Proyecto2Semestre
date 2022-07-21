from django.db import models

# Create your models here.

class Cuidad(models.Model):
    codigo = models.PositiveSmallIntegerField(primary_key=True)
    nombre = models.CharField(max_length=38)
    
class Persona(models.Model):
    dni = models