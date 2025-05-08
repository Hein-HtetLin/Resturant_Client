// components/AdminSidebar.tsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminSidebar() {
  const path = usePathname();

  const linkClass = (href: string) =>
    `block py-2 px-4 rounded ${path === href ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-600'}`;

  return (
    <aside className="w-64 bg-gray-800 text-white p-4 space-y-4">
      <h2 className="text-xl font-bold">Admin</h2>
      <nav>
        <Link href="/admin" className={linkClass('/admin')}>Dashboard</Link>
        <Link href="/admin/menus" className={linkClass('/admin/menus')}>Menus</Link>
        <Link href="/admin/categories" className={linkClass('/admin/categories')}>Categories</Link>
      </nav>
    </aside>
  );
}
