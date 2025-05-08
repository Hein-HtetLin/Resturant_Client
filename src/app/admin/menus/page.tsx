import React from 'react'
import { Menu } from '@/types';
import MenuCard from '@/components/MenuCard';
import CardList from '@/components/CardList';

async function getMenu(): Promise<Menu[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/menu`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }

  return res.json();
}
const Menus = async() => {
  const menus = await getMenu();
  return (
    <div>
          <h1 className="text-2xl font-bold mb-4">Menus</h1>
          <CardList menus={menus} />
        </div>
    
  )
}

export default Menus