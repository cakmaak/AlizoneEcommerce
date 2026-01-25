import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import ProductDetail from "../../components/product/ProductDetail";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    api
      .get(`/alizone/product/getproduct/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="text-lg font-semibold text-slate-500">
          Ürün yükleniyor...
        </span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="text-lg font-semibold text-red-500">
          Ürün bulunamadı
        </span>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-gradient-to-br from-slate-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-6">
        <ProductDetail product={product} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
