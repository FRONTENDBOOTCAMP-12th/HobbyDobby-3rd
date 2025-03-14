import { BrowserRouter, Route, Routes } from 'react-router';
import { ErrorBoundary } from 'react-error-boundary';
import PrintError from '@/components/ErrorBoundary';
import MainLayout from '@/layouts/main-layout';
import SubHobbySelectPage from '@/pages/subhobby-select';
import LoginPage from '@/pages/login';
import LandingPage from '@/pages/landing-page';
import HobbySelectPage from '@/pages/hobby-select';
import MyPage from '@/pages/my-page';
import RegisterPage from '@/pages/register';
import LeaderBoardCompletedPage from '@/pages/leader-board-completed';
import LeaderBoardDetailPage from './pages/leader-board-detail';
import LeaderBoardRankingPage from './pages/leader-board-ranking';
import UnitPage from './pages/unit-page';
import MainPage from './pages/main-page';
import MainPageStart from './pages/main-page-start';

function App() {
  return (
    <ErrorBoundary FallbackComponent={PrintError}>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/select-hobby" element={<HobbySelectPage />} />
          <Route
            path="/select-hobby/:hobby_name"
            element={<SubHobbySelectPage />}
          />
          <Route path="/challenge-start" element={<MainPageStart />} />
          <Route element={<MainLayout />}>
            <Route path="/home">
              <Route index element={<MainPage />} />
            </Route>
            <Route path="/leader-board">
              <Route index element={<LeaderBoardCompletedPage />} />
              <Route
                path="detail/:challenge_name"
                element={<LeaderBoardDetailPage />}
              />
              <Route path="ranking" element={<LeaderBoardRankingPage />} />
            </Route>
            <Route path="/mypage" element={<MyPage />} />
          </Route>
          <Route path="/unit-page" element={<UnitPage />}></Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
