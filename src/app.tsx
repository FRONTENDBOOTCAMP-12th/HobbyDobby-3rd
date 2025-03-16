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
import ChallengeEnd from './pages/main-page-end';

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
          <Route path="/challenge-end" element={<ChallengeEnd />} />

          <Route element={<MainLayout />}>
            <Route path="/leader-board">
              <Route index element={<LeaderBoardCompletedPage />} />
              <Route
                path="detail/:challenge_name"
                element={<LeaderBoardDetailPage />}
              />
            </Route>
            <Route path="/mypage" element={<MyPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
