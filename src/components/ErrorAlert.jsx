export default function ErrorAlert({ mensaje }) {
  if (!mensaje) return null;

  return (
    <div className="notifications-container">
      <div className="error-alert">
        <svg
          className="error-svg flex-shrink-0"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M18 10A8 8 0 11.001 10 8 8 0 0118 10zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 001.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
        <div className="error-prompt-container">
          <span className="error-prompt-heading">Error</span>
          <div className="error-prompt-wrap">{mensaje}</div>
        </div>
      </div>
    </div>
  );
}
