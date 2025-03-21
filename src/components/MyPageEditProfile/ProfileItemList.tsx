// import { getUserItems } from '@/lib/api';
// import { useUserStore } from '@/stores/user';
// import { useEffect, useState } from 'react';
// import './ProfileItemList.css';
// import { ItemsType } from '@/types/my-page-edit-profile/profile-item';

// function ProfileItemList({
//   nowItem,
//   setNowItem,
// }: {
//   nowItem: { item: string; name: string };
//   setNowItem: (item: { item: string; name: string }) => void;
// }) {
//   const userId = useUserStore((state) => state.uid);
//   const [items, setItems] = useState<ItemsType[]>([]);

//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         const data = await getUserItems(userId);
//         setItems(data);
//       } catch (error) {
//         console.error('아이템 가져오기 실패:', error);
//       }
//     };
//     void fetchItems();
//   }, [userId]);

//   const handleItemClick = (item: ItemsType) => {
//     const clickedItem = item.item?.name ?? '';

//     if (clickedItem === nowItem.name) {
//       console.log('이미 적용된 아이템');
//       return;
//     } else {
//       setNowItem({
//         item: item.item?.image ?? '',
//         name: item.item?.name ?? '',
//       });
//       console.log('아이템 변경:', clickedItem, item);
//     }
//   };

//   return (
//     <div className="profile-item-list__container">
//       <h2 className="sr-only">프로필 항목 리스트</h2>
//       {items.map((item) => (
//         <button
//           key={item.item?.id}
//           className="profile-item__frame"
//           onClick={() => handleItemClick(item)}
//         >
//           <img src={item.item?.image} alt={item.item?.name} />
//         </button>
//       ))}
//     </div>
//   );
// }

// export default ProfileItemList;
