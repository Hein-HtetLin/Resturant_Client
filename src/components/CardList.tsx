import React from 'react'
import { Menu } from '@/types';
import MenuCard from './MenuCard';
interface Props {
  menus: Menu[];
}
const CardList = ({ menus }: Props) => {
  return (

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {menus.map(menu => (
            <MenuCard key={menu._id} menu={menu} />
          ))}
        </div>
  )
}

export default CardList