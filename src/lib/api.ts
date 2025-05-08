// lib/api.ts
import { Category, Menu } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getCategories = async (): Promise<Category[]> => {
  const res = await fetch(`${API_URL}/api/categories`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
};

// export const getMenusByCategory = async (categoryId: string): Promise<Menu[]> => {
//   const res = await fetch(`${API_URL}/api/menu/category/${categoryId}`);
//   if (!res.ok) throw new Error('Failed to fetch menus');
//   return res.json();
// };


export const getMenusByCategory = async (categoryId: string): Promise<Menu[]> => {
    try {
      const res = await fetch(`${API_URL}/api/menu/category/${categoryId}`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch menus by category', error);
      return [];
    }
  };
// export const getMenuDetail = async (id: string): Promise<Menu> => {
//   const res = await fetch(`${API_URL}/api/menus/${id}`);
//   if (!res.ok) throw new Error('Failed to fetch menu detail');
//   return res.json();
// };
