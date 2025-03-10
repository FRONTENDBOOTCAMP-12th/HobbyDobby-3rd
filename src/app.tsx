import { BrowserRouter, Route, Routes } from 'react-router';
import { ErrorBoundary } from 'react-error-boundary';
import PrintError from '@/components/ErrorBoundary';
// import LoginPage from '@/pages/login';
// import LandingPage from '@/pages/landing-page';
// import HobbySelectPage from '@/pages/hobby-select';
import MainpageStart from '@/pages/mainpage-start';
import SubHobbySelectPage from './pages/subhobby-select';
import LoginPage from '@/pages/login';
import LandingPage from '@/pages/landing-page';
import HobbySelectPage from '@/pages/hobby-select';
import MyPage from '@/pages/my-page';
import RegisterPage from './pages/register';

function App() {
  return (
    <ErrorBoundary FallbackComponent={PrintError}>
      {/* <LoginPage /> */}
      {/* <LandingPage /> */}
      {/* <HobbySelectPage /> */}
      <MainpageStart />
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route index path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/select-hobby" element={<HobbySelectPage />} />
          <Route
            path="/select-hobby/:hobby_name"
            element={<SubHobbySelectPage />}
          />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
