// components/CategoryTable.tsx
'use client';
import { useState } from 'react';
import { Category } from '@/types';
import CategoryModal from './CategoryModal';
import toast from 'react-hot-toast';
interface Props {
  categories: Category[];
}

export default function CategoryTable({ categories }: Props) {
    const [creating, setCreating] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [categoryList, setCategoryList] = useState(categories);

  
  const handleUpdate = (updated: Category) => {
    // console.log(updated)
    setCategoryList((prev) =>
      prev.map((cat) => (cat._id === updated._id ? updated : cat))
    );
  };

  const handleCreate = (newCreated:Category) => {
    console.log(newCreated)
    setCategoryList((prev)=>[newCreated, ...prev])

  }

  const handleDelete = async (id: string) => {
    const confirmed = confirm('Are you sure you want to delete this category?');
    if (!confirmed) return;
  
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/${id}`, {
        method: 'DELETE',
      });
  
      if (!res.ok) throw new Error('Failed to delete');
      toast.success('Category deleted successfully!');
      setCategoryList(prev => prev.filter(cat => cat._id !== id));
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong!');
    }
  };
  

  return (
    <>
    <div>
        <button
            onClick={() => setCreating(true)}
            className="mb-4 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded cursor-pointer"
            >
            + New Category
        </button>
    </div>
    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
      <thead className="bg-gray-200 text-left">
        <tr>
          <th className="py-3 px-4">Name (EN)</th>
          <th className="py-3 px-4">Name (MY)</th>
          <th className="py-3 px-4">Name (Th)</th>
          <th className="py-3 px-4">Image</th>
          <th className="py-3 px-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        {categoryList.map((cat) => (
          <tr key={cat._id} className="border-t hover:bg-gray-100">
            <td className="py-2 px-4">{cat.name.en}</td>
            <td className="py-2 px-4">{cat.name.my || '-'}</td>
            <td className="py-2 px-4">{cat.name.th || '-'}</td>
            <td className="py-2 px-4">
              {cat.image ? (
                <img src={cat.image} alt="Category" className="w-16 h-16 object-cover rounded" />
              ) : (
                'No image'
              )}
            </td>
            <td className="py-2 px-4">
                <button
                  onClick={() => setEditingCategory(cat)}
                  className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 cursor-pointer"
                >
                  Edit
                </button>
                <button
                    onClick={() => handleDelete(cat._id)}
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 ml-2"
                    >
                    Delete
                    </button>

              </td>
          </tr>
        ))}
      </tbody>
    </table>

    {creating && (
  <CategoryModal
    mode="create"
    onClose={() => setCreating(false)}
    onSuccess={handleCreate}
  />
    )}
    {editingCategory && (
        <CategoryModal
        mode="edit"
          category={editingCategory}
          onClose={() => setEditingCategory(null)}
          onSuccess={handleUpdate}
        />
      )}
    </>
  );
}
