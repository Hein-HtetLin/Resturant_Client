'use client';

import { useState,useEffect } from 'react';
import { Category } from '@/types';
import toast from 'react-hot-toast';


interface CategoryModalProps {
  mode: 'create' | 'edit';
  category?: Category;
  onClose: () => void;
  onSuccess: (updatedCategory: Category) => void;
}

export default function EditCategoryModal({ category, onClose, onSuccess,mode }: CategoryModalProps) {
  const [nameEn, setNameEn] = useState("");
  const [nameMy, setNameMy] = useState('');
  const [nameTh, setNameTh] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (mode === 'edit' && category) {
      setNameEn(category.name.en);
      setNameMy(category.name.my || '');
      setNameTh(category.name.th || '');
    } else {
      setNameEn('');
      setNameMy('');
      setNameTh('');
      setImageFile(null);
    }
  }, [mode, category]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append('name', JSON.stringify({
      en: nameEn,
      my: nameMy || '',
      th: nameTh || '',
    }));
    if (imageFile) {
      formData.append('image', imageFile);
    }

    const url = mode === 'create'
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/categories`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/categories/${category?._id}`;

    try {
      const res = await fetch(url, {
        method: mode === 'create' ? 'POST' : 'PUT',
        body: formData,
      });
      if (!res.ok){
        const errorData = await res.json(); // Error Response Body ကို ဖတ်ပါ
        if (errorData?.message) {
          throw new Error(errorData.message); // Error Message ကို သုံးပါ
        } else {
          throw new Error('Update failed'); // Generic Error Message
        }
        
      }
      const data = await res.json();
      toast.success(`Category ${mode === 'create' ? 'created' : 'updated'} successfully!`);
      onSuccess(data);
      onClose();
    } catch (err:any) {
        console.log(err.message),
        toast.error(err.message ||'Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
      <h2 className="text-lg font-semibold mb-4">
          {mode === 'create' ? 'Create Category' : 'Edit Category'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Name (EN)</label>
            <input
              type="text"
              value={nameEn}
              onChange={(e) => setNameEn(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Name (MY)</label>
            <input
              type="text"
              value={nameMy}
              onChange={(e) => setNameMy(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Name (TH)</label>
            <input
              type="text"
              value={nameTh}
              onChange={(e) => setNameTh(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
          <label className="block mb-1">Image {mode === 'create' ? 'Create' : '(optional)'}</label>
            <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {isLoading ? 'Saving...' : mode === 'create' ? 'Create' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
