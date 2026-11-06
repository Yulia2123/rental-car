interface LoadMoreProps {
  onClick: () => void;
  disabled?: boolean;
}

export default function LoadMore({ onClick, disabled = false }: LoadMoreProps) {
  return (
    <button
      type="button"
      className="load-more-button"
      onClick={onClick}
      disabled={disabled}
    >
      {disabled ? "Loading..." : "Load more"}
    </button>
  );
}
