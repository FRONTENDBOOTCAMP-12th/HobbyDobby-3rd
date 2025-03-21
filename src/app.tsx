import { BrowserRouter, Route, Routes } from 'react-router';
import { ErrorBoundary } from 'react-error-boundary';
import { lazy, Suspense } from 'react';

import PrintError from '@/components/ErrorBoundary';
import MainLayout from '@/layouts/main-layout';

import StorePage from '@/pages/store-page';

const ChallengeEndPage = lazy(() => import('@/pages/main-page-end'));
const SubHobbySelectPage = lazy(() => import('@/pages/subhobby-select'));
const LoginPage = lazy(() => import('@/pages/login'));
const LandingPage = lazy(() => import('@/pages/landing-page'));
const HobbySelectPage = lazy(() => import('@/pages/hobby-select'));
const MyPage = lazy(() => import('@/pages/my-page'));
const RegisterPage = lazy(() => import('@/pages/register'));
const LeaderBoardCompletedPage = lazy(
  () => import('@/pages/leader-board-completed')
);
const LeaderBoardDetailPage = lazy(() => import('@/pages/leader-board-detail'));
const LeaderBoardRankingPage = lazy(
  () => import('@/pages/leader-board-ranking')
);
const UnitPage = lazy(() => import('@/pages/unit-page'));
const MainPage = lazy(() => import('@/pages/main-page'));
const MainPageStart = lazy(() => import('@/pages/main-page-start'));

function App() {
  return (
    <ErrorBoundary FallbackComponent={PrintError}>
      <Suspense fallback={<div role="status">페이지 로딩 중...</div>}>
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
            <Route path="/challenge-end" element={<ChallengeEndPage />} />
            <Route path="storepage" element={<StorePage />} />
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
            <Route path="/unit-page" element={<UnitPage />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
