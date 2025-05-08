// app/admin/categories/page.tsx
import { Category } from '@/types';
import CategoryTable from '@/components/CategoryTable';

async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }

  return res.json();
}

export default async function CategoryPage() {
  const categories = await getCategories();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <CategoryTable categories={categories} />
    </div>
  );
}
