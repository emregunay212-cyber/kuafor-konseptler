/**
 * AURA BEAUTY — TEK KAYNAK İÇERİK (single source of truth)
 * ----------------------------------------------------------
 * 10 tasarım konseptinin TAMAMI bu dosyadan okur. Gerçek işletme
 * bilgileri geldiğinde SADECE bu dosyayı değiştir; tüm temalar güncellenir.
 *
 * Not: Buradaki tüm bilgiler PLACEHOLDER (temsili) — gerçek veri değildir.
 *
 * Kullanım (her tema, kök-mutlak import):
 *   import { SITE, img, waUrl, telUrl, mapEmbedUrl } from '/src/data/content.js'
 */

export const SITE = {
  // — Marka —
  brand: 'Aura Beauty',
  brandShort: 'Aura',
  brandTagline: 'Kuaför & Güzellik Merkezi',
  slogan: 'Zarafetin yeni adresi',
  intro:
    'Saç, cilt, makyaj ve bakımda uzman ekibimizle; sıcak ve özenli bir ortamda kendinizi en iyi hissetmeniz için buradayız.',
  about:
    'Aura Beauty, güzelliğin kişiye özel bir deneyim olduğuna inanır. Uzman ekibimiz saç tasarımından cilt bakımına, makyajdan tırnak sanatına kadar en güncel teknikleri samimi bir atmosferle buluşturur. Amacımız; salonumuzdan ayrılırken kendinizi yenilenmiş, özel ve güçlü hissetmeniz.',

  // — İletişim (PLACEHOLDER) —
  city: 'İstanbul',
  district: 'Merkez',
  address: 'Örnek Mah. Güzellik Cad. No: 12/A, Merkez',
  phoneDisplay: '+90 (532) 123 45 67',
  whatsapp: '905321234567', // wa.me formatı (başında 90, + ve boşluk yok)
  email: 'info@aurabeauty.com',
  instagram: 'aurabeauty',
  instagramUrl: 'https://instagram.com/aurabeauty',
  mapQuery: 'Güzellik Merkezi İstanbul',

  // — Çalışma saatleri —
  hours: [
    { day: 'Pazartesi', open: '09:00', close: '19:00', closed: false },
    { day: 'Salı', open: '09:00', close: '19:00', closed: false },
    { day: 'Çarşamba', open: '09:00', close: '19:00', closed: false },
    { day: 'Perşembe', open: '09:00', close: '19:00', closed: false },
    { day: 'Cuma', open: '09:00', close: '19:00', closed: false },
    { day: 'Cumartesi', open: '09:00', close: '18:00', closed: false },
    { day: 'Pazar', open: '', close: '', closed: true },
  ],
  hoursSummary: 'Pzt–Cum 09:00–19:00 · Cmt 09:00–18:00 · Paz Kapalı',

  // — İstatistik şeridi —
  stats: [
    { value: '500+', label: 'Mutlu Müşteri' },
    { value: '12+', label: 'Yıl Deneyim' },
    { value: '25+', label: 'Hizmet Çeşidi' },
  ],

  // — Öne çıkan değerler —
  values: [
    { icon: '✨', title: 'Uzman Ekip', text: 'Alanında deneyimli, sürekli kendini geliştiren kadro.' },
    { icon: '🧼', title: 'Hijyen Önceliği', text: 'Steril ekipman ve titiz temizlik standartları.' },
    { icon: '🌿', title: 'Kaliteli Ürünler', text: 'Cildinize ve saçınıza değer veren seçkin markalar.' },
    { icon: '💬', title: 'Kişiye Özel Danışmanlık', text: 'Size en çok yakışanı birlikte belirliyoruz.' },
  ],

  // — Hizmet menüsü (kategorize) —
  serviceCategories: [
    {
      key: 'sac',
      name: 'Saç',
      icon: '✂️',
      blurb: 'Kesim, renk ve bakımda imza dokunuşlar.',
      services: [
        { name: 'Saç Kesimi', desc: 'Yüz hatlarınıza özel modern kesim.', price: "₺250'den", duration: '30 dk' },
        { name: 'Fön & Şekillendirme', desc: 'Güne hazır, kalıcı fön.', price: "₺200'den", duration: '30 dk' },
        { name: 'Komple Saç Boyası', desc: 'Renk danışmanlığıyla istediğiniz ton.', price: "₺900'den", duration: '120 dk' },
        { name: 'Ombre & Balyaj', desc: 'Doğal geçişli, ışıltılı renk teknikleri.', price: "₺1.500'den", duration: '180 dk' },
        { name: 'Keratin Bakımı', desc: 'Yıpranmış saça pürüzsüzlük ve parlaklık.', price: "₺1.200'den", duration: '90 dk' },
        { name: 'Gelin Saçı', desc: 'Özel güne zarif, dayanıklı tasarım.', price: "₺2.500'den", duration: '120 dk' },
      ],
    },
    {
      key: 'cilt',
      name: 'Cilt Bakımı',
      icon: '🌸',
      blurb: 'Cildinize nefes aldıran profesyonel bakımlar.',
      services: [
        { name: 'Klasik Cilt Bakımı', desc: 'Derin temizlik ve nem dengesi.', price: "₺600'den", duration: '60 dk' },
        { name: 'Leke & Aydınlatma', desc: 'Ton eşitleyici, ışıltı veren bakım.', price: "₺800'den", duration: '60 dk' },
        { name: 'Hydrafacial', desc: 'Anında tazelik veren cilt bakımı.', price: "₺1.200'den", duration: '45 dk' },
      ],
    },
    {
      key: 'makyaj',
      name: 'Makyaj',
      icon: '💄',
      blurb: 'Her ana yakışan profesyonel makyaj.',
      services: [
        { name: 'Günlük Makyaj', desc: 'Doğal ve taze bir görünüm.', price: "₺500'den", duration: '45 dk' },
        { name: 'Gelin Makyajı', desc: 'Gününüze özel, uzun süre kalıcı makyaj.', price: "₺2.000'den", duration: '90 dk' },
        { name: 'Türban & Makyaj', desc: 'Uyumlu türban tasarımı ve makyaj.', price: "₺1.500'den", duration: '90 dk' },
      ],
    },
    {
      key: 'tirnak',
      name: 'Tırnak',
      icon: '💅',
      blurb: 'Bakımlı eller ve ayaklar için tırnak sanatı.',
      services: [
        { name: 'Manikür', desc: 'Bakımlı eller için klasik manikür.', price: "₺300'den", duration: '40 dk' },
        { name: 'Pedikür', desc: 'Yumuşak ve bakımlı ayaklar.', price: "₺400'den", duration: '50 dk' },
        { name: 'Protez Tırnak', desc: 'Dayanıklı, doğal görünümlü uygulama.', price: "₺700'den", duration: '90 dk' },
      ],
    },
    {
      key: 'kas-kirpik',
      name: 'Kaş & Kirpik',
      icon: '👁️',
      blurb: 'Bakışlarınızı tamamlayan ince dokunuşlar.',
      services: [
        { name: 'Kaş Tasarımı', desc: 'Yüzünüze uygun simetrik kaş formu.', price: "₺150'den", duration: '20 dk' },
        { name: 'İpek Kirpik', desc: 'Hacimli, doğal duruşlu kirpikler.', price: "₺600'den", duration: '90 dk' },
        { name: 'Kaş Laminasyon', desc: 'Dolgun ve düzgün kaş görünümü.', price: "₺500'den", duration: '45 dk' },
      ],
    },
    {
      key: 'epilasyon',
      name: 'Epilasyon',
      icon: '🌷',
      blurb: 'Hızlı, hijyenik ve konforlu uygulama.',
      services: [
        { name: 'Bölgesel Ağda', desc: 'Hızlı ve hijyenik bölgesel uygulama.', price: "₺200'den", duration: '20 dk' },
        { name: 'Komple Ağda', desc: 'Tüm vücut için pürüzsüzlük.', price: "₺900'den", duration: '60 dk' },
      ],
    },
  ],

  // — Müşteri yorumları (PLACEHOLDER) —
  testimonials: [
    { name: 'Ayşe K.', stars: 5, text: 'Saç boyam tam hayal ettiğim renkte oldu, ekip çok ilgili. Artık düzenli müşteriyim.', meta: 'Saç Boyama' },
    { name: 'Elif T.', stars: 5, text: 'Gelin makyajım gün boyu hiç bozulmadı, herkes nereden yaptırdığımı sordu. Teşekkürler!', meta: 'Gelin Makyajı' },
    { name: 'Merve S.', stars: 5, text: 'Salon tertemiz, randevuya saygılılar. Cilt bakımı sonrası cildim ışıl ışıl oldu.', meta: 'Cilt Bakımı' },
    { name: 'Selin A.', stars: 5, text: 'İpek kirpik uygulaması çok doğal durdu. Kesinlikle tavsiye ederim.', meta: 'İpek Kirpik' },
  ],

  // — Navigasyon —
  nav: [
    { label: 'Anasayfa', href: '#top' },
    { label: 'Hizmetler', href: '#hizmetler' },
    { label: 'Galeri', href: '#galeri' },
    { label: 'Hakkımızda', href: '#hakkimizda' },
    { label: 'Yorumlar', href: '#yorumlar' },
    { label: 'İletişim', href: '#iletisim' },
  ],

  ctaPrimary: { label: 'Randevu Al', kind: 'whatsapp' },
  ctaSecondary: { label: 'WhatsApp', kind: 'whatsapp' },

  /**
   * GÖRSELLER — doğrulanmış Unsplash foto ID'leri (hepsi 200 döner).
   * Kategoriler yaklaşıktır; tema agent'ı bölümüne en uygun olanı seçebilir.
   * URL üretmek için img() yardımcısını kullan.
   */
  images: {
    // Güçlü hero/portre adayları (model, güzellik portresi)
    hero: [
      'photo-1487412947147-5cebf100ffc2',
      'photo-1492106087820-71f1a00d2b11',
      'photo-1522338242992-e1a54906a8da',
      'photo-1554519515-242161756769',
      'photo-1535930749574-1399327ce78f',
      'photo-1503454537195-1dcabb73ffb9',
    ],
    sac: [
      'photo-1560066984-138dadb4c035',
      'photo-1516975080664-ed2fc6a32937',
      'photo-1519014816548-bf5fe059798b',
      'photo-1457972729786-0411a3b2b626',
      'photo-1633681926022-84c23e8cb2d6',
      'photo-1633681926035-ec1ac984418a',
      'photo-1522337660859-02fbefca4702',
    ],
    salon: [
      'photo-1559599101-f09722fb4948',
      'photo-1487070183336-b863922373d4',
      'photo-1457972851104-4fd469440bf9',
    ],
    makyaj: [
      'photo-1562322140-8baeececf3df',
      'photo-1521590832167-7bcbfaa6381f',
      'photo-1487412912498-0447578fcca8',
      'photo-1596462502278-27bfdc403348',
      'photo-1583001931096-959e9a1a6223',
    ],
    tirnak: [
      'photo-1605497788044-5a32c7078486',
      'photo-1604654894610-df63bc536371',
      'photo-1600948836101-f9ffda59d250',
    ],
    cilt: [
      'photo-1571875257727-256c39da42af',
      'photo-1540555700478-4be289fbecef',
      'photo-1521146764736-56c929d59c83',
      'photo-1556228578-8c89e6adf883',
      'photo-1512496015851-a90fb38ba796',
      'photo-1595476108010-b4d1f102b1b1',
      'photo-1588776814546-1ffcf47267a5',
      'photo-1526045478516-99145907023c',
      'photo-1503236823255-94609f598e71',
      'photo-1522383225653-ed111181a951',
    ],
  },
}

/**
 * Tüm doğrulanmış görsellerin düz havuzu (galeri ızgaraları için pratik).
 */
export const IMAGE_POOL = [
  ...SITE.images.hero,
  ...SITE.images.sac,
  ...SITE.images.salon,
  ...SITE.images.makyaj,
  ...SITE.images.tirnak,
  ...SITE.images.cilt,
]

/** Unsplash görsel URL üretici. */
export function img(id, { w = 1200, h = null, q = 75 } = {}) {
  const crop = h ? `&h=${h}&fit=crop` : ''
  return `https://images.unsplash.com/${id}?w=${w}${crop}&q=${q}&auto=format`
}

/** WhatsApp sohbet linki. */
export function waUrl(message = `Merhaba! ${SITE.brand} hakkında bilgi almak istiyorum.`) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`
}

/** tel: linki. */
export function telUrl() {
  return `tel:+${SITE.whatsapp}`
}

/** Google Maps embed URL'i (iframe için). */
export function mapEmbedUrl() {
  return `https://maps.google.com/maps?q=${encodeURIComponent(SITE.mapQuery)}&output=embed&hl=tr`
}
