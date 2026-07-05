import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getProductById } from "../data/products";
import { useCart } from "../context/CartContext";
import QuantitySelector from "../components/QuantitySelector";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const product = getProductById(id);

  const [size, setSize] = useState(product?.sizes[0] ?? null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-16 text-center">
        <p className="text-neutral-600">상품을 찾을 수 없습니다.</p>
        <Link to="/" className="mt-4 inline-block text-sm underline">
          목록으로 돌아가기
        </Link>
      </div>
    );
  }

  function handleAddToCart() {
    addItem(product, size, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-6 text-sm text-neutral-500 hover:text-neutral-900"
      >
        ← 뒤로
      </button>

      <div className="grid gap-8 sm:grid-cols-2">
        <div className="aspect-[4/5] w-full overflow-hidden rounded-xl bg-neutral-100">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col">
          <h1 className="text-xl font-semibold text-neutral-900">{product.name}</h1>
          <p className="mt-2 text-lg font-semibold text-neutral-900">
            {product.price.toLocaleString()}원
          </p>
          <p className="mt-4 text-sm leading-relaxed text-neutral-600">
            {product.description}
          </p>

          <div className="mt-6">
            <p className="mb-2 text-sm font-medium text-neutral-900">사이즈</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`h-10 min-w-10 rounded-lg border px-3 text-sm font-medium transition ${
                    size === s
                      ? "border-neutral-900 bg-neutral-900 text-white"
                      : "border-neutral-300 text-neutral-700 hover:border-neutral-900"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="mb-2 text-sm font-medium text-neutral-900">수량</p>
            <QuantitySelector qty={qty} onChange={setQty} />
          </div>

          <div className="mt-8 flex items-center gap-3">
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 rounded-full bg-neutral-900 py-3 text-sm font-medium text-white hover:bg-neutral-700"
            >
              장바구니 담기
            </button>
            <Link
              to="/cart"
              className="rounded-full border border-neutral-300 px-5 py-3 text-sm font-medium text-neutral-700 hover:border-neutral-900 hover:text-neutral-900"
            >
              장바구니 보기
            </Link>
          </div>

          {added && (
            <p className="mt-3 text-sm text-green-600">
              장바구니에 담았습니다.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
