from django.urls import path
from .views import (
    ProductListView, ProductDetailView,ProductCreateView ,ProductUpdateView, ProductDeleteView,
    CategoryListView, CategoryDetailView,
    CategoryCreateView, CategoryUpdateView, CategoryDeleteView
)

urlpatterns = [
    path('products/', ProductListView.as_view(), name='product-list'),
    path('products/<int:id>/', ProductDetailView.as_view(), name='product-detail'),
    path('products/add/', ProductCreateView.as_view(), name='product-add'),
    path('products/<int:id>/update/', ProductUpdateView.as_view(), name='product-update'),
    path('products/<int:id>/delete/', ProductDeleteView.as_view(), name='product-delete'),
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('categories/<int:id>/', CategoryDetailView.as_view(), name='category-detail'),
    path('categories/add/', CategoryCreateView.as_view(), name='category-add'),
    path('categories/<int:id>/update/', CategoryUpdateView.as_view(), name='category-update'),
    path('categories/<int:id>/delete/', CategoryDeleteView.as_view(), name='category-delete'),
]