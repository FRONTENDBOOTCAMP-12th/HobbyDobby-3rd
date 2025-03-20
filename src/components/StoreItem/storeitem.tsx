import { useEffect, useState } from 'react';
import { fetchItems, Item } from '@/lib/api';
import './store-item.css';

function StoreItem() {
  const [items, setItems] = useState<Item[]>([]);
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
        console.log('📌 가져온 아이템 데이터:', fetchedItems);
        setItems(fetchedItems);
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
  }, []);

  return (
    <div className="store-item">
      {loading && <p className="loading-text">로딩 중...</p>}
      {error && <p className="error-text">{error}</p>}
      {!loading && items.length === 0 && (
        <p className="empty-text">아이템이 없습니다.</p>
      )}

      {/* 아이템 목록 */}
      {items.map((item) => (
        <div key={item.id} className="store-item__item">
          <img src={item.image} alt={item.name} className="item-image" />
          <div className="item-info">
            <h3 className="item-name">{item.name}</h3>
            <p className="item-description">{item.description}</p>
            <div className="item-footer">
              <span className="item-price">💎 {item.price}</span>
              <button className="buy-button">구입하기</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StoreItem;
