import { Link, Navigate, useLocation } from "react-router-dom";

export default function OrderCompletePage() {
  const location = useLocation();
  const order = location.state;

  if (!order) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-600">
        ✓
      </div>
      <h1 className="text-xl font-semibold text-neutral-900">주문이 완료되었습니다</h1>
      <p className="mt-2 text-sm text-neutral-500">주문번호 {order.orderId}</p>

      <div className="mt-8 rounded-xl border border-neutral-200 bg-white p-6 text-left">
        <p className="mb-3 text-sm font-medium text-neutral-900">배송 정보</p>
        <dl className="flex flex-col gap-1 text-sm text-neutral-600">
          <div className="flex justify-between">
            <dt>받는 분</dt>
            <dd>{order.customer.name}</dd>
          </div>
          <div className="flex justify-between">
            <dt>연락처</dt>
            <dd>{order.customer.phone}</dd>
          </div>
          <div className="flex justify-between">
            <dt>배송지</dt>
            <dd className="text-right">{order.customer.address}</dd>
          </div>
        </dl>

        <p className="mb-3 mt-6 text-sm font-medium text-neutral-900">주문 상품</p>
        <ul className="flex flex-col gap-2 text-sm text-neutral-600">
          {order.items.map((item) => (
            <li key={`${item.id}-${item.size}`} className="flex justify-between">
              <span>
                {item.name} ({item.size}) × {item.qty}
              </span>
              <span>{(item.price * item.qty).toLocaleString()}원</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex justify-between border-t border-neutral-200 pt-3 text-sm font-semibold text-neutral-900">
          <span>총 결제 금액</span>
          <span>{order.totalPrice.toLocaleString()}원</span>
        </div>
      </div>

      <Link
        to="/"
        className="mt-8 inline-block rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-700"
      >
        쇼핑 계속하기
      </Link>
    </div>
  );
}
