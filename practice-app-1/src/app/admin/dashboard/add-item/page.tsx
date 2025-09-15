// Example parent component (e.g., /app/admin/add-item/page.tsx)
'use client';

import ItemForm from '@/components/ItemForm';
import { useRouter } from 'next/navigation';

export default function AddItemPage() {
  const router = useRouter();

  const handleAddItem = async (formData: FormData) => {
    try {
      const response = await fetch('/api/items', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to add item');
      }

      const newItem = await response.json();
      console.log('Successfully created item:', newItem);
      router.push('/admin/dashboard'); // Redirect after success
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <div>
      <h1>Add New Item</h1>
      <ItemForm onSubmit={handleAddItem} />
    </div>
  );
}
