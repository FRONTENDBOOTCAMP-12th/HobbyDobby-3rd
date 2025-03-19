import { useState, useEffect } from 'react';

// 제네릭 타입을 사용하여 다양한 데이터 타입을 처리할 수 있는 커스텀 훅 정의
function useFetchData<T>(
  fetchFunction: (props?: (string | number)[]) => Promise<T>, // 데이터를 가져오는 함수 (비동기)
  deps?: string | number // 의존성 상태값
) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean | null>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const result = await fetchFunction();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('데이터를 불러오는데 실패했습니다.');
      }
    };

    fetchData().catch((error) => {
      console.log('data fetching error', error);
    });

    setLoading(false);
  }, [fetchFunction, deps]); //fetchFunction, deps 의존성 추가

  return { data, error, loading };
}

export default useFetchData;
