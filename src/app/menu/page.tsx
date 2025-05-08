'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import MenuCard from '@/components/UI/MenuCard';
import { Menu, Category } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function MenusPage() {
  const { language, getTranslation } = useLanguage();
  const [menus, setMenus] = useState<Menu[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('categoryId');

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [categoriesRes, menusRes] = await Promise.all([
        fetch(`${API_URL}/api/categories`),
        fetch(`${API_URL}/api/menu${selectedCategory ? `/category/${selectedCategory}` : ''}`),
      ]);

      if (!categoriesRes.ok || !menusRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const [categoriesData, menusData] = await Promise.all([
        categoriesRes.json(),
        menusRes.json(),
      ]);

      setCategories(categoriesData);
      setMenus(menusData);
    } catch (err) {
      setError('Failed to load data. Please try again later.');
      setMenus([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedCategory]);

  const handleCategoryClick = (categoryId: string | null) => {
    router.push(`/menu${categoryId ? `?categoryId=${categoryId}` : ''}`, { shallow: true });
  };

  return (
    <div className="p-4">
      <nav className="bg-gray-100 p-4 sticky top-0 z-10 mb-4 overflow-x-auto">
        <ul className="flex space-x-4 overflow-auto whitespace-nowrap">
          <li
            key="all"
            className={`cursor-pointer ${!selectedCategory ? 'font-bold' : ''}`}
            onClick={() => handleCategoryClick(null)}
          >
            All
          </li>
          {categories.map((category) => (
            <li
              key={category._id}
              className={`cursor-pointer ${selectedCategory === category._id ? 'font-bold' : ''}`}
              onClick={() => handleCategoryClick(category._id)}
            >
              {getTranslation(category.name, language)}
            </li>
          ))}
        </ul>
      </nav>

      {/* Error State */}
      {error ? (
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
          </svg>
          <p className="text-red-500 text-lg font-semibold text-center">{error}</p>
          <button
            onClick={fetchData}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Retry
          </button>
        </div>
      ) : isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
          <p className="ml-4 text-gray-500 text-lg">Loading menus...</p>
        </div>
      ) : menus.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
          {menus.map((menu) => (
            <MenuCard key={menu._id} menu={menu} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 space-y-2">
          <p className="text-gray-500 text-lg">No menu items found for the selected category.</p>
        </div>
      )}
    </div>
  );
}
