import { getPublicImage } from '@/utils/getPublic';
import './style.css';
import { useState } from 'react';

function MyPage() {
  const [isStatistics] = useState(false);
  const [isAchievements] = useState(false);

  return (
    <div className="my-page drag-prevent">
      <h1 className="sr-only">마이페이지</h1>
      <header>상단바 공간</header>
      <main>
        <section className="profile-header">
          <span className="profile-image-frame">
            <h2 className="sr-only">프로필 이미지</h2>
          </span>
          <button className="edit-profile-btn">
            <img
              src={getPublicImage('edit-profile.svg')}
              alt="프로필 수정하기"
            />
          </button>
        </section>

        <section className="profile-body">
          <article className="board profile-details-board">
            <span className="profile-main-hobby-icon-frame">
              <h2 className="sr-only">대표 취미 아이콘</h2>
            </span>
            <ul>
              <li>닉네임</li>
              <li>칭호</li>
              <li>가입일 : 2025년 3월</li>
            </ul>
          </article>
          <article className="board">
            <h2>통계</h2>
            {isStatistics ? <p>통계</p> : <p>통계가 없습니다.</p>}
          </article>
          <article className="board">
            <h2>업적</h2>
            {isAchievements ? <p>업적</p> : <p>업적이 없습니다.</p>}
          </article>
        </section>
      </main>
      <footer>하단바 공간</footer>
    </div>
  );
}

export default MyPage;
