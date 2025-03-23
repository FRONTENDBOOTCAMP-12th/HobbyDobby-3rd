import { getUserItems } from '@/lib/api';
import { useUserStore } from '@/stores/user';
import { useEditProfileStore } from '@/stores/user-profile-edit';
import { ItemsType } from '@/types/my-page-edit-profile/profile-item';
import { useEffect, useState } from 'react';
import './styles/profile-item-list.css';

function ProfileItemList({
  newItem,
}: {
  newItem: { image: string; name: string } | null;
}) {
  const userId = useUserStore((state) => state.uid);
  const [items, setItems] = useState<ItemsType[]>([]);

  const handleNewItem = (newItem: { image: string; name: string }) => {
    useEditProfileStore.setState({
      profile: {
        ...useEditProfileStore.getState().profile,
        item: newItem,
      },
    });
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

  const handleItemClick = (item: ItemsType) => {
    const clickedItem = item.item?.name ?? '';

    if (clickedItem === newItem?.name) {
      handleNewItem({
        image: '',
        name: '',
      });
      console.log('아이템 적용 해제');
      return;
    } else {
      handleNewItem({
        image: item.item?.image ?? '',
        name: item.item?.name ?? '',
      });
      console.log('아이템 변경:', clickedItem, item);
    }
  };

  return (
    // <div className="profile-item-list__outer-container">
    <div className="profile-item-list__inner-container">
      <h2 className="sr-only">프로필 항목 리스트</h2>
      {items.map((item) => (
        <button
          key={item.item?.id}
          style={{
            border:
              newItem?.name === item.item?.name
                ? '2px solid var(--secondary-color)'
                : '',
          }}
          className="profile-item__frame"
          onClick={() => handleItemClick(item)}
        >
          <img src={item.item?.image} alt={item.item?.name} />
        </button>
      ))}
      {items.map((item) => (
        <button
          key={item.item?.id}
          style={{
            border:
              newItem?.name === item.item?.name
                ? '2px solid var(--secondary-color)'
                : '',
          }}
          className="profile-item__frame"
          onClick={() => handleItemClick(item)}
        >
          <img src={item.item?.image} alt={item.item?.name} />
        </button>
      ))}
    </div>
    // </div>
  );
}

export default ProfileItemList;
