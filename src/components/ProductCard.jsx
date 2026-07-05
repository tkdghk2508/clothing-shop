import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white transition hover:shadow-md"
    >
      <div className="aspect-[4/5] w-full overflow-hidden bg-neutral-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="text-sm font-medium text-neutral-900">{product.name}</h3>
        <p className="text-sm font-semibold text-neutral-900">
          {product.price.toLocaleString()}원
        </p>
        <p className="mt-1 text-xs text-neutral-500">
          {product.sizes.join(" / ")}
        </p>
      </div>
    </Link>
  );
}
