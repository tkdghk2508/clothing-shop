import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { totalCount } = useCart();

  return (
    <header className="sticky top-0 z-10 border-b border-neutral-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-lg font-semibold tracking-tight text-neutral-900">
          OUR CULTURE
        </Link>
        <Link
          to="/cart"
          className="relative flex items-center gap-1 rounded-full border border-neutral-300 px-4 py-2 text-sm text-neutral-700 hover:border-neutral-900 hover:text-neutral-900"
        >
          장바구니
          {totalCount > 0 && (
            <span className="ml-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-neutral-900 px-1 text-xs font-medium text-white">
              {totalCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
