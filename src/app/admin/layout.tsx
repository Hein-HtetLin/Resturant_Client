// app/admin/layout.tsx
import AdminSidebar from '@/components/AdminSideBar';
import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-gray-100">{children}</main>
    </div>
  );
}
