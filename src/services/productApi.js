import rawProducts from "../components/product/product.json";

const TYPE_TO_CATEGORY = {
  "Split Klima": "SPLIT",
  "Kaset Tipi Klima": "KASET_TIPI",
  "Salon Tipi Klima": "SALON_TIPI",
  "Gizli Tavan Tipi Klima": "TICARI",
  "Mobil Klima": "MOBILKLIMA",
  "Multi Split Klima Sistemi": "MULTISPLIT",
  "Isı Pompası": "ISIPOMPASI",
};

const parsePrice = (value) => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (!value) return 0;

  const normalized = String(value)
    .replace(/[^\d,.-]/g, "")
    .replace(/\./g, "")
    .replace(",", ".");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
};

const resolveBtu = (raw) => {
  if (raw.capacity?.cooling_btu) return Number(raw.capacity.cooling_btu);
  if (raw.btus_cooling) return Number(raw.btus_cooling);
  if (raw.capacity?.outdoor_btu) return Number(raw.capacity.outdoor_btu);
  if (raw.outdoor_unit?.capacity_btu) return Number(raw.outdoor_unit.capacity_btu);
  return null;
};

const isInStock = (status) => {
  if (!status) return true;
  const normalized = String(status).toLowerCase();
  return !(
    normalized.includes("yok") ||
    normalized.includes("tükendi") ||
    normalized.includes("tukendi")
  );
};

const mapProduct = (raw) => {
  const marka = raw.brand ? String(raw.brand).toUpperCase() : "";
  const model = raw.model || "";
  const isim = raw.name || "";
  const montajDahil =
    /montaj dahil/i.test(isim) ||
    /montaj dahil/i.test(raw.system_type || "") ||
    (raw.highlight_features || []).some((feature) =>
      /montaj dahil/i.test(feature)
    );

  const noise = raw.other_features?.noise_levels_db || {};
  const airflow = raw.other_features?.airflow || {};
  const temp = raw.other_features?.operating_temperature || {};
  const design = raw.other_features?.design || {};
  const indoor = raw.dimensions_mm?.indoor_unit || {};
  const outdoor = raw.dimensions_mm?.outdoor_unit || {};
  const btu = resolveBtu(raw);
  const inStock = isInStock(raw.stock_status);
  const stokAdeti = inStock ? 10 : 0;
  const teklifilesatilir = !(
    marka === "SAKURA" || String(model).includes("3000")
  );

  return {
    id: raw.id,
    isim,
    marka,
    model,
    kategori: TYPE_TO_CATEGORY[raw.type] || raw.type,
    fiyat: parsePrice(raw.price) || raw.total_price || 0,
    eskiFiyat: parsePrice(raw.old_price),
    btu,
    montajDahil,
    montage: montajDahil,
    resimler: Array.isArray(raw.images) ? raw.images.filter(Boolean) : [],
    stokadeti: stokAdeti,
    stokAdeti,
    stokDurumu: raw.stock_status || (inStock ? "Stokta var" : "Stokta yok"),
    teklifilesatilir,
    aktif: true,
    inverter: Boolean(raw.inverter),
    renk: raw.color,
    garantiAy: raw.warranty_months,
    onemliOzellikler: raw.highlight_features || [],
    notlar: raw.notes || [],
    kapasite: {
      sogutmaBtu: raw.capacity?.cooling_btu ?? raw.btus_cooling ?? btu,
      isitmaBtu: raw.capacity?.heating_btu,
      sogutmaKw: raw.capacity?.cooling_kw,
      isitmaKw: raw.capacity?.heating_kw,
    },
    enerji: {
      sogutmaSinifi: raw.energy?.cooling_class || raw.energy?.energy_class,
      isitmaSinifi: raw.energy?.heating_class,
      seer: raw.energy?.seer,
      scop: raw.energy?.scop,
    },
    digerOzellikler: {
      havaDebisi: {
        icHavaM3h: airflow.indoor_airflow_m3h,
        disHavaM3h: airflow.outdoor_airflow_m3h,
      },
      sesSeviyesi: {
        icDusukDb: noise.indoor_low ?? noise.indoor_cooling,
        icYuksekDb: noise.indoor_high ?? noise.indoor_heating,
        disDb: noise.outdoor ?? noise.outdoor_cooling,
      },
      calismaSicakligi: {
        sogutmaMin: temp.cooling_min,
        sogutmaMax: temp.cooling_max,
        isitmaMin: temp.heating_min,
        isitmaMax: temp.heating_max,
      },
      tasarim: {
        dortYonluHava: Boolean(design.four_way),
        tazeHavaBaglantisi: Boolean(design.fresh_air),
        kondensPompa: Boolean(design.condensate_pump),
        kabloluKumandaDestegi: Boolean(design.wired_controller),
      },
    },
    sertifikalar: {
      erpEnerjiEtiketi: raw.certifications?.erp_energy_label,
      fgazIceriyor: raw.certifications?.contains_f_gas,
    },
    boyutlar: {
      icGenislik: indoor.width,
      icYukseklik: indoor.height,
      icDerinlik: indoor.depth,
      disGenislik: outdoor.width,
      disYukseklik: outdoor.height,
      disDerinlik: outdoor.depth,
    },
  };
};

const loadMappedProducts = () => {
  if (!Array.isArray(rawProducts)) {
    throw new Error("Ürün verisi okunamadı");
  }
  return rawProducts.map(mapProduct);
};

export const getAllProducts = async () => loadMappedProducts();

export const getProductById = async (id) => {
  const products = loadMappedProducts();
  return products.find((product) => String(product.id) === String(id)) || null;
};
