// models/item.ts

// import mongoose, { Schema, Document, models } from 'mongoose';

// export interface IItem extends Document {
//   title: string;
//   subtitle: string;
//   discount: number;
//   price: number;
//   amount: number;
//   rating: number;
//   imageUrl: string;
// }

// const ItemSchema = new Schema<IItem>(
//   {
//     title: { type: String, required: true },
//     subtitle: { type: String },
//     discount: { type: Number, default: 0 },
//     price: { type: Number, required: true },
//     amount: { type: Number, required: true },
//     rating: { type: Number, default: 0 },
//     imageUrl: { type: String, required: true },
//   },
//   { timestamps: true },
// );

// export default models.Item || mongoose.model<IItem>('Item', ItemSchema);

import mongoose, { Schema, model, models } from 'mongoose';

const ItemSchema = new Schema({
  title: String,
  subtitle: String,
  discount: Number,
  price: Number,
  amount: Number,
  rating: Number,
  imageUrl: String,
});

const Item = models.Item || model('Item', ItemSchema);

export default Item;
