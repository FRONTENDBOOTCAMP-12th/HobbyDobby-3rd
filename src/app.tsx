import { ErrorBoundary } from 'react-error-boundary';
import PrintError from '@/components/ErrorBoundary';
// import LoginPage from '@/pages/login';

function App() {
  return (
    <ErrorBoundary FallbackComponent={PrintError}>
      {/* <LoginPage /> */}
    </ErrorBoundary>
  );
}

export default App;
