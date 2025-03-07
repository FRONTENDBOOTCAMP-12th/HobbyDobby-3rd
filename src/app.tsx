import { ErrorBoundary } from 'react-error-boundary';
import PrintError from '@/components/ErrorBoundary';
// import LoginPage from '@/pages/login';
// import LandingPage from '@/pages/landing-page';
// import HobbySelectPage from '@/pages/hobby-select';

function App() {
  return (
    <ErrorBoundary FallbackComponent={PrintError}>
      {/* <LoginPage /> */}
      {/* <LandingPage /> */}
      {/* <HobbySelectPage /> */}
    </ErrorBoundary>
  );
}

export default App;
