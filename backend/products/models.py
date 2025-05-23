from django.db import models
from users.models import User

class Category(models.Model):
    name = models.CharField(max_length=255, unique=True)
    title = models.CharField(max_length=255)  # Stylish title for display
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='category_images/', blank=True, null=True)

    @property
    def itemcount(self):
        return self.products.count()

    def __str__(self):
        return self.name

class Product(models.Model):
    title = models.CharField(max_length=255)
    categories = models.ManyToManyField(Category, related_name='products')
    rating = models.FloatField(default=0)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True)
    item_count = models.PositiveIntegerField(default=0)
    related_products = models.ManyToManyField('self', blank=True, symmetrical=False, related_name='related_to')
    productcount = models.PositiveIntegerField(default=0)
    liked_by = models.ManyToManyField(User, related_name='liked_products', blank=True)

    def __str__(self):
        return self.title

class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='pictures')
    image = models.ImageField(upload_to='product_images/')

    def __str__(self):
        return f"Image for {self.product.title}"
