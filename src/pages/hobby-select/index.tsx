import { useEffect, useState } from 'react';
import './style.css';
import Logo from '/assets/large-logo.svg';
import HobbySelectCard from '@/components/HobbySelect/HobbySelectCard';
import { getHobby } from '@/lib/api';

interface HobbiesProps {
  id: string;
  name: string;
}

function HobbySelectPage() {
  const [hobbies, setHobbies] = useState<HobbiesProps[] | null>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getHobby();

        if (data) {
          setHobbies(data);
        } else {
          throw new Error('데이터를 불러오는데 실패했습니다..');
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData().catch((error) => {
      console.error('Error fetching hobbies:', error);
    });
  }, []);

  return (
    <>
      <h1 className="hobby-selecet__logo">
        <span className="sr-only">Hobby Dobby</span>
        <img src={Logo} alt="Hobby Dobby" aria-hidden="true" />
      </h1>
      <p className="hobby-select__desc">관심있는 취미 활동을 선택해주세요!</p>
      <ul className="hobby-select__list">
        {hobbies?.map((item) => (
          <HobbySelectCard key={item.id} id={item.id} name={item.name} />
        ))}
      </ul>
    </>
  );
}

export default HobbySelectPage;
