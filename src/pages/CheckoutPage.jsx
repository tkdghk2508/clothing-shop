import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [errors, setErrors] = useState({});

  if (items.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    const next = {};
    if (!form.name.trim()) next.name = "이름을 입력해주세요.";
    if (!form.phone.trim()) next.phone = "연락처를 입력해주세요.";
    if (!form.address.trim()) next.address = "배송지 주소를 입력해주세요.";
    return next;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const orderSummary = {
      customer: form,
      items,
      totalPrice,
      orderId: `ORD-${Date.now().toString().slice(-8)}`,
    };

    clearCart();
    navigate("/order-complete", { state: orderSummary });
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-xl font-semibold text-neutral-900">주문서 작성</h1>

      <div className="mb-6 rounded-xl border border-neutral-200 bg-white p-4">
        <p className="mb-3 text-sm font-medium text-neutral-900">주문 상품</p>
        <ul className="flex flex-col gap-2">
          {items.map((item) => (
            <li
              key={`${item.id}-${item.size}`}
              className="flex justify-between text-sm text-neutral-600"
            >
              <span>
                {item.name} ({item.size}) × {item.qty}
              </span>
              <span>{(item.price * item.qty).toLocaleString()}원</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex justify-between border-t border-neutral-200 pt-3 text-sm font-semibold text-neutral-900">
          <span>총 결제 금액</span>
          <span>{totalPrice.toLocaleString()}원</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-neutral-900">
            이름
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-neutral-900 focus:outline-none"
            placeholder="받는 분 이름"
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-medium text-neutral-900">
            연락처
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-neutral-900 focus:outline-none"
            placeholder="010-0000-0000"
          />
          {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="address" className="mb-1 block text-sm font-medium text-neutral-900">
            배송지 주소
          </label>
          <input
            id="address"
            name="address"
            type="text"
            value={form.address}
            onChange={handleChange}
            className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-neutral-900 focus:outline-none"
            placeholder="도로명 주소, 상세 주소"
          />
          {errors.address && (
            <p className="mt-1 text-xs text-red-500">{errors.address}</p>
          )}
        </div>

        <button
          type="submit"
          className="mt-2 rounded-full bg-neutral-900 py-3 text-sm font-medium text-white hover:bg-neutral-700"
        >
          주문하기
        </button>
      </form>
    </div>
  );
}
