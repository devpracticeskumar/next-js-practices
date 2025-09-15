// api/items/route.ts
import { uploadImage } from '@/utils/cloudinary';
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Item from '@/models/item';

export async function GET() {
  try {
    console.log('Connecting to DB...');
    await dbConnect();
    console.log('Connected. Fetching items...');
    const items = await Item.find();
    console.log('Items found:', items);
    return NextResponse.json(items);
  } catch (error) {
    console.error('GET /api/items error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const formData = await req.formData();
    console.log('Received formData');

    const title = formData.get('title') as string;
    const subtitle = formData.get('subtitle') as string;
    const discount = Number(formData.get('discount'));
    const price = Number(formData.get('price'));
    const amount = Number(formData.get('amount'));
    const rating = Number(formData.get('rating'));
    const imageFile = formData.get('imageFile') as File | null;

    if ([discount, price, amount, rating].some((val) => isNaN(val))) {
      return NextResponse.json(
        { error: 'Invalid number input' },
        { status: 400 },
      );
    }

    let imageUrl = '';
    if (imageFile) {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      console.log('Uploading image...');
      imageUrl = await uploadImage(buffer);
      console.log('Uploaded image URL:', imageUrl);
    }

    const newItem = await Item.create({
      title,
      subtitle,
      discount,
      price,
      amount,
      rating,
      imageUrl,
    });

    console.log('Item created:', newItem);
    return NextResponse.json(newItem, { status: 201 });
  } catch (err) {
    console.error('POST /api/items error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
