import './style.css';
import Logo from '/assets/large-logo.svg';
import HobbySelectCard from '@/components/HobbySelect/HobbySelectCard';
import { getHobby } from '@/lib/api';
import Title from '@/layouts/title';
import useFetchData from '@/hooks/useFetchData';

function HobbySelectPage() {
  const { data: hobbyData } = useFetchData(getHobby);
  const hobbies = hobbyData?.data;

  return (
    <div className="hobby-select">
      <Title>취미 선택</Title>
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
    </div>
  );
}

export default HobbySelectPage;
