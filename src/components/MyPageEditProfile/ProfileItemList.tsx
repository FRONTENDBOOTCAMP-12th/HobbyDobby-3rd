import { useEffect, useState } from 'react';
import { getUserItems } from '@/lib/api';
import { useUserStore } from '@/stores/user';
import { useEditProfileStore } from '@/stores/user-profile-edit';
import { ItemsType } from '@/types/my-page-edit-profile/profile-item';
import './styles/profile-item-list.css';

function ProfileItemList({
  newItem,
}: {
  newItem: { image: string; name: string } | null;
}) {
  const userId = useUserStore((state) => state.uid);
  const [items, setItems] = useState<ItemsType[]>([]);

  // 프로필 편집 상태 관리 업데이트
  const handleNewItem = (newItem: { image: string; name: string }) => {
    useEditProfileStore.setState({
      profile: {
        ...useEditProfileStore.getState().profile,
        item: newItem,
      },
    });
  };

  // 아이템 클릭 이벤트 핸들러
  const handleItemClick = (item: ItemsType) => {
    const clickedItem = item.item?.name ?? '';

    // 이미 선택된 아이템을 클릭했을 때 => 아이템 해제
    if (clickedItem === newItem?.name) {
      handleNewItem({
        image: '',
        name: '',
      });
    } else {
      // 새로운 아이템을 선택했을 때
      handleNewItem({
        image: item.item!.image,
        name: item.item!.name,
      });
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getUserItems(userId);
        if (Array.isArray(data)) {
          setItems(data as ItemsType[]);
        } else {
          console.error('Unexpected data format:', data);
        }
      } catch (error) {
        console.error('아이템 가져오기 실패:', error);
      }
    };
    void fetchItems();
  }, [userId]);

  return (
    <div className="profile-item-list__container">
      <h2 className="sr-only">프로필 항목 리스트</h2>
      {items.map((item) => (
        <button
          key={item.item?.id}
          style={{
            border:
              newItem?.name === item.item?.name
                ? '3px solid var(--primary-color)'
                : '',
          }}
          className="profile-item-list-item__frame"
          onClick={() => handleItemClick(item)}
        >
          <img src={item.item?.image} alt={item.item?.name} />
        </button>
      ))}
    </div>
  );
}

export default ProfileItemList;
