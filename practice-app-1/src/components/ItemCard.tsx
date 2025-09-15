import Image, { StaticImageData } from 'next/image';

export function ItemCard(props: {
  image: string | StaticImageData;
  title: string;
  subtitle: string;
  discount: number;
  price: number;
  amount: number;
  rating: number;
}) {
  return (
    <>
      <div className="border border-amber-50 p-3 rounded-2xl w-[30%] my-3 m-auto">
        <Image
          src={props.image}
          alt="user"
          className=" my-3 m-auto bg-amber-50 rounded-2xl"
        />
        <ul className="text-center">
          <li className="text-2xl text-emerald-500">{props.title}</li>
          <li>{props.subtitle}</li>
        </ul>
        <ul className="text-xl flex flex-raw justify-around">
          <li>Discount: {props.discount}%</li>
          <li>Price: {props.price}</li>
        </ul>
        <ul className="text-xl flex flex-raw justify-around">
          <li>Amount: {props.amount}g</li>
          <li>Rating: {props.rating}/5</li>
        </ul>
        <button className="bg-cyan-800 rounded-2xl px-2 py-1 w-[98%] my-3 m-auto cursor-pointer">
          Add to Cart
        </button>
      </div>
    </>
  );
}
