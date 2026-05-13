import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, TruckIcon, ShieldCheckIcon, CreditCardIcon } from '@heroicons/react/24/outline';
import ProductCard from '../components/product/ProductCard';
import CategoryGrid from '../components/category/CategoryGrid';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { productsAPI, categoriesAPI } from '../services/api';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          productsAPI.getFeatured({ size: 8 }),
          categoriesAPI.getRoot(),
        ]);
        setFeaturedProducts(productsRes.data.data.content || []);
        setCategories(categoriesRes.data.data || []);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const features = [
    {
      icon: TruckIcon,
      title: 'Free Shipping',
      description: 'Free shipping on orders over ₹500',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Secure Payment',
      description: '100% secure payment gateway',
    },
    {
      icon: CreditCardIcon,
      title: 'Easy Returns',
      description: '30-day return policy',
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 md:py-28 lg:py-36">
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight animate-slide-up">
              Discover Amazing Products
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-primary-100 mb-6 sm:mb-8 animate-slide-up leading-relaxed">
              Shop the latest trends with unbeatable prices. Quality products delivered to your doorstep.
            </p>
            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 animate-slide-up">
              <Link
                to="/products"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 bg-white text-primary-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                Shop Now
                <ArrowRightIcon className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <Link
                to="/products?featured=true"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-200 text-sm sm:text-base"
              >
                View Featured
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 hidden sm:block" />
        <div className="absolute bottom-0 right-10 w-32 h-32 sm:w-64 sm:h-64 bg-white/5 rounded-full translate-y-1/3 hidden sm:block" />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 -skew-x-12 hidden lg:block" />
      </section>

      {/* Features */}
      <section className="bg-white dark:bg-gray-800 py-8 sm:py-12 border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-0">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center">
                  <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">{feature.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Shop by Category
            </h2>
            <Link
              to="/products"
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center text-sm sm:text-base"
            >
              View All
              <ArrowRightIcon className="ml-1 h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Link>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : categories.length > 0 ? (
            <CategoryGrid categories={categories} />
          ) : (
            <p className="text-center text-gray-500 py-12">No categories available</p>
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-10 sm:py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Featured Products
            </h2>
            <Link
              to="/products?featured=true"
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center text-sm sm:text-base"
            >
              View All
              <ArrowRightIcon className="ml-1 h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Link>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-12">No featured products available</p>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-primary-100 mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base">
            Get the latest updates on new products and upcoming sales.
          </p>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-white text-gray-900 text-sm sm:text-base"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors text-sm sm:text-base whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
