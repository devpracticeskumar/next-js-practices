import { ItemCard } from '@/components/ItemCard';
import cutlery from '@/assets/cutlery.png';

export default function MenuPage() {
  return (
    <>
      <div className=""></div>
      <div className="my-5 m-auto border border-amber-50 rounded-2xl p-3 max-w-[80%] flex flex-wrap">
        <ItemCard
          image={cutlery}
          title="Burger Special-Alpha"
          subtitle="Testy, spicy and half roasted chicken special burger"
          discount={10}
          price={15}
          amount={300}
          rating={4.5}
        />
        <ItemCard
          image={cutlery}
          title="Burger Special-Alpha"
          subtitle="Testy, spicy and half roasted chicken special burger"
          discount={10}
          price={15}
          amount={300}
          rating={4.5}
        />
        <ItemCard
          image={cutlery}
          title="Burger Special-Alpha"
          subtitle="Testy, spicy and half roasted chicken special burger"
          discount={10}
          price={15}
          amount={300}
          rating={4.5}
        />
        <ItemCard
          image={cutlery}
          title="Burger Special-Alpha"
          subtitle="Testy, spicy and half roasted chicken special burger"
          discount={10}
          price={15}
          amount={300}
          rating={4.5}
        />
        <ItemCard
          image={cutlery}
          title="Burger Special-Alpha"
          subtitle="Testy, spicy and half roasted chicken special burger"
          discount={10}
          price={15}
          amount={300}
          rating={4.5}
        />
      </div>
    </>
  );
}
