# yourapp/pagination.py
from rest_framework.pagination import PageNumberPagination

class ProductPagination(PageNumberPagination):
    page_size = 20  # or whatever size you want
