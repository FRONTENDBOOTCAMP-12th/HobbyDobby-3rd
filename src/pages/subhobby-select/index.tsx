import './style.css';
import LeftArrow from '/assets/left-arrow.svg';
import Logo from '/assets/large-logo.svg';
import SubHobbySelectCard from '@/components/SubHobbySelect/SubHobbySelectCard';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-client';
import { getHobbyIcon } from '@/utils/getHobbyIcon';
import { Link, useParams } from 'react-router';

interface subHobbiesProps {
  hobby_id: string | null;
  id: string;
  info: string;
  name: string;
}

function SubHobbySelectPage() {
  const [subHobbies, setSubHobbies] = useState<subHobbiesProps[] | null>([]);
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await supabase.from('sub_hobby').select('*');
        setSubHobbies(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData().catch((error) => {
      console.log('Error fetching subhobbies:', error);
    });
  }, []);

  return (
    <div className="subhobby-select">
      <header className="subhobby-select__header">
        <Link
          to="/select-hobby"
          className="subhobby-select__button"
          aria-label="뒤로 가기"
        >
          <img src={LeftArrow} alt="뒤로 가기" aria-hidden="true" />
        </Link>
        <h1 className="subhobby-select__logo">
          <span className="sr-only">Hobby Dobby</span>
          <img src={Logo} alt="Hobby Dobby" aria-hidden="true" />
        </h1>
      </header>
      <div className="subhobby-select__content">
        <div className="subhobby-select__selected">
          <img src={getHobbyIcon(params.name!)} alt={params.name} />
          <span>{params.name}</span>
        </div>
      </div>
      {subHobbies?.map((data) => (
        <SubHobbySelectCard key={data.id} name={data.name} info={data.info} />
      ))}
    </div>
  );
}

export default SubHobbySelectPage;
