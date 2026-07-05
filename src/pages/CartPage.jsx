import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import QuantitySelector from "../components/QuantitySelector";

export default function CartPage() {
  const { items, updateQty, removeItem, totalPrice } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-16 text-center">
        <p className="text-neutral-600">장바구니가 비어 있습니다.</p>
        <Link
          to="/"
          className="mt-4 inline-block rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-700"
        >
          쇼핑 계속하기
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-xl font-semibold text-neutral-900">장바구니</h1>

      <ul className="flex flex-col gap-4">
        {items.map((item) => (
          <li
            key={`${item.id}-${item.size}`}
            className="flex gap-4 rounded-xl border border-neutral-200 bg-white p-4"
          >
            <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-neutral-100">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-1 flex-col justify-between">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-medium text-neutral-900">{item.name}</p>
                  <p className="text-xs text-neutral-500">사이즈 {item.size}</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.id, item.size)}
                  className="text-xs text-neutral-400 hover:text-neutral-900"
                >
                  삭제
                </button>
              </div>

              <div className="flex items-center justify-between">
                <QuantitySelector
                  qty={item.qty}
                  onChange={(qty) => updateQty(item.id, item.size, qty)}
                />
                <p className="text-sm font-semibold text-neutral-900">
                  {(item.price * item.qty).toLocaleString()}원
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex items-center justify-between border-t border-neutral-200 pt-6">
        <span className="text-sm text-neutral-600">총 금액</span>
        <span className="text-lg font-semibold text-neutral-900">
          {totalPrice.toLocaleString()}원
        </span>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link
          to="/"
          className="flex-1 rounded-full border border-neutral-300 py-3 text-center text-sm font-medium text-neutral-700 hover:border-neutral-900 hover:text-neutral-900"
        >
          쇼핑 계속하기
        </Link>
        <button
          type="button"
          onClick={() => navigate("/checkout")}
          className="flex-1 rounded-full bg-neutral-900 py-3 text-sm font-medium text-white hover:bg-neutral-700"
        >
          주문하기
        </button>
      </div>
    </div>
  );
}
