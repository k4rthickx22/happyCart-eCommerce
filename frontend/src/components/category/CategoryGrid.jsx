import { Link } from 'react-router-dom';

// Reliable fallback: inline SVG data URI (no external dependency)
const PLACEHOLDER_IMAGE = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='48' fill='%2394a3b8'%3E🛍️%3C/text%3E%3C/svg%3E`;

const categoryImages = {
  electronics: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&q=80',
  fashion: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80',
  home: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80',
  'home-kitchen': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80',
  sports: 'https://images.unsplash.com/photo-1461896836934-bd45ba0c0964?w=400&q=80',
  'sports-fitness': 'https://images.unsplash.com/photo-1461896836934-bd45ba0c0964?w=400&q=80',
  beauty: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80',
  'beauty-personal-care': 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80',
  books: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&q=80',
  'books-stationery': 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80',
  toys: 'https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=400&q=80',
  'toys-games': 'https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=400&q=80',
  groceries: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80',
  'groceries-essentials': 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80',
};

function getImageSrc(category) {
  if (category.image && category.image.startsWith('http')) {
    return category.image;
  }
  if (category.slug && categoryImages[category.slug]) {
    return categoryImages[category.slug];
  }
  return PLACEHOLDER_IMAGE;
}

export default function CategoryGrid({ categories }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {categories.map((category) => (
        <Link
          key={category.id}
          to={`/products?category=${category.id}`}
          className="group"
        >
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-700">
            <img
              src={getImageSrc(category)}
              alt={category.name}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.onerror = null; // prevent infinite loop
                e.currentTarget.src = PLACEHOLDER_IMAGE;
              }}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
              <h3 className="text-white font-semibold text-center text-xs sm:text-sm leading-tight">
                {category.name}
              </h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}