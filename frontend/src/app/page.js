import Image from "next/image";
import Banner from '@/components/Banner';
import Products from '@/components/Products';
import Categories from '@/components/Categories';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Banner />
      <Products />
      <Categories featured={true} />
      
      {/* Newsletter Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-gray-600 mb-8">Get updates about new products and special offers</p>
          <div className="max-w-md mx-auto flex gap-4">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}