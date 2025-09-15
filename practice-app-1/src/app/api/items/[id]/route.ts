// src/app/api/items/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Item from '@/models/item';
import { uploadImage } from '@/utils/cloudinary';

// ✨ Define a specific, partial type for the update payload
interface ItemUpdateData {
  title?: string;
  subtitle?: string;
  price?: number;
  amount?: number;
  discount?: number;
  rating?: number;
  imageUrl?: string;
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await dbConnect();
    const formData = await req.formData();
    const { id } = params;

    // ✨ Use the specific, type-safe object instead of one with 'any'
    const updateData: ItemUpdateData = {};

    if (formData.has('title')) {
      updateData.title = formData.get('title') as string;
    }
    if (formData.has('subtitle')) {
      updateData.subtitle = formData.get('subtitle') as string;
    }

    // Convert numeric fields from string to number
    if (formData.has('price')) {
      updateData.price = Number(formData.get('price'));
    }
    if (formData.has('amount')) {
      updateData.amount = Number(formData.get('amount'));
    }
    if (formData.has('discount')) {
      const discountVal = formData.get('discount');
      updateData.discount = discountVal ? Number(discountVal) : 0;
    }
    if (formData.has('rating')) {
      const ratingVal = formData.get('rating');
      updateData.rating = ratingVal ? Number(ratingVal) : 0;
    }

    // Handle the image file upload
    if (formData.has('imageFile')) {
      const imageFile = formData.get('imageFile') as File | null;
      if (imageFile && imageFile.size > 0) {
        const arrayBuffer = await imageFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        updateData.imageUrl = await uploadImage(buffer);
      }
    }

    const updatedItem = await Item.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedItem) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json(updatedItem);
  } catch (err) {
    console.error('PUT /api/items/[id] error:', err);
    return NextResponse.json(
      { error: 'Server validation error' },
      { status: 500 },
    );
  }
}

// ... DELETE function remains the same

// ... your DELETE function remains the same
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await dbConnect();
    const { id } = params;
    const deletedItem = await Item.findByIdAndDelete(id);

    if (!deletedItem) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Item deleted successfully' });
  } catch (err) {
    console.error('DELETE /api/items/[id] error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
