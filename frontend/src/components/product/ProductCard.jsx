import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingCartIcon, 
  HeartIcon, 
  StarIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid, StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';
import { useWishlistStore } from '../../store/wishlistStore';

export default function ProductCard({ product, showQuickView = true }) {
  const { addToCart, isLoading } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    const result = await addToCart(product.id, 1);
    if (result.success) {
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating || 0);
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<StarIconSolid key={i} className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-yellow-400" />);
      } else {
        stars.push(<StarIcon key={i} className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-gray-300 dark:text-gray-600" />);
      }
    }
    return stars;
  };

  const discountPercentage = product.discountPrice 
    ? Math.round((1 - product.discountPrice / product.price) * 100)
    : 0;

  const isOutOfStock = product.stockQuantity === 0;
  const isLowStock = product.stockQuantity > 0 && product.stockQuantity <= 5;

  return (
    <Link 
      to={`/products/${product.id}`} 
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-hover overflow-hidden">
        {/* Image Container */}
        <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 overflow-hidden">
          {/* Skeleton while loading */}
          {!imageLoaded && (
            <div className="absolute inset-0 skeleton" />
          )}
          
          <img
            src={product.images?.[0] || 'https://via.placeholder.com/400x400?text=No+Image'}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-500 
                       ${isHovered ? 'scale-110' : 'scale-100'}
                       ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          
          {/* Overlay on out of stock */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-white text-gray-900 px-3 py-1.5 rounded-full font-semibold text-xs sm:text-sm">
                Out of Stock
              </span>
            </div>
          )}
          
          {/* Badges */}
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1.5">
            {product.featured && (
              <span className="bg-gradient-to-r from-primary-600 to-primary-500 text-white text-[10px] sm:text-xs font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-lg">
                Featured
              </span>
            )}
            {discountPercentage > 0 && (
              <span className="bg-gradient-to-r from-red-600 to-red-500 text-white text-[10px] sm:text-xs font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-lg">
                -{discountPercentage}%
              </span>
            )}
            {isLowStock && !isOutOfStock && (
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10px] sm:text-xs font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-lg hidden sm:block">
                Only {product.stockQuantity} left
              </span>
            )}
          </div>

          {/* Wishlist Button — always visible on mobile, hover on desktop */}
          <button 
            onClick={handleWishlistClick}
            className={`absolute top-2 right-2 sm:top-3 sm:right-3 p-2 sm:p-2.5 rounded-xl shadow-lg backdrop-blur-sm transition-all duration-200 
                       sm:opacity-0 sm:group-hover:opacity-100 sm:translate-x-2 sm:group-hover:translate-x-0
                       ${inWishlist 
                         ? 'bg-red-500 text-white' 
                         : 'bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 hover:bg-red-500 hover:text-white'}`}
          >
            {inWishlist ? (
              <HeartIconSolid className="h-4 w-4 sm:h-5 sm:w-5" />
            ) : (
              <HeartIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            )}
          </button>

          {/* Add to Cart Button — bottom overlay on desktop, always-on button below on mobile */}
          <div className={`absolute bottom-0 left-0 right-0 p-2 sm:p-4 bg-gradient-to-t from-black/80 via-black/50 to-transparent 
                          hidden sm:block
                          transition-all duration-300 ${isHovered && !isOutOfStock ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <button
              onClick={handleAddToCart}
              disabled={isLoading || isOutOfStock}
              className={`w-full py-2 sm:py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 
                         transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm
                         ${addedToCart 
                           ? 'bg-green-500 text-white' 
                           : 'bg-white text-gray-900 hover:bg-primary-500 hover:text-white'}`}
            >
              {addedToCart ? (
                <>
                  <CheckIcon className="h-4 w-4" />
                  Added!
                </>
              ) : (
                <>
                  <ShoppingCartIcon className="h-4 w-4" />
                  Add to Cart
                </>
              )}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-2.5 sm:p-4">
          {/* Category */}
          <p className="text-[10px] sm:text-xs text-primary-600 dark:text-primary-400 font-semibold uppercase tracking-wide mb-1">
            {product.categoryName || 'Uncategorized'}
          </p>

          {/* Name */}
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1.5 sm:mb-2 line-clamp-2 
                        group-hover:text-primary-600 transition-colors duration-200 
                        text-xs sm:text-sm min-h-[2rem] sm:min-h-[2.5rem]">
            {product.name}
          </h3>

          {/* Rating — hidden on very small screens */}
          <div className="hidden sm:flex items-center gap-1.5 mb-2 sm:mb-3">
            <div className="flex">
              {renderStars(product.averageRating)}
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              ({product.reviewCount || 0})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
            {product.discountPrice ? (
              <>
                <span className="text-sm sm:text-lg font-bold text-gray-900 dark:text-white">
                  ₹{product.discountPrice.toLocaleString()}
                </span>
                <span className="text-xs sm:text-sm text-gray-400 line-through">
                  ₹{product.price.toLocaleString()}
                </span>
              </>
            ) : (
              <span className="text-sm sm:text-lg font-bold text-gray-900 dark:text-white">
                ₹{product.price?.toLocaleString() || '0'}
              </span>
            )}
          </div>

          {/* Brand — hidden on small screens */}
          {product.brand && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 hidden sm:block">
              by <span className="font-medium">{product.brand}</span>
            </p>
          )}

          {/* Mobile Add to Cart Button */}
          {!isOutOfStock && (
            <button
              onClick={handleAddToCart}
              disabled={isLoading}
              className={`mt-2 w-full py-1.5 rounded-lg font-semibold flex items-center justify-center gap-1.5 
                         transition-all duration-300 disabled:opacity-50 text-xs sm:hidden
                         ${addedToCart 
                           ? 'bg-green-500 text-white' 
                           : 'bg-primary-600 text-white hover:bg-primary-700'}`}
            >
              {addedToCart ? (
                <>
                  <CheckIcon className="h-3.5 w-3.5" />
                  Added!
                </>
              ) : (
                <>
                  <ShoppingCartIcon className="h-3.5 w-3.5" />
                  Add to Cart
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}
