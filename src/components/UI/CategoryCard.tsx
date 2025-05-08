'use client';
import { Category } from '@/types';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image'; // ✅ Use Next.js Image for Optimization
export default function CategoryCard({ category }: { category: Category }) {
  const router = useRouter();
  const { language, getTranslation } = useLanguage();

  return (
    <div
      onClick={() => router.push(`/menu?categoryId=${category._id}`)}
      className="relative cursor-pointer rounded overflow-hidden shadow hover:shadow-lg transition"
    >
      <Image
        src={category.image ?? "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg"}
        alt={category.name.en}
        width={400}
        height={200}
        className="w-full h-48 object-cover"
        loading="lazy" // ✅ Lazy Load Image
        quality={80}   // ✅ Optimize Quality
      />
      <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white p-2 text-center">
        <h3 className="font-semibold text-lg">{getTranslation(category.name, language)}</h3>
      </div>
    </div>
  );
}




