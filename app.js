/* =============================================
   SAFF TƏHARƏT — APP.JS
   ============================================= */

'use strict';

const WA_NUMBER = '994555056722';
const PAGE_SCROLL_MAP = {};
let currentPage = 'home';
let currentModalProduct = null;
let currentVacancy = null;
let activeFilter = 'all';

// ─── CART STATE ────────────────────────────────
let cart = []; // [{id, name, categoryLabel, img, qty, price}]

// ─── PRODUCTS DATA ─────────────────────────────
// GitHub raw image base URL
const RAW = 'https://raw.githubusercontent.com/rclub9321-cpu/saff/main/images/';

const productsData = [

  // ════════════════════════════════
  // KİMYƏVİ MƏHSULLAR
  // ════════════════════════════════
  {
    id: 'p_xlor',
    name: 'Xlor — Güclü Dezinfeksiya (5L)',
    desc: 'Saff Təharət Xlor 5L. Bakteriya və mikrobları məhv edir, dərin təmizlik, ağardıcı təsir, universal istifadə. Güclü dezinfeksiya effekti.',
    category: 'kimyevi',
    categoryLabel: 'Kimyəvi Məhsullar',
    img: RAW + 'product-xlor-5l.jpg',
    badge: '5L',
    price: null
  },
  {
    id: 'p_agardici',
    name: 'Ağardıcı Gel — Tualet/Kanalizasiya (5L)',
    desc: 'Saff Təharət Ağardıcı Gel 5L. Güclü təmizlik və ağardıcı təsir. Tualet, kanalizasiya, plitkə, santexnika üçün. Mikrobları məhv edir, təzə qoxu.',
    category: 'kimyevi',
    categoryLabel: 'Kimyəvi Məhsullar',
    img: RAW + 'product-agardici-gel-5l.jpg',
    badge: '5L',
    price: null
  },
  {
    id: 'p_yer_silen',
    name: 'Yer Silən Maye (5L)',
    desc: 'Saff Təharət Yer Silən Maye 5L. Dərin təmizlik, parlaq görünüş, iz buraxmır, təravətli qoxu. Bütün döşəmə növləri üçün uyğun.',
    category: 'kimyevi',
    categoryLabel: 'Kimyəvi Məhsullar',
    img: RAW + 'product-yer-silen-maye-5l.jpg',
    badge: '5L',
    price: null
  },
  {
    id: 'p_teravetlendirici',
    name: 'Təravətləndirici (5L)',
    desc: 'Saff Təharət Təravətləndirici 5L. Güclü təmizlik, xoş və qalıcı qoxu, təmiz və təravətli mühit. Hər növ səthi üçün uyğundur.',
    category: 'kimyevi',
    categoryLabel: 'Kimyəvi Məhsullar',
    img: RAW + 'product-teravetlendirici-5l.jpg',
    badge: '5L',
    price: null
  },
  {
    id: 'p22',
    name: 'Qab Şampunu — 5L',
    desc: 'Saff Təharət Qab Şampunu 5 litr. Yağı effektiv təmizləyir, əllərə zərər vermir, bioloji parçalana bilən formula. Restoranlar, iaşə müəssisələri üçün ideal.',
    category: 'kimyevi',
    categoryLabel: 'Kimyəvi Məhsullar',
    img: RAW + 'product-qab-sampunu-5l.jpg',
    badge: '5L',
    price: null
  },
  {
    id: 'p32',
    name: 'Cit Tozu — Limon (Ovalama Tozu)',
    desc: 'Saff Təharət Cit Tozu limon ətirli. Güclü təmizlik, təbii təravət. Vanna, mətbəx, tualet üçün ideal. Limon ekstraktlı formula.',
    category: 'kimyevi',
    categoryLabel: 'Kimyəvi Məhsullar',
    img: RAW + 'product-cit-tozu.jpg',
    badge: 'Limon',
    price: null
  },
  {
    id: 'p33',
    name: 'Tuz Ruhu — Tualet Təmizləyici',
    desc: 'Saff Təharət Tuz Ruhu güclü tualet təmizləyici. Kireç, pas və ləkələrə qarşı effektiv. Mikrobları məhv edir, dərin təsir.',
    category: 'kimyevi',
    categoryLabel: 'Kimyəvi Məhsullar',
    img: RAW + 'product-tuz-ruhu.jpg',
    badge: 'Güclü',
    price: null
  },

  // ════════════════════════════════
  // ƏL GİGİYENASI
  // ════════════════════════════════
  {
    id: 'p_maye_sabun',
    name: 'Maye Sabun — Limon Qoxulu (5L)',
    desc: 'Saff Təharət Maye Sabun 5L, limon qoxulu. Dərin təmizlik, dərini qoruyur, yumşaq və zərif qulluq, təravətli qoxu.',
    category: 'gigiyena',
    categoryLabel: 'Əl Gigiyenası',
    img: RAW + 'product-maye-sabun-5l.jpg',
    badge: '5L',
    price: null
  },
  {
    id: 'p_kopuk_sabun',
    name: 'Köpük Sabun (5L)',
    desc: 'Saff Təharət Köpük Sabun 5L. Dəriyə zərərsiz, təbii tərkib, güclü təmizlik, təzə qoxu. Təravətli təmizlik.',
    category: 'gigiyena',
    categoryLabel: 'Əl Gigiyenası',
    img: RAW + 'product-kopuk-sabun-5l.jpg',
    badge: '5L',
    price: null
  },
  {
    id: 'p_sac_sampunu',
    name: 'Saç Şampunu (20L)',
    desc: 'Saff Təharət Saç Şampunu 20L. Saç və dəri üçün yumşaq təmizlik, parlaq və canlı görünüş, gündəlik istifadə üçün, təravətli qoxu.',
    category: 'gigiyena',
    categoryLabel: 'Əl Gigiyenası',
    img: RAW + 'product-sac-sampunu-20l.jpg',
    badge: '20L',
    price: null
  },
  {
    id: 'p34',
    name: 'İş Əlcəyi (Narıncı, Lateks Örtüklü)',
    desc: 'Saff Təharət İş Əlcəyi — narıncı rəng, lateks örtüklü. Keyfiyyətli material, rahat istifadə, güclü qorunma. Tikinti, bağçılıq, ağır iş üçün ideal.',
    category: 'gigiyena',
    categoryLabel: 'Əl Gigiyenası',
    img: RAW + 'product-is-elcekler.jpg',
    badge: 'İş',
    price: null
  },
  {
    id: 'p35',
    name: 'Lateks Əlcək (Qırmızı, Uzun)',
    desc: 'Saff Təharət Lateks Əlcək qırmızı, uzun biləkli. Güclü təmizlik, davamlı material, rahat istifadə. Ev, mətbəx, həyətyani işlər üçün.',
    category: 'gigiyena',
    categoryLabel: 'Əl Gigiyenası',
    img: RAW + 'product-lateks-elcek.jpg',
    badge: 'Uzun',
    price: null
  },
  {
    id: 'p36',
    name: 'Pambıq Qulaq Çöpü — 200 ədəd',
    desc: 'Saff Təharət Gigiyenik Qulaq Çöpü 200 ədəd. Təbii pambıq, dəri üçün təhlükəsiz, yumşaq və rahat. Uşaqlar və böyüklər üçün uyğun.',
    category: 'gigiyena',
    categoryLabel: 'Əl Gigiyenası',
    img: RAW + 'product-qulaq-copu.jpg',
    badge: '200 əd.',
    price: null
  },

  // ════════════════════════════════
  // SALFETKA
  // ════════════════════════════════
  {
    id: 'p17',
    name: 'Jumbo Dispenser Rulo',
    desc: 'Peşəkar istifadə üçün Jumbo Dispenser Rulo. Yüksək uduculuq, təmiz və gigiyenik, davamlı və sərfəli. Restoran, otel, ictimai tualet üçün ideal.',
    category: 'salfetka',
    categoryLabel: 'Salfetka',
    img: RAW + 'product-jumbo-dispenser-rulo.jpg',
    badge: 'Jumbo',
    price: null
  },
  {
    id: 'p18',
    name: 'Kağız Salfet — Ekonom Paket',
    desc: 'Gündəlik istifadə üçün kağız salfet ekonom paketi. Yumşaq və rahat, təmiz və gigiyenik. Ev, ofis, restoran üçün uyğun.',
    category: 'salfetka',
    categoryLabel: 'Salfetka',
    img: RAW + 'product-kagiz-salfet-ekonom.jpg',
    badge: 'Ekonom',
    price: null
  },
  {
    id: 'p19',
    name: 'Tualet Kağızı — 48 Rulon (3 qatlı)',
    desc: '%100 Təbii Tualet Kağızı. 3 qatlı, yumşaq və rahat, təmiz və gigiyenik, təbii və ekoloji təmiz. 48 rulon paket.',
    category: 'salfetka',
    categoryLabel: 'Salfetka',
    img: RAW + 'product-tualet-kagizi-48-rulon.jpg',
    badge: '48 rulon',
    price: null
  },
  {
    id: 'p20',
    name: 'Maxi Salfet',
    desc: 'Yüksək uduculuq, təmiz və gigiyenik, davamlı və keyfiyyətli Maxi Salfet. Profesional istifadə üçün nəzərdə tutulub.',
    category: 'salfetka',
    categoryLabel: 'Salfetka',
    img: RAW + 'product-maxi-salfet.jpg',
    badge: 'Maxi',
    price: null
  },
  {
    id: 'p21',
    name: 'Dispenser Salfet — Ekonom Paket',
    desc: 'Dispenser üçün salfet ekonom paketi. Yumşaq və rahat, təmiz və gigiyenik, hər gün istifadə üçün. Dispenser ilə birlikdə.',
    category: 'salfetka',
    categoryLabel: 'Salfetka',
    img: RAW + 'product-dispenser-salfet-ekonom.jpg',
    badge: 'Ekonom',
    price: null
  },
  {
    id: 'p1',
    name: 'Kağız Dəsmal + Dispenser',
    desc: 'Avtomatik Blue kağız dəsmal dispenseri + kağız dəsmal rulosu. Ofis, restoran, ictimai binalar üçün ideal.',
    category: 'salfetka',
    categoryLabel: 'Salfetka',
    img: RAW + 'product-paper-towel-dispenser.jpg',
    badge: 'Dəst',
    price: null
  },
  {
    id: 'p3',
    name: 'Sarı Nonwoven Rulosu',
    desc: 'Sarı rəngli nonwoven (qeyri-toxunma) rulosu. Tullantı kisəsi, müvəqqəti örtük kimi istifadə olunur. Yüngül, davamlı material.',
    category: 'salfetka',
    categoryLabel: 'Salfetka',
    img: RAW + 'product-nonwoven-roll.jpg',
    badge: 'Sarı',
    price: null
  },

  // ════════════════════════════════
  // TƏMİZLİK LƏVAZİMATLARI
  // ════════════════════════════════
  {
    id: 'p8',
    name: 'Mikrofibra Parça Dəsti',
    desc: '4 rəngli mikrofibra parça dəsti (yaşıl, sarı, qırmızı, göy). Yüksək emilim, uzun ömürlü, maşında yuyula bilər.',
    category: 'levazimati',
    categoryLabel: 'Təmizlik Ləvazimatları',
    img: RAW + 'product-microfiber-cloth.jpg',
    badge: '4 Rəng',
    price: null
  },
  {
    id: 'p9',
    name: 'Flat Mop Başlığı',
    desc: 'Düz mop başlığı. Döşəmə yuma üçün ağ-qırmızı dönən mop başlığı. Bütün döşəmə növləri üçün uyğun.',
    category: 'levazimati',
    categoryLabel: 'Təmizlik Ləvazimatları',
    img: RAW + 'product-flat-mop.jpg',
    badge: 'Professional',
    price: null
  },
  {
    id: 'p10',
    name: 'Chenille Mop Başlığı',
    desc: 'Rəngli chenille mop başlıqları (mavi, çəhrayı, yaşıl, narıncı). Geniş sahəli, yüksək effektiv.',
    category: 'levazimati',
    categoryLabel: 'Təmizlik Ləvazimatları',
    img: RAW + 'product-chenille-mop.jpg',
    badge: 'Rəngli',
    price: null
  },
  {
    id: 'p11',
    name: 'Stretch Film (Şəffaf)',
    desc: 'Qablaşdırma üçün şəffaf stretch film rulosu. Möhkəm, uzanan, qoruyucu film. Sənaye və ev istifadəsi üçün.',
    category: 'levazimati',
    categoryLabel: 'Təmizlik Ləvazimatları',
    img: RAW + 'product-stretch-film.jpg',
    badge: 'Şəffaf',
    price: null
  },
  {
    id: 'p12',
    name: 'Süpürgə + Rezin Qaşov Dəsti',
    desc: 'Qırmızı saplı süpürgə və rezin qaşov dəsti. Döşəmə süpürmə və su çəkmə üçün ideal. Davamlı, keyfiyyətli material.',
    category: 'levazimati',
    categoryLabel: 'Təmizlik Ləvazimatları',
    img: RAW + 'product-broom-scraper.jpg',
    badge: 'Dəst',
    price: null
  },
  {
    id: 'p23',
    name: 'Alüminium Folqa — 45sm x 100sm',
    desc: 'Saff Təharət Alüminium Folqa 45sm × 100sm. Ərzaq qablaşdırması, pişirmə, dondurucu üçün ideal. Yüksək keyfiyyətli, davamlı material.',
    category: 'levazimati',
    categoryLabel: 'Təmizlik Ləvazimatları',
    img: RAW + 'product-alyuminium-folqa.jpg',
    badge: '100 sm',
    price: null
  },
  {
    id: 'p24',
    name: 'Zibil Torbası — 50 ədəd (Güclü)',
    desc: 'Güclü və dayanıqlı zibil torbası, 50 ədəd. Güclü material, sızdırmaz, məişət və ofis üçün.',
    category: 'levazimati',
    categoryLabel: 'Təmizlik Ləvazimatları',
    img: RAW + 'product-zibil-torbasi-50-eded.jpg',
    badge: '50 əd.',
    price: null
  },
  {
    id: 'p25',
    name: 'Zibil Torbası — 60L Rulo (10 ədəd)',
    desc: 'Saff Təharət Zibil Torbası 60L rulon, 10 ədəd. Davamlı və möhkəm, ekoloji təmiz, praktik istifadə.',
    category: 'levazimati',
    categoryLabel: 'Təmizlik Ləvazimatları',
    img: RAW + 'product-zibil-torbasi-60l-rulo.jpg',
    badge: '60L',
    price: null
  },
  {
    id: 'p26',
    name: 'Mətbəx Süngəri — 10 ədəd',
    desc: 'Saff Təharət Mətbəx Süngəri 10 ədədlik paket. Güclü təmizlik, davamlı material, rahat istifadə. Rəngli süngərlər. Qab-qacaq yuma üçün ideal.',
    category: 'levazimati',
    categoryLabel: 'Təmizlik Ləvazimatları',
    img: RAW + 'product-metbex-sungeri.jpg',
    badge: '10 əd.',
    price: null
  },
  {
    id: 'p27',
    name: 'Paslanmayan Polad Süngər — 3 ədəd',
    desc: 'Saff Təharət Paslanmayan Polad Süngər 3 ədəd. Güclü təmizlik, davamlı material. Tava, qazanlar üçün ideal. Paslanmaz polad tel.',
    category: 'levazimati',
    categoryLabel: 'Təmizlik Ləvazimatları',
    img: RAW + 'product-polad-sunger.jpg',
    badge: '3 əd.',
    price: null
  },
  {
    id: 'p28',
    name: 'Kağız Stəkan — 50 ədəd',
    desc: 'Saff Təharət Kağız Stəkan 50 ədəd. Keyfiyyətli material, qida üçün təhlükəsiz, rahat istifadə. Restoran, ofis, tədbirlər üçün ideal.',
    category: 'levazimati',
    categoryLabel: 'Təmizlik Ləvazimatları',
    img: RAW + 'product-kagiz-stekan.jpg',
    badge: '50 əd.',
    price: null
  },
  {
    id: 'p29',
    name: 'Birdəfəlik Qab-Qacaq Dəsti — 50 ədəd',
    desc: 'Saff Təharət Birdəfəlik Qab-Qacaq Dəsti 50 ədəd. Bıçaq, çəngəl, qaşıq daxil. Təmiz və gigiyenik, hər məkanda rahat istifadə.',
    category: 'levazimati',
    categoryLabel: 'Təmizlik Ləvazimatları',
    img: RAW + 'product-birdeferlik-qab-qacaq.jpg',
    badge: '50 əd.',
    price: null
  },
  {
    id: 'p30',
    name: 'Birdəfəlik Qab (Lоток) — 50 ədəd',
    desc: 'Saff Təharət Birdəfəlik Plastik Qab (loток) 50 ədəd. Qida üçün təhlükəsiz, rahat istifadə. Çatdırılma, hazır yemək üçün ideal.',
    category: 'levazimati',
    categoryLabel: 'Təmizlik Ləvazimatları',
    img: RAW + 'product-birdeferlik-qab.jpg',
    badge: '50 əd.',
    price: null
  },
  {
    id: 'p31',
    name: 'Spin Mop Dəsti (Fırlanan Mop)',
    desc: 'Saff Təharət Spin Mop Dəsti — fırlanan mop və vedrə. Effektiv təmizlik, davamlı material. Mikrofiber mop başlığı. Bütün döşəmə növləri üçün uyğun.',
    category: 'levazimati',
    categoryLabel: 'Təmizlik Ləvazimatları',
    img: RAW + 'product-spin-mop.jpg',
    badge: 'Dəst',
    price: null
  },

  // ════════════════════════════════
  // DEZİNFEKSİYA
  // ════════════════════════════════
  {
    id: 'p13',
    name: 'Antiseptik Məhlul',
    desc: 'Əl və səthlər üçün güclü antiseptik dezinfeksiya məhlulu. 70% spirt əsaslı, sürətli effekt.',
    category: 'dezinfeksiya',
    categoryLabel: 'Dezinfeksiya',
    img: RAW + 'logo.png',
    badge: 'Antiseptik',
    price: null
  },
  {
    id: 'p14',
    name: 'Dezinfeksiya Sprey',
    desc: 'Səthlər üçün dezinfeksiya spreyi. Bakteriya, virus və göbələklərə qarşı effektiv. Əlverişli sprey qabı.',
    category: 'dezinfeksiya',
    categoryLabel: 'Dezinfeksiya',
    img: RAW + 'logo.png',
    badge: null,
    price: null
  },

  // ════════════════════════════════
  // POS TERMİNAL / DİGƏR
  // ════════════════════════════════
  {
    id: 'p37',
    name: 'POS Terminal Çeki — 10 Rulon',
    desc: 'Saff Təharət POS Terminal Çek Kağızı 10 rulon paket. Yüksək keyfiyyət, hamar çap səthi, uzun ömürlü, termosensitiv kağız. Kassa aparatları, POS terminallar üçün uyğun.',
    category: 'levazimati',
    categoryLabel: 'Təmizlik Ləvazimatları',
    img: RAW + 'product-tualet-kagizi-10-rulon.jpg',
    badge: '10 rulon',
    price: null
  }
];

