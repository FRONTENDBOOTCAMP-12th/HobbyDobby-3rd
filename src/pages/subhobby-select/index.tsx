import './style.css';
import Title from '@/layouts/title';
import { useCallback } from 'react';
import { getSubHobby } from '@/lib/api';
import Logo from '/assets/large-logo.svg';
import LeftArrow from '/assets/left-arrow.svg';
import useFetchData from '@/hooks/useFetchData';
import { getHobbyIcon } from '@/utils/getHobbyIcon';
import { useLocation, useNavigate, useParams } from 'react-router';
import SubHobbySelectCard from '@/components/SubHobbySelect/SubHobbySelectCard';

interface LocationState {
  hobbyName: string;
}

function SubHobbySelectPage() {
  const params = useParams();
  const selectedHobby = params.hobby_name;
  const location = useLocation();
  const locationState = { ...(location.state as LocationState) };
  const hobbyName = locationState.hobbyName;
  const navigate = useNavigate();

  const fetchSubHobby = useCallback(() => getSubHobby(hobbyName), [hobbyName]);

  const { data: subHobbyData } = useFetchData(fetchSubHobby, hobbyName);
  const subHobbies = subHobbyData?.data;

  return (
    <div className="subhobby-select">
      <Title>상세 취미 선택</Title>
      <header className="subhobby-select__header">
        <button
          onClick={() => void navigate(-1)}
          className="subhobby-select__button"
          aria-label="뒤로 가기"
        >
          <img src={LeftArrow} alt="" />
        </button>
        <h1 className="subhobby-select__logo">
          <span className="sr-only">Hobby Dobby</span>
          <img src={Logo} alt="" />
        </h1>
      </header>
      <div className="subhobby-select__content">
        <div className="subhobby-select__selected">
          <img src={getHobbyIcon(selectedHobby)} alt="" />
          <span>{selectedHobby}</span>
        </div>
      </div>
      {subHobbies?.map((data) => (
        <SubHobbySelectCard
          key={data.id}
          name={data.name}
          info={data.info}
          hobby={hobbyName}
        />
      ))}
    </div>
  );
}

export default SubHobbySelectPage;
