// app/meals/page.tsx

import React from 'react';
import ItemCard from '@/components/ItemCard_';

interface Item {
  _id: string;
  title: string;
  subtitle: string;
  discount: number;
  price: number;
  amount: number;
  rating: number;
  imageUrl: string;
}

async function getItems(): Promise<Item[]> {
  const res = await fetch('http://localhost:3000/api/items', {
    cache: 'no-store', // Prevent caching for SSR
  });
  return res.json();
}

const MenuPage = async () => {
  const items = await getItems();

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      {items.map((item: Item) => (
        <ItemCard
          key={item._id}
          title={item.title}
          subtitle={item.subtitle}
          discount={item.discount}
          price={item.price}
          amount={item.amount}
          rating={item.rating}
          imageUrl={item.imageUrl}
        />
      ))}
    </div>
  );
};

export default MenuPage;
