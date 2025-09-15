import Image, { StaticImageData } from 'next/image';

export function ProfileCard(props: {
  image: string | StaticImageData;
  name: string;
  username: string;
  age: number;
}) {
  return (
    <>
      <div className=" p-3 rounded-2xl w-[40%] my-3 m-auto">
        <Image
          src={props.image}
          alt="user"
          width={155}
          height={155}
          className=" my-3 m-auto bg-amber-50 rounded-[50%]"
        />
        <ul className="text-center">
          <li className="text-xl text-emerald-500">{props.name}</li>
          <li>username: {props.username}</li>
          <li>Age: {props.age}</li>
        </ul>
      </div>
    </>
  );
}
