import { BrowserRouter, Route, Routes } from 'react-router';
import { ErrorBoundary } from 'react-error-boundary';
import PrintError from '@/components/ErrorBoundary';
import SubHobbySelectPage from './pages/subhobby-select';
import LoginPage from '@/pages/login';
import LandingPage from '@/pages/landing-page';
import HobbySelectPage from '@/pages/hobby-select';

function App() {
  return (
    <ErrorBoundary FallbackComponent={PrintError}>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route index path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/select-hobby" element={<HobbySelectPage />} />
          <Route
            path="/select-hobby/:hobby_name"
            element={<SubHobbySelectPage />}
          />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
