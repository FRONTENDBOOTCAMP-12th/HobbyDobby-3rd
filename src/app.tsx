import { ErrorBoundary } from 'react-error-boundary';
import PrintError from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary FallbackComponent={PrintError}>
      <div>Hello Project!</div>
    </ErrorBoundary>
  );
}

export default App;
