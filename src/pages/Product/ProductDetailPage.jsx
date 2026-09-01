import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../../services/productApi";
import ProductDetail from "../../components/product/ProductDetail";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(false);

    getProductById(id)
      .then((data) => setProduct(data))
      .catch(() => {
        setProduct(null);
        setError(true);
      })
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

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="text-lg font-semibold text-red-500">
          Ürün yüklenirken bir hata oluştu
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