// ─── VACANCIES DATA ─────────────────────────────

const vacanciesData = [
  {
    id: 'v1',
    icon: '🚚',
    title: 'Kuryer / Çatdırılma Sürücüsü',
    type: 'Tam Ştat',
    salary: '600 – 900 AZN',
    schedule: 'Çevik qrafik, həftə içi',
    requirements: 'Sürücülük vəsiqəsi (B kateqoriyası), Bakı ərazisinə bələdlik',
    desc: 'Saff Təharət şirkəti üçün sürətli, etibarlı kuryer işə qəbul edirik. Öz nəqliyyatı olan üçün əlavə bonus.',
    duties: 'Sifarişlərin vaxtında çatdırılması, müştəri ilə ünsiyyət, məhsulların qorunması'
  },
  {
    id: 'v2',
    icon: '📦',
    title: 'Anbar İşçisi',
    type: 'Tam Ştat',
    salary: '500 – 700 AZN',
    schedule: 'Həftə içi, 09:00–18:00',
    requirements: 'Fiziki hazırlıq, sürücülük vəsiqəsi (üstünlük)',
    desc: 'Anbar sahəsinin idarə edilməsi, mal qəbulu və yerləşdirilməsi üçün işçi axtarırıq.',
    duties: 'Malların qəbulu, sayılması, etiketlənməsi, anbar sənədlərinin tutulması'
  },
  {
    id: 'v3',
    icon: '💼',
    title: 'Satış Meneceri',
    type: 'Tam Ştat',
    salary: '700 – 1200 AZN + bonus',
    schedule: 'Həftə içi, 09:00–18:00',
    requirements: 'Satış təcrübəsi (üstünlük), ünsiyyət bacarığı, kompüter savadlılığı',
    desc: 'Saff Təharət brendi üçün B2B satışlar aparacaq aktiv satış meneceri axtarırıq.',
    duties: 'Müştəri bazasının genişləndirilməsi, görüşlər, müqavilələr, hesabat'
  },
  {
    id: 'v4',
    icon: '🧹',
    title: 'Sahə Satış Nümayəndəsi',
    type: 'Yarım / Tam Ştat',
    salary: '500 – 800 AZN + faiz',
    schedule: 'Çevik qrafik',
    requirements: 'İraadəli, ünsiyyətsevər, yeni müştəri cəlb etmə bacarığı',
    desc: 'Müştərilərə sahədə məhsulları tanıtmaq və sifariş almaq üçün nümayəndə axtarırıq.',
    duties: 'Sahədə müştərilərlə görüş, kataloqla məhsul tanıtımı, sifariş qəbulu'
  }
];

