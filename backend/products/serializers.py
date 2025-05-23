from rest_framework import serializers
from .models import Product, ProductImage, Category

class ProductListSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='title')
    image = serializers.SerializerMethodField()
    category = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'image', 'category']

    def get_image(self, obj):
        first_image = obj.pictures.first()
        if first_image:
            return first_image.image.url
        return None

    def get_category(self, obj):
        first_category = obj.categories.first()
        return first_category.name if first_category else None

class ProductDetailSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='title')
    images = serializers.SerializerMethodField()
    category = serializers.SerializerMethodField()
    likes = serializers.SerializerMethodField()
    related = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'price', 'images', 'category',
            'description', 'rating', 'likes', 'related'
        ]

    def get_images(self, obj):
        return [img.image.url for img in obj.pictures.all()]

    def get_category(self, obj):
        first_category = obj.categories.first()
        return first_category.name if first_category else None

    def get_likes(self, obj):
        return obj.liked_by.count()

    def get_related(self, obj):
        return [p.id for p in obj.related_products.all()]
    
from rest_framework import serializers
from .models import Product, ProductImage, Category
from django.contrib.auth import get_user_model

User = get_user_model()

class ProductCreateSerializer(serializers.ModelSerializer):
    categories = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), many=True
    )
    related_products = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(), many=True, required=False
    )
    images = serializers.ListField(
        child=serializers.ImageField(), write_only=True, required=False
    )
    liked_by = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), many=True, required=False
    )

    class Meta:
        model = Product
        fields = [
            'title', 'price', 'description', 'rating', 'item_count', 'productcount',
            'categories', 'related_products', 'images', 'liked_by'
        ]

    def create(self, validated_data):
        categories = validated_data.pop('categories', [])
        related = validated_data.pop('related_products', [])
        images = validated_data.pop('images', [])
        liked_by = validated_data.pop('liked_by', [])

        product = Product.objects.create(**validated_data)
        product.categories.set(categories)
        product.related_products.set(related)
        product.liked_by.set(liked_by)

        for img in images:
            ProductImage.objects.create(product=product, image=img)

        return product


class CategorySerializer(serializers.ModelSerializer):
    itemCount = serializers.IntegerField(source='itemcount', read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'title', 'description', 'image', 'itemCount']
