// // src/app/admin/dashboard/page.tsx

// src/app/admin/dashboard/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import ItemForm from '@/components/ItemForm';
import Image from 'next/image';

interface Item {
  _id?: string;
  title: string;
  subtitle: string;
  discount: number;
  price: number;
  amount: number;
  rating: number;
  imageUrl: string;
}

const AdminDashboardPage = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [activeForm, setActiveForm] = useState<{ item: Item | null }>({
    item: null,
  });

  const fetchItems = async () => {
    const res = await fetch('/api/items');
    // ✨ Explicitly type the response data to avoid implicit 'any'
    const data: Item[] = await res.json();
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  //   const handleFormSubmit = async (formData: FormData) => {
  //     const isEditing = activeForm.item?._id;
  //     const url = isEditing ? `/api/items/${activeForm.item._id}` : '/api/items';
  //     const method = isEditing ? 'PUT' : 'POST';

  // ✨ Unified handler for both creating and updating items
  const handleFormSubmit = async (formData: FormData) => {
    const isEditing = !!activeForm.item && !!activeForm.item._id;
    const url =
      isEditing && activeForm.item
        ? `/api/items/${activeForm.item._id}`
        : '/api/items';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      setActiveForm({ item: null });
      fetchItems();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      await fetch(`/api/items/${id}`, { method: 'DELETE' });
      fetchItems();
    }
  };

  if (activeForm.item) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">
          {activeForm.item._id ? 'Edit Item' : 'Add New Item'}
        </h1>
        <ItemForm onSubmit={handleFormSubmit} initialData={activeForm.item} />
        <button
          onClick={() => setActiveForm({ item: null })}
          className="mt-4 bg-gray-500 text-white p-2 rounded max-w-lg mx-auto block"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={() => setActiveForm({ item: {} as Item })}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add New Item
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item._id} className="border p-4 rounded shadow">
            <div className="relative h-40 w-full">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover rounded"
              />
            </div>
            <h2 className="text-lg font-semibold mt-2">{item.title}</h2>
            <p className="text-sm text-gray-400">${item.price}</p>
            <div className="mt-4">
              <button
                onClick={() => setActiveForm({ item })}
                className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item._id!)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboardPage;

// 'use client';

// import React, { useState, useEffect } from 'react';
// import ItemForm from '@/components/ItemForm';
// import Image from 'next/image';

// // The Item interface should allow for a new item that doesn't have an _id yet
// interface Item {
//   _id?: string; // Make _id optional for new items
//   title: string;
//   subtitle: string;
//   discount: number;
//   price: number;
//   amount: number;
//   rating: number;
//   imageUrl: string;
// }

// const AdminDashboardPage = () => {
//   const [items, setItems] = useState<Item[]>([]);
//   // ✨ State now handles an item being edited or a signal to create a new one
//   const [activeForm, setActiveForm] = useState<{ item: Item | null }>({
//     item: null,
//   });

//   const fetchItems = async () => {
//     const res = await fetch('/api/items');
//     const data = await res.json();
//     setItems(data);
//   };

//   useEffect(() => {
//     fetchItems();
//   }, []);

//   // ✨ Unified handler for both creating and updating items
//   const handleFormSubmit = async (formData: FormData) => {
//     const isEditing = !!activeForm.item && !!activeForm.item._id;
//     const url =
//       isEditing && activeForm.item
//         ? `/api/items/${activeForm.item._id}`
//         : '/api/items';
//     const method = isEditing ? 'PUT' : 'POST';

//     try {
//       const response = await fetch(url, {
//         method,
//         body: formData, // Using FormData for efficient file uploads
//       });

//       if (!response.ok) {
//         throw new Error('Form submission failed');
//       }

//       setActiveForm({ item: null }); // Close the form
//       fetchItems(); // Refresh the item list
//     } catch (error) {
//       console.error('Error submitting form:', error);
//     }
//   };

//   const handleDelete = async (id: string) => {
//     if (confirm('Are you sure you want to delete this item?')) {
//       await fetch(`/api/items/${id}`, { method: 'DELETE' });
//       fetchItems();
//     }
//   };

//   // ✨ Conditional rendering: show form or show item list
//   if (activeForm.item) {
//     return (
//       <div className="p-8">
//         <h1 className="text-2xl font-bold mb-4">
//           {activeForm.item._id ? 'Edit Item' : 'Add New Item'}
//         </h1>
//         <ItemForm onSubmit={handleFormSubmit} initialData={activeForm.item} />
//         <button
//           onClick={() => setActiveForm({ item: null })}
//           className="mt-4 bg-gray-500 text-white p-2 rounded max-w-lg mx-auto block"
//         >
//           Cancel
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="p-8">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Admin Dashboard</h1>
//         <button
//           onClick={() => setActiveForm({ item: {} as Item })} // ✨ Open form for new item
//           className="bg-green-500 text-white px-4 py-2 rounded"
//         >
//           Add New Item
//         </button>
//       </div>

//       <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
//         {items.map((item) => (
//           <div key={item._id} className="border p-4 rounded shadow">
//             <div className="relative h-40 w-full">
//               <Image
//                 src={item.imageUrl}
//                 alt={item.title}
//                 fill
//                 className="object-cover rounded"
//               />
//             </div>
//             <h2 className="text-lg font-semibold mt-2">{item.title}</h2>
//             <p className="text-sm text-gray-400">${item.price}</p>
//             <div className="mt-4">
//               <button
//                 onClick={() => setActiveForm({ item })} // ✨ Set the item to be edited
//                 className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDelete(item._id!)}
//                 className="bg-red-500 text-white px-3 py-1 rounded"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboardPage;

// 'use client';

// import React, { useState, useEffect } from 'react';
// import ItemForm from '@/components/ItemForm';
// import Image from 'next/image';

// interface Item {
//   _id: string;
//   title: string;
//   subtitle: string;
//   discount: number;
//   price: number;
//   amount: number;
//   rating: number;
//   imageUrl: string;
// }

// const AdminDashboardPage = () => {
//   const [items, setItems] = useState<Item[]>([]);
//   const [editingItem, setEditingItem] = useState<Item | null>(null);

//   const fetchItems = async () => {
//     const res = await fetch('/api/items');
//     const data = await res.json();
//     setItems(data);
//   };

//   useEffect(() => {
//     fetchItems();
//   }, []);

//   const handleDelete = async (id: string) => {
//     await fetch(`/api/items/${id}`, { method: 'DELETE' });
//     fetchItems();
//   };

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

//       <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
//         {items.map((item) => (
//           <div key={item._id} className="border p-4 rounded shadow">
//             <div className="relative h-40 w-full">
//               <Image
//                 src={item.imageUrl}
//                 alt={item.title}
//                 fill // ✨ 2. Add the fill prop
//                 // 3. Keep classes that style the image itself (not its size)
//                 className="object-cover rounded"
//               />
//             </div>
//             <h2 className="text-lg font-semibold mt-2">{item.title}</h2>
//             <button
//               onClick={() => setEditingItem(item)}
//               className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
//             >
//               Edit
//             </button>
//             <button
//               onClick={() => handleDelete(item._id)}
//               className="bg-red-500 text-white px-3 py-1 rounded"
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboardPage;
