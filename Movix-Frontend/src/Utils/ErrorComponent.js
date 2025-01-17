const ErrorComponent = ({ error, resetErrorBoundary }) => (
  <div>
    <h2>Something went wrong!</h2>
    <details>
      <summary>Error details</summary>
      {error.message}
    </details>
    <button onClick={resetErrorBoundary}>Try again</button>
  </div>
);
export default ErrorComponent;