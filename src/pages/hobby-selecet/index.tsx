import { useEffect, useState } from 'react';
import './style.css';
import Logo from '/assets/large-logo.svg';
import HobbySelectCard from '@/components/HobbySelecet/HobbySelectCard';
import { supabase } from '@/lib/supabase-client';

interface HobbiesProps {
  id: number;
  name: string;
}

function HobbySelectPage() {
  const [hobbies, setHobbies] = useState<HobbiesProps[] | null>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await supabase.from('hobby').select('*');
        setHobbies(data);
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
