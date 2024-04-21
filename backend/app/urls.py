from django.urls import path
from . import views

urlpatterns = [
    
    path('', views.submit_inputs, name='submit'),
    # Define other URL patterns for views in this app
]