// ─── PAGE NAVIGATION ───────────────────────────

function showPage(pageId) {
  const oldPage = document.getElementById('page-' + currentPage);
  if (oldPage) {
    PAGE_SCROLL_MAP[currentPage] = window.scrollY;
    oldPage.classList.remove('active');
  }

  currentPage = pageId;

  const newPage = document.getElementById('page-' + pageId);
  if (!newPage) return;
  newPage.classList.add('active');

  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.page === pageId);
  });

  const savedScroll = PAGE_SCROLL_MAP[pageId] || 0;
  window.scrollTo({ top: savedScroll, behavior: 'instant' });
}

function goBack() {
  PAGE_SCROLL_MAP[currentPage] = window.scrollY;
  showPage('home');
}

function goToProductsWithFilter(filter) {
  showPage('products');
  filterProducts(filter);
}

// ─── MOBILE MENU ───────────────────────────────
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('mobileOverlay');
  const isOpen = menu.classList.contains('open');
  menu.classList.toggle('open', !isOpen);
  overlay.classList.toggle('visible', !isOpen);
  document.body.style.overflow = isOpen ? '' : 'hidden';
}

// ─── PRODUCT FILTERING ─────────────────────────

function filterProducts(filter) {
  activeFilter = filter;

  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.filter === filter);
  });

  const activeTab = document.querySelector('.filter-tab.active');
  if (activeTab) {
    const filtersContainer = document.getElementById('productFilters');
    if (filtersContainer) {
      const containerWidth = filtersContainer.offsetWidth;
      const tabLeft = activeTab.offsetLeft;
      const tabWidth = activeTab.offsetWidth;
      const targetScroll = tabLeft - (containerWidth / 2) + (tabWidth / 2);
      filtersContainer.scrollTo({ left: targetScroll, behavior: 'smooth' });
    }
  }

  renderProducts();
}

