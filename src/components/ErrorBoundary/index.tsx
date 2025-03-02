import { FallbackProps } from 'react-error-boundary';

function PrintError({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert">
      <h2 className="text-2xl">오류 발생!</h2>
      <p className="text-lg text-red-500/90 mb-2">{(error as Error).message}</p>
      <button type="button" onClick={resetErrorBoundary}>
        오류 복구
      </button>
    </div>
  );
}

export default PrintError;
