// components/ItemForm.tsx
'use client';

import React from 'react';

type ItemFormProps = {
  initialData?: {
    title: string;
    subtitle?: string;
    discount?: number;
    price: number;
    amount: number;
    rating?: number;
    imageUrl?: string;
    _id?: string;
  };
  onSubmit: (formData: FormData) => void;
};

const ItemForm: React.FC<ItemFormProps> = ({ initialData, onSubmit }) => {
  // No longer need useState for the imageFile!

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This constructor now correctly captures all fields, including the file.
    const formData = new FormData(e.target as HTMLFormElement);
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 max-w-lg mx-auto p-4 text-amber-50"
    >
      {/* ... other input fields ... */}
      <input
        type="text"
        name="title"
        defaultValue={initialData?.title}
        placeholder="Title"
        required
      />
      <input
        type="text"
        name="subtitle"
        defaultValue={initialData?.subtitle}
        placeholder="Subtitle"
      />
      <input
        type="number"
        name="discount"
        defaultValue={initialData?.discount}
        placeholder="Discount (%)"
      />
      <input
        type="number"
        name="price"
        defaultValue={initialData?.price}
        placeholder="Price"
        required
      />
      <input
        type="number"
        name="amount"
        defaultValue={initialData?.amount}
        placeholder="Amount"
        required
      />
      <input
        type="number"
        step="0.1"
        name="rating"
        defaultValue={initialData?.rating}
        placeholder="Rating (0-5)"
      />

      <input
        type="file"
        name="imageFile" // ✨ ADD THIS NAME ATTRIBUTE
        accept="image/*"
        // No longer need an onChange handler here
      />

      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        {initialData ? 'Update Item' : 'Add Item'}
      </button>
    </form>
  );
};

export default ItemForm;
