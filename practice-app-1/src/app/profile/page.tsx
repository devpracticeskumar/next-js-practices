import { ProfileCard } from '@/components/ProfileCard';
import user from '@/assets/user.png';

export default function Profile() {
  return (
    <>
      <div className="m-15">
        <div className="my-5 m-auto border border-amber-50 rounded-2xl p-3 max-w-[80%]">
          <ProfileCard
            image={user}
            name="Rohit Verma"
            username="rohitverma"
            age={15}
          />
          <div className="flex flex-row justify-between my-5 p-3">
            <div className="border border-amber-50 w-[30%] rounded-2xl min-h-52 text-2xl text-center p-3">
              Coin Earned: <span className="text-yellow-500">500 coin</span>
            </div>
            <div className="border border-amber-50 w-[50%] rounded-2xl min-h-52 text-2xl text-center p-3">
              Available Coupon:{' '}
              <span className="text-yellow-500">10 coupons</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
