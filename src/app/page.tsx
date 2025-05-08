// app/page.tsx
import { getCategories } from '@/lib/api';
import CategoryCard from '@/components/UI/CategoryCard';

export default async function Home() {
  const categories = await getCategories();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
      {categories.map((cat) => (
        <CategoryCard key={cat._id} category={cat} />
      ))}
    </div>
  );
}

