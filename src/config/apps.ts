import type { Locale } from "@/i18n/routing";

export interface AppLink {
  appStore?: string;
  googlePlay?: string;
}

export interface OsrApp {
  id: string;
  audience: "customer" | "provider" | "representative" | "operations";
  name: Record<Locale, string>;
  tagline: Record<Locale, string>;
  links: AppLink;
  rating?: number;
  ratingCount?: number;
  featured?: boolean;
  icon: string;
}

export const apps: OsrApp[] = [
  {
    id: "osr-customer",
    audience: "customer",
    name: { ar: "تطبيق العملاء", en: "OSR Customer" },
    tagline: {
      ar: "اكتشف منتجات بيتية أصيلة، اطلب، وتابع توصيلك لحظة بلحظة.",
      en: "Discover authentic homemade products, order, and track your delivery in real time.",
    },
    links: {
      appStore: "https://apps.apple.com/app/osr",
      googlePlay: "https://play.google.com/store/apps/details?id=com.osr.customer",
    },
    rating: 4.9,
    ratingCount: 18640,
    featured: true,
    icon: "ShoppingBag",
  },
  {
    id: "osr-family",
    audience: "provider",
    name: { ar: "تطبيق الأسر المنتجة", en: "OSR Family Seller" },
    tagline: {
      ar: "أنشئي متجرك، أضيفي منتجاتك، واستقبلي الطلبات من بيتك بسهولة تامة.",
      en: "Create your store, add your products, and receive orders from home with total ease.",
    },
    links: {
      appStore: "https://apps.apple.com/app/osr-family",
      googlePlay: "https://play.google.com/store/apps/details?id=com.osr.family",
    },
    rating: 4.8,
    ratingCount: 9420,
    featured: true,
    icon: "Home",
  },
  {
    id: "osr-driver",
    audience: "representative",
    name: { ar: "تطبيق المناديب", en: "OSR Delivery" },
    tagline: {
      ar: "استلم مهام التوصيل، تنقّل بمسارات ذكية، وسلّم باحترافية وسرعة.",
      en: "Accept delivery tasks, navigate smart routes, and complete handoffs professionally and quickly.",
    },
    links: {
      appStore: "https://apps.apple.com/app/osr-driver",
      googlePlay: "https://play.google.com/store/apps/details?id=com.osr.driver",
    },
    rating: 4.7,
    ratingCount: 5230,
    icon: "Bike",
  },
  {
    id: "osr-ops",
    audience: "operations",
    name: { ar: "لوحة الإدارة", en: "OSR Operations" },
    tagline: {
      ar: "تحكّم مركزي في المتاجر والطلبات والمناديب وأداء المنصة بالكامل.",
      en: "Central control over stores, orders, agents, and the full platform performance.",
    },
    links: {},
    icon: "LayoutDashboard",
  },
];

export const featuredApps = apps.filter((a) => a.featured);