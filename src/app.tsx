import { ErrorBoundary } from 'react-error-boundary';
import PrintError from '@/components/ErrorBoundary';
import MyPage from './pages/my-page';
// import SubHobbySelectPage from './pages/subhobby-select';
// import LoginPage from '@/pages/login';
// import LandingPage from '@/pages/landing-page';
// import HobbySelectPage from '@/pages/hobby-select';

function App() {
  return (
    <ErrorBoundary FallbackComponent={PrintError}>
      {/* <LoginPage /> */}
      {/* <LandingPage /> */}
      {/* <HobbySelectPage /> */}
      {/* <SubHobbySelectPage /> */}
      <MyPage />
    </ErrorBoundary>
  );
}

export default App;
