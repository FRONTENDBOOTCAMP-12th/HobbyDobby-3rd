import { ErrorBoundary } from 'react-error-boundary';
import PrintError from '@/components/ErrorBoundary';
// import LoginPage from '@/pages/login';
// import LandingPage from '@/pages/landing-page';
// import HobbySelectPage from '@/pages/hobby-select';
import MainpageStart from '@/pages/mainpage-start';

function App() {
  return (
    <ErrorBoundary FallbackComponent={PrintError}>
      {/* <LoginPage /> */}
      {/* <LandingPage /> */}
      {/* <HobbySelectPage /> */}
      <MainpageStart />
    </ErrorBoundary>
  );
}

export default App;
