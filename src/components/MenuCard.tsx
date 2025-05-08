import { Menu } from '@/types';

interface Props {
  menu: Menu;
}

export default function MenuCard({ menu }: Props) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-xs">
      <img
        src={menu.image}
        alt={menu.name.en}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{menu.name.en}</h3>
        <p className="text-sm text-gray-600 mb-2">Category: {menu.category?.name.en}</p>
        <p className="text-xl font-bold text-green-600">${menu.price.toFixed(2)}</p>
      </div>
    </div>
  );
}
