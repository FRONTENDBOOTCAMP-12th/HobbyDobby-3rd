import './style.css';
import LeftArrow from '/assets/left-arrow.svg';
import Logo from '/assets/large-logo.svg';
import SubHobbySelectCard from '@/components/SubHobbySelect/SubHobbySelectCard';

const exampleData = [
  {
    id: 1,
    name: '문학',
    info: '세부 장르에 대한 간단한 소개문, 세부 장르 챌린지에 대한 간략한 정보를 담는 텍스트 공간',
  },
  {
    id: 2,
    name: '비문학',
    info: '세부 장르에 대한 간단한 소개문, 세부 장르 챌린지에 대한 간략한 정보를 담는 텍스트 공간22222',
  },
];

function SubHobbySelectPage() {
  return (
    <div className="subhobby-select">
      <header className="subhobby-select__header">
        <button className="subhobby-select__button" aria-label="뒤로 가기">
          <img src={LeftArrow} alt="뒤로 가기" aria-hidden="true" />
        </button>
        <h1 className="subhobby-select__logo">
          <span className="sr-only">Hobby Dobby</span>
          <img src={Logo} alt="Hobby Dobby" aria-hidden="true" />
        </h1>
      </header>
      <div className="subhobby-select__content">
        <div className="subhobby-select__selected">
          <img src="/assets/book.svg" alt="독서" />
          <span>독서</span>
        </div>
      </div>
      {exampleData.map((data) => (
        <SubHobbySelectCard key={data.id} name={data.name} info={data.info} />
      ))}
    </div>
  );
}

export default SubHobbySelectPage;
