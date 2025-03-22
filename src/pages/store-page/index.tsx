import { useEffect, useState } from 'react';
import { fetchItems, getUserHavingItems, Item } from '@/lib/api';
import './style.css';
import StoreItem from '@/components/StoreItem';
import { useUserStore } from '@/stores/user';

function StorePage() {
  const userId = useUserStore((state) => state.uid);

  const [items, setItems] = useState<Item[]>([]);
  const [userItems, setUserItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 비동기 함수 loadItems를 별도로 선언하여 호출합니다.
    const loadItems = async () => {
      try {
        setLoading(true);
        setError(null);

        // 아이템을 가져오는 fetchItems 함수 사용
        const fetchedItems = await fetchItems();
        setItems(fetchedItems);

        // 사용자 보유 아이템을 가져오는 fetch 함수
        const ownedItems = await getUserHavingItems(userId);
        setUserItems(ownedItems);
      } catch (err) {
        console.error('❌ 아이템 불러오기 오류:', err);
        setError(
          '아이템을 불러오는 중 오류가 발생했습니다. 다시 시도해 주세요.'
        );
      } finally {
        setLoading(false);
      }
    };

    // loadItems 호출
    loadItems().catch((err) => {
      // catch를 사용하여 에러를 처리합니다.
      console.error('❌ loadItems에서 오류 발생:', err);
    });
  }, [userId]);

  return (
    <main className="store-page">
      <h1 className="sr-only">Hobby Dobby</h1>
      <div className="store-item__container">
        {error && <p>{error}</p>}
        {!loading && items.length === 0 && <p>아이템이 없습니다.</p>}

        {/* 아이템 목록 */}
        {items.map((item) => (
          <StoreItem
            key={item.id}
            item={item}
            owned={userItems?.includes(item?.name)} // 보유 여부 전달
          />
        ))}
      </div>
    </main>
  );
}

export default StorePage;
