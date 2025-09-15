import Image from 'next/image';
import React from 'react';

type ItemCardProps = {
  title: string;
  subtitle?: string;
  discount?: number;
  price: number;
  amount: number;
  rating?: number;
  imageUrl: string;
};

const ItemCard: React.FC<ItemCardProps> = ({
  title,
  subtitle,
  discount,
  price,
  amount,
  rating,
  imageUrl,
}) => {
  return (
    <div className="border rounded-lg p-4 shadow-md max-w-sm">
      <Image
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover rounded-md"
      />

      <h2 className="text-xl font-bold mt-2">{title}</h2>
      {subtitle && <p className="text-gray-600">{subtitle}</p>}

      <p className="mt-1">
        <span className="font-semibold">Price:</span> ${price}
      </p>

      {discount && discount > 0 && (
        <p className="text-green-600">Discount: {discount}%</p>
      )}

      <p className="mt-1">
        <span className="font-semibold">Amount:</span> {amount}
      </p>

      {rating !== undefined && (
        <p className="mt-1">⭐ Rating: {rating.toFixed(1)}</p>
      )}
    </div>
  );
};

export default ItemCard;
