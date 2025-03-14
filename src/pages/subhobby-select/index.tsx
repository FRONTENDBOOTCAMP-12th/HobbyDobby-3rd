import './style.css';
import LeftArrow from '/assets/left-arrow.svg';
import Logo from '/assets/large-logo.svg';
import SubHobbySelectCard from '@/components/SubHobbySelect/SubHobbySelectCard';
import { getHobbyIcon } from '@/utils/getHobbyIcon';
import { Link, useLocation, useParams } from 'react-router';
import { getSubHobby } from '@/lib/api';
import Title from '@/layouts/title';
import useFetchData from '@/hooks/useFetchData';

interface locationState {
  hobbyId: string;
}

function SubHobbySelectPage() {
  const params = useParams();
  const selectedHobby = params.hobby_name;
  const location = useLocation();
  const locationState = { ...(location.state as locationState) };
  const hobbyId = locationState.hobbyId;

  const { data: subHobbyData } = useFetchData(
    () => getSubHobby(hobbyId),
    hobbyId
  );
  const subHobbies = subHobbyData?.data;

  return (
    <div className="subhobby-select">
      <Title>상세 취미 선택</Title>
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
          <img src={getHobbyIcon(selectedHobby)} alt={selectedHobby} />
          <span>{selectedHobby}</span>
        </div>
      </div>
      {subHobbies?.map((data) => (
        <SubHobbySelectCard key={data.id} name={data.name} info={data.info} />
      ))}
    </div>
  );
}

export default SubHobbySelectPage;
