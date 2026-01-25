import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-24">
      {/* ÜST ALAN */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

        {/* MARKA */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">
            KlimaMarket
          </h3>
          <p className="text-sm leading-relaxed">
            KlimaMarket; Ankara klima, Sincan klima bayi, split klima,
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
            <li><Link to="/about" className="hover:text-white">Hakkımızda</Link></li>
            <li><Link to="/contact" className="hover:text-white">İletişim</Link></li>
            <li><Link to="/bayilik" className="hover:text-white">Bayilik Başvurusu</Link></li>
          </ul>
        </div>

        {/* MÜŞTERİ HİZMETLERİ */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Müşteri Hizmetleri
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/siparis-takibi" className="hover:text-white">Sipariş Takibi</Link></li>
            <li><Link to="/iade-ve-degisim" className="hover:text-white">İade & Değişim</Link></li>
            <li><Link to="/garanti" className="hover:text-white">Garanti Koşulları</Link></li>
            <li><Link to="/sss" className="hover:text-white">Sıkça Sorulan Sorular</Link></li>
          </ul>
        </div>

        {/* YASAL */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Yasal Bilgiler
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/mesafeli-satis-sozlesmesi" className="hover:text-white">
                Mesafeli Satış Sözleşmesi
              </Link>
            </li>
            <li>
              <Link to="/on-bilgilendirme-formu" className="hover:text-white">
                Ön Bilgilendirme Formu
              </Link>
            </li>
            <li>
              <Link to="/gizlilik-ve-kvkk" className="hover:text-white">
                Gizlilik & KVKK
              </Link>
            </li>
            <li>
              <Link to="/iade-cayma" className="hover:text-white">
                İade & Cayma Koşulları
              </Link>
            </li>
          </ul>
        </div>

        {/* İLETİŞİM */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            İletişim
          </h4>

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <Phone size={16} /> 0850 000 00 00
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} /> info@klimamarket.com
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} /> İstanbul, Türkiye
            </div>
          </div>

          <div className="flex gap-4 mt-5">
            <a href="#" aria-label="Facebook" className="hover:text-white">
              <Facebook />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-white">
              <Instagram />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-white">
              <Linkedin />
            </a>
          </div>
        </div>

      </div>

      {/* ALT BAR */}
      <div className="border-t border-gray-800 py-6 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} KlimaMarket • Tüm Hakları Saklıdır
      </div>
    </footer>
  );
};

export default Footer;
