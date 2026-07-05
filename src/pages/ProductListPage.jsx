import { Navigate } from "react-router-dom";
import { products } from "../data/products";

export default function ProductListPage() {
  return <Navigate to={`/product/${products[0].id}`} replace />;
}
