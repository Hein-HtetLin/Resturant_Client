'use client';
import { Menu } from '@/types';
import { useRouter } from 'next/navigation';
import { isTimeWithinRange } from "../../lib/time-util";
import { useLanguage } from '@/contexts/LanguageContext';

export default function CategoryCard({ menu }: { menu: Menu }) {
    const { language, getTranslation } = useLanguage();
  const router = useRouter();
  const isAvailable = !menu.availableFrom || !menu.availableTo || isTimeWithinRange(menu.availableFrom, menu.availableTo);
//   console.log(isAvailable);
  const cardClass = `border rounded p-4 relative ${!isAvailable ? 'opacity-50' : ''}`;
    // const data = getTranslation(menu.name,"my");
    // console.log(language,data);
  return (
    <div className={cardClass}>
      {!isAvailable && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <span className="text-white font-bold text-lg">Unavailable Now</span>
        </div>
      )}
      {menu.image && <img src={menu.image} alt={menu.name.en} className="mt-2 w-full max-h-64 object-cover rounded" />}
      <h3 className='mt-4'>{getTranslation(menu.name, language)}</h3>
      {/* <p className="text-gray-600">{menu.description?.en?.substring(0, 100)}...</p> */}
      <p className="font-semibold">${menu.price}</p>
      {menu.availableFrom && menu.availableTo && (
        <p className="text-sm text-gray-500 mt-2">
          Available from {menu.availableFrom} to {menu.availableTo}
        </p>
      )}
    </div>
  );
}