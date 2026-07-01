import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Minimalist Desk Lamp',
    price: '49.99',
    image: 'https://via.placeholder.com/400x300/F4F4F5/A1A1AA?text=Product+1',
  },
  {
    id: 2,
    name: 'Elegant Ceramic Mug',
    price: '19.99',
    image: 'https://via.placeholder.com/400x300/F4F4F5/A1A1AA?text=Product+2',
  },
  {
    id: 3,
    name: 'Premium Leather Wallet',
    price: '79.99',
    image: 'https://via.placeholder.com/400x300/F4F4F5/A1A1AA?text=Product+3',
  },
  {
    id: 4,
    name: 'Smart Home Speaker',
    price: '129.99',
    image: 'https://via.placeholder.com/400x300/F4F4F5/A1A1AA?text=Product+4',
  },
  {
    id: 5,
    name: 'Organic Cotton Towel Set',
    price: '59.99',
    image: 'https://via.placeholder.com/400x300/F4F4F5/A1A1AA?text=Product+5',
  },
  {
    id: 6,
    name: 'Handcrafted Wooden Bowl',
    price: '34.99',
    image: 'https://via.placeholder.com/400x300/F4F4F5/A1A1AA?text=Product+6',
  },
];

const ProductCard = ({ product }) => {
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000); // Reset after 2 seconds
  };

  // Extract conditional content for the button to simplify JSX and potentially
  // resolve validator issues with fragments or complex inline conditionals.
  const buttonContent = addedToCart ? (
    'Added!'
  ) : (
    <span className="flex items-center justify-center">
      <ShoppingCart className="h-5 w-5 mr-2" /> Add to Cart
    </span>
  );

  return (
    <div className="bg-white rounded-md overflow-hidden group border border-zinc-100 hover:border-zinc-200 transition-all duration-300 ease-in-out">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover object-center group-hover:scale-105 transition-transform duration-300 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-zinc-900 mb-2">{product.name}</h3>
        <p className="text-zinc-700 text-lg mb-4">${product.price}</p>
        <button
          onClick={handleAddToCart}
          className={`w-full flex items-center justify-center px-4 py-2 rounded-md transition-all duration-300 ease-in-out
            ${addedToCart
              ? 'bg-zinc-500 text-white'
              : 'bg-zinc-900 text-white hover:bg-zinc-700'
            }`}
        >
          {buttonContent}
        </button>
      </div>
    </div>
  );
};

const ProductGridSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-zinc-900 mb-12">
          Our Latest Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGridSection;