import { Item, updateUserGemAtStore, updateUserHavingItem } from '@/lib/api';
import './store-item.css';
import Swal from 'sweetalert2';
import { useUserStore } from '@/stores/user';
import { useEffect, useState } from 'react';

interface StoreItemProps {
  item: Item;
  owned: boolean;
}

function StoreItem({ item, owned }: StoreItemProps) {
  const userId = useUserStore((state) => state.uid);
  const userGem = useUserStore((state) => state.gem);
  const updateGem = useUserStore((state) => state.updateGem);

  // owned의 값을 상태로 관리하여 업데이트
  const [isOwned, setIsOwned] = useState(owned);

  // owned prop이 변경될 때 상태를 업데이트하도록 useEffect 추가
  useEffect(() => {
    setIsOwned(owned);
  }, [owned]);

  const handleBuyButton = () => {
    Swal.fire({
      text: '해당 상품을 구입하시겠습니까?',
      icon: 'question',
      heightAuto: false,
      confirmButtonColor: `var(--primary-color)`,
      showCancelButton: true,
      confirmButtonText: '구매',
      cancelButtonText: '취소',
    })
      .then((result) => {
        if (result.isConfirmed) {
          if (userGem && userGem >= item.price) {
            try {
              updateUserHavingItem(userId, item.name).catch((error) =>
                console.log(error)
              );
              updateUserGemAtStore(userId, userGem, item.price)
                .then((gem) => updateGem(gem!))
                .catch((error) => console.log(error));
              setIsOwned(true);
            } catch (error) {
              console.log(error);

              Swal.fire({
                title: '구매 실패..',
                icon: 'error',
                text: '잠시 후 다시 시도해주세요.',
                heightAuto: false,
                confirmButtonColor: `var(--primary-color)`,
              }).catch((error) => console.log(error));
            }

            Swal.fire({
              title: '구매 완료!',
              icon: 'success',
              text: '마이페이지에서 사용 가능합니다.',
              heightAuto: false,
              confirmButtonColor: `var(--primary-color)`,
            }).catch((error) => {
              console.log(error);
            });
          } else {
            Swal.fire({
              text: '구입이 불가능합니다.',
              icon: 'warning',
              heightAuto: false,
              confirmButtonColor: `var(--primary-color)`,
            }).catch((error) => console.log(error));
          }
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div key={item.id} className="store-item__itemdb">
      <div className="store-item__left">
        <img src={item.image} alt={item.name} className="store-item__image" />
        <div className="store-item__gem-price">
          <img src="/assets/gem.svg" alt="" className="store-item__gem" />
          <span className="store-item__price"> {item.price}</span>
        </div>
      </div>
      <div className="store-item__center">
        <p className="store-item__name">{item.name}</p>
        <p className="store-item__explanation">
          아이템으로 프로필을 멋지게 꾸며보세요!
        </p>
      </div>
      <div className="store-item__right">
        <button
          className="store-item__buy-button"
          disabled={isOwned}
          onClick={handleBuyButton}
        >
          {isOwned ? '보유중' : '구입하기'}
        </button>
      </div>
    </div>
  );
}

export default StoreItem;