// ─── PRODUCTS RENDERING ────────────────────────

function renderProducts() {
  const grid = document.getElementById('productGrid');
  if (!grid) return;

  const filtered = activeFilter === 'all'
    ? productsData
    : productsData.filter(p => p.category === activeFilter);

  grid.innerHTML = '';

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:48px 20px;color:#9ca3af;">
      <div style="font-size:48px;margin-bottom:16px;">🔍</div>
      <p style="font-size:16px;font-weight:600;">Bu kateqoriyada məhsul tapılmadı</p>
    </div>`;
    return;
  }

  const fragment = document.createDocumentFragment();

  filtered.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', product.name);

    const badgeHtml = product.badge
      ? `<div class="product-card-badge">${escHtml(product.badge)}</div>`
      : '';

    const cartItem = cart.find(c => c.id === product.id);
    const inCart = !!cartItem;

    card.innerHTML = `
      <div class="product-card-img">
        ${badgeHtml}
        <div class="product-card-cat">${escHtml(product.categoryLabel)}</div>
        <img src="${escHtml(product.img)}" alt="${escHtml(product.name)}" loading="lazy"
          onerror="this.src='images/logo.png';this.style.objectFit='contain';this.style.padding='20px'" />
      </div>
      <div class="product-card-body">
        <div class="product-card-name">${escHtml(product.name)}</div>
        <div class="product-card-desc">${escHtml(product.desc)}</div>
        <div class="product-card-footer">
          <button class="product-detail-btn" onclick="event.stopPropagation();openProductModal(productsData.find(p=>p.id==='${product.id}'))">Ətraflı</button>
          <button class="product-cart-btn ${inCart ? 'in-cart' : ''}" id="cart-btn-${product.id}" onclick="event.stopPropagation();addToCart('${product.id}')" aria-label="Səbətə əlavə et" title="Səbətə əlavə et">
            ${inCart
              ? `<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`
              : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" width="16" height="16"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>`
            }
          </button>
        </div>
      </div>
    `;

    card.addEventListener('click', () => openProductModal(product));
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openProductModal(product); });
    fragment.appendChild(card);
  });

  grid.appendChild(fragment);
}

// ─── CART FUNCTIONS ────────────────────────────

function addToCart(productId) {
  const product = productsData.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(c => c.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      categoryLabel: product.categoryLabel,
      img: product.img,
      qty: 1,
      price: product.price
    });
  }

  updateCartBadge();
  updateCartButtonState(productId);
  showToast(`"${product.name}" səbətə əlavə edildi 🛒`);
}

function updateCartButtonState(productId) {
  const btn = document.getElementById('cart-btn-' + productId);
  if (!btn) return;
  const inCart = cart.some(c => c.id === productId);
  btn.classList.toggle('in-cart', inCart);
  btn.innerHTML = inCart
    ? `<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`
    : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" width="16" height="16"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>`;
}

