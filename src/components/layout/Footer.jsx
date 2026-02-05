import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  MessageCircle,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-24">
      {/* ÜST ALAN */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* MARKA & SEO */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">
            Alizone Klima
          </h3>
          <p className="text-sm leading-relaxed text-gray-400">
            Alizone Klima; <strong>Ankara klima satışı</strong>, split klima,
            multi klima, ticari klima ve ısı pompası çözümlerinde
            güvenilir satış ve profesyonel montaj hizmeti sunar.
          </p>
        </div>

        {/* KURUMSAL */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Kurumsal
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/about" className="hover:text-white transition">
                Hakkımızda
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition">
                İletişim
              </Link>
            </li>
          </ul>
        </div>

        {/* YASAL & GÜVEN */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Yasal & Güvenlik
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/mesafeli-satis-sozlesmesi" className="hover:text-white transition">
                Mesafeli Satış Sözleşmesi
              </Link>
            </li>
            <li>
              <Link to="/on-bilgilendirme-formu" className="hover:text-white transition">
                Ön Bilgilendirme Formu
              </Link>
            </li>
            <li>
              <Link to="/gizlilik-ve-kvkk" className="hover:text-white transition">
                Gizlilik & KVKK
              </Link>
            </li>
            <li>
              <Link to="/iade-cayma" className="hover:text-white transition">
                İade & Cayma Koşulları
              </Link>
            </li>
          </ul>
        </div>

        {/* İLETİŞİM & DESTEK */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Müşteri Destek Hattı
          </h4>

          <div className="space-y-3 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Phone size={16} />
              <a href="tel:05542309563" className="hover:text-white">
                0554 230 95 63
              </a>
            </div>

            <div className="flex items-center gap-2">
              <MessageCircle size={16} />
              <a
                href="https://wa.me/905423631210"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
              >
                WhatsApp Destek: 0542 363 12 10
              </a>
            </div>

            <div className="flex items-center gap-2">
              <Mail size={16} />
              info@alizoneklima.com
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={16} />
              Ankara, Türkiye
            </div>
          </div>

          {/* SOSYAL */}
          <div className="flex gap-4 mt-6">
            <a href="#" aria-label="Facebook" className="hover:text-white transition">
              <Facebook />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-white transition">
              <Instagram />
            </a>
          </div>
        </div>

      </div>

      {/* ALT BAR */}
      <div className="border-t border-gray-800 py-6 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Alizone Klima • Ankara Klima Satışı • Tüm Hakları Saklıdır
      </div>
    </footer>
  );
};

export default Footer;