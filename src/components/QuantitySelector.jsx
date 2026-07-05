export default function QuantitySelector({ qty, onChange, min = 1 }) {
  return (
    <div className="inline-flex items-center rounded-full border border-neutral-300">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, qty - 1))}
        className="flex h-9 w-9 items-center justify-center text-lg text-neutral-600 hover:text-neutral-900"
        aria-label="수량 감소"
      >
        −
      </button>
      <span className="w-8 text-center text-sm font-medium">{qty}</span>
      <button
        type="button"
        onClick={() => onChange(qty + 1)}
        className="flex h-9 w-9 items-center justify-center text-lg text-neutral-600 hover:text-neutral-900"
        aria-label="수량 증가"
      >
        +
      </button>
    </div>
  );
}