function addToCartFromModal() {
  if (!currentModalProduct) return;
  addToCart(currentModalProduct.id);
  closeProductModalBtn();
  openCart();
}

function removeFromCart(productId) {
  cart = cart.filter(c => c.id !== productId);
  updateCartBadge();
  renderCartSidebar();
  updateCartButtonState(productId);
}

function changeQty(productId, delta) {
  const item = cart.find(c => c.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
    return;
  }
  updateCartBadge();
  renderCartSidebar();
}

function updateCartBadge() {
  const total = cart.reduce((sum, c) => sum + c.qty, 0);
  const badge = document.getElementById('cartBadge');
  const mobileBadge = document.getElementById('mobileCartCount');
  if (badge) {
    badge.textContent = total;
    badge.classList.toggle('has-items', total > 0);
  }
  if (mobileBadge) mobileBadge.textContent = total;
}

function openCart() {
  renderCartSidebar();
  document.getElementById('cartSidebar').classList.add('open');
  document.getElementById('cartOverlay').classList.add('visible');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cartSidebar').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('visible');
  document.body.style.overflow = '';
}

function renderCartSidebar() {
  const body = document.getElementById('cartBody');
  const footer = document.getElementById('cartFooter');
  const totalEl = document.getElementById('cartTotal');
  if (!body) return;

  if (cart.length === 0) {
    body.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛒</div>
        <p class="cart-empty-text">Səbətiniz boşdur</p>
        <p class="cart-empty-sub">Məhsullar səhifəsinə keçib məhsul əlavə edin</p>
        <button class="cart-go-products-btn" onclick="closeCart();showPage('products')">
          Məhsullara Bax
        </button>
      </div>
    `;
    if (footer) footer.style.display = 'none';
    return;
  }

  if (footer) footer.style.display = 'flex';

  body.innerHTML = cart.map(item => `
    <div class="cart-item" id="cart-item-${item.id}">
      <div class="cart-item-img-wrap">
        <img src="${escHtml(item.img)}" alt="${escHtml(item.name)}" class="cart-item-img"
          onerror="this.src='images/logo.png';this.style.objectFit='contain';this.style.padding='6px'" />
      </div>
      <div class="cart-item-info">
        <div class="cart-item-name">${escHtml(item.name)}</div>
        <div class="cart-item-cat">${escHtml(item.categoryLabel)}</div>
        ${item.price ? `<div class="cart-item-price">${(item.price * item.qty).toFixed(2)} ₼</div>` : '<div class="cart-item-price-inquiry">Qiymət soruşulacaq</div>'}
      </div>
      <div class="cart-item-controls">
        <div class="cart-qty-row">
          <button class="cart-qty-btn" onclick="changeQty('${item.id}', -1)" aria-label="Azalt">−</button>
          <span class="cart-qty-val">${item.qty}</span>
          <button class="cart-qty-btn" onclick="changeQty('${item.id}', 1)" aria-label="Artır">+</button>
        </div>
        <button class="cart-remove-btn" onclick="removeFromCart('${item.id}')" aria-label="Sil">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
        </button>
      </div>
    </div>
  `).join('');

  const totalItems = cart.reduce((sum, c) => sum + c.qty, 0);
  const hasAllPrices = cart.every(c => c.price !== null);

  if (hasAllPrices) {
    const totalPrice = cart.reduce((sum, c) => sum + (c.price || 0) * c.qty, 0);
    if (totalEl) totalEl.textContent = `${totalPrice.toFixed(2)} ₼`;
  } else {
    if (totalEl) totalEl.textContent = `${totalItems} məhsul`;
  }
}

// ─── WHATSAPP ORDER ────────────────────────────

function orderViaWhatsApp() {
  if (cart.length === 0) return;

  const totalItems = cart.reduce((sum, c) => sum + c.qty, 0);
  const hasAllPrices = cart.every(c => c.price !== null);
  const totalPrice = hasAllPrices
    ? cart.reduce((sum, c) => sum + (c.price || 0) * c.qty, 0)
    : null;

  let lines = [];
  lines.push('🛒 *Saff Təharət — Sifariş*');
  lines.push('');
  lines.push('📋 *Sifariş siyahısı:*');
  lines.push('─────────────────────');

  cart.forEach((item, i) => {
    const num = String(i + 1).padStart(2, ' ');
    lines.push(`${num}. *${item.name}*`);
    lines.push(`    Miqdar: ${item.qty} ədəd`);
    if (item.price) {
      lines.push(`    Məbləğ: ${(item.price * item.qty).toFixed(2)} ₼`);
    }
  });

  lines.push('─────────────────────');

  if (totalPrice !== null) {
    lines.push(`💰 *Ümumi: ${totalPrice.toFixed(2)} ₼*`);
  } else {
    lines.push(`📦 *Cəmi: ${totalItems} ədəd məhsul*`);
    lines.push('💬 Qiymət razılaşma ilə');
  }

  lines.push('');
  lines.push('📍 Çatdırılma ünvanını bildirəcəyəm.');

  const msg = lines.join('\n');
  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
}

// ─── PRODUCT MODAL ─────────────────────────────

function openProductModal(product) {
  currentModalProduct = product;
  const imgEl = document.getElementById('modalImg');
  imgEl.src = product.img;
  imgEl.alt = product.name;
  imgEl.onerror = function() {
    this.src = 'images/logo.png';
    this.style.objectFit = 'contain';
    this.style.padding = '30px';
  };
  document.getElementById('modalName').textContent = product.name;
  document.getElementById('modalDesc').textContent = product.desc;
  document.getElementById('modalCategoryTag').textContent = product.categoryLabel;
  document.getElementById('productModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProductModal(e) {
  if (e.target === document.getElementById('productModal')) closeProductModalBtn();
}
function closeProductModalBtn() {
  document.getElementById('productModal').classList.remove('open');
  currentModalProduct = null;
  document.body.style.overflow = '';
}

// ─── VACANCIES RENDERING ───────────────────────

function renderVacancies() {
  const grid = document.getElementById('vacancyGrid');
  if (!grid) return;

  const fragment = document.createDocumentFragment();
  vacanciesData.forEach(v => {
    const card = document.createElement('div');
    card.className = 'vacancy-card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.innerHTML = `
      <div class="vacancy-card-icon">${v.icon}</div>
      <div class="vacancy-card-title">${escHtml(v.title)}</div>
      <div class="vacancy-card-type">${escHtml(v.type)}</div>
      <div class="vacancy-card-desc">${escHtml(v.desc)}</div>
      <div class="vacancy-card-arrow">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </div>
    `;
    card.addEventListener('click', () => openVacancyModal(v));
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openVacancyModal(v); });
    fragment.appendChild(card);
  });
  grid.appendChild(fragment);
}

// ─── VACANCY MODAL ─────────────────────────────

function openVacancyModal(v) {
  currentVacancy = v;
  document.getElementById('vacancyModalIcon').textContent = v.icon;
  document.getElementById('vacancyModalTitle').textContent = v.title;
  document.getElementById('vacancyModalType').textContent = v.type;

  document.getElementById('vacancyModalDetails').innerHTML = `
    <div class="vacancy-detail-row"><span class="vacancy-detail-label">💰 Maaş:</span><span class="vacancy-detail-value">${escHtml(v.salary)}</span></div>
    <div class="vacancy-detail-row"><span class="vacancy-detail-label">⏰ Qrafik:</span><span class="vacancy-detail-value">${escHtml(v.schedule)}</span></div>
    <div class="vacancy-detail-row"><span class="vacancy-detail-label">📋 Tələblər:</span><span class="vacancy-detail-value">${escHtml(v.requirements)}</span></div>
    <div class="vacancy-detail-row"><span class="vacancy-detail-label">📝 Vəzifələr:</span><span class="vacancy-detail-value">${escHtml(v.duties)}</span></div>
  `;

  document.getElementById('vacancyModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeVacancyModal(e) {
  if (e.target === document.getElementById('vacancyModal')) closeVacancyModalBtn();
}
function closeVacancyModalBtn() {
  document.getElementById('vacancyModal').classList.remove('open');
  currentVacancy = null;
  document.body.style.overflow = '';
}

function applyVacancy() {
  if (!currentVacancy) return;
  const msg = `👋 *Vakansiyaya Müraciət — Saff Təharət*\n\n🔹 *Vəzifə:* ${currentVacancy.title}\n🔹 *İş rejimi:* ${currentVacancy.type}\n\nSalam! Bu vakansiya ilə maraqlanıram. Əlaqə saxlamaq istəyirəm.`;
  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
}

// ─── TOAST ─────────────────────────────────────

let _toastTimer = null;
function showToast(msg) {
  let toast = document.getElementById('_appToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = '_appToast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

// ─── UTILS ─────────────────────────────────────

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ─── KEYBOARD ACCESSIBILITY ────────────────────

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    if (document.getElementById('cartSidebar').classList.contains('open')) {
      closeCart();
    } else if (document.getElementById('productModal').classList.contains('open')) {
      closeProductModalBtn();
    } else if (document.getElementById('vacancyModal').classList.contains('open')) {
      closeVacancyModalBtn();
    } else if (document.getElementById('mobileMenu').classList.contains('open')) {
      toggleMenu();
    }
  }
});

// ─── INIT ──────────────────────────────────────

(function init() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _boot);
  } else {
    _boot();
  }
})();

function _boot() {
  renderProducts();
  renderVacancies();
  updateCartBadge();
}
