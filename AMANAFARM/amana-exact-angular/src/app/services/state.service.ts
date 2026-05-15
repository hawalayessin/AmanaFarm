import { Injectable, signal } from '@angular/core';

export interface AnimalAd {
  id: number;
  name: string;
  category: string;
  price: number;
  location: string;
  weight: string;
  gender: string;
  age: string;
  healthStatus: string;
  emoji: string;
  sellerName: string;
  sellerRating: number;
  featured: boolean;
  verified: boolean;
  phone: string;
  description: string;
  imageUrl?: string;
}

export interface UserInfo {
  fullName: string;
  email: string;
  avatar: string;
  role: string;
}

export interface Notification {
  icon: string;
  emoji: string;
  title: string;
  sub: string;
  time: string;
  read: boolean;
}

const DEFAULT_ANIMALS: AnimalAd[] = [
  { id: 1, name: 'خروف بربري ممتاز', category: 'أغنام', price: 1450, location: 'قابس', weight: '55 كغ', gender: 'ذكر', age: '2 سنوات', healthStatus: 'ممتازة', emoji: '🐑', sellerName: 'محمد الشريف', sellerRating: 4.9, featured: true, verified: true, phone: '21621000001', description: 'خروف بربري أصيل، تربية طبيعية، بدون أمراض. مناسب للعروسة والإقامة. السعر قابل للتفاوض.' },
  { id: 2, name: 'بقرة حلوب هولشتاين', category: 'أبقار', price: 6800, location: 'بن عروس', weight: '450 كغ', gender: 'أنثى', age: '3 سنوات', healthStatus: 'ممتازة', emoji: '🐄', sellerName: 'فاطمة بن علي', sellerRating: 4.7, featured: false, verified: true, phone: '21621000002', description: 'بقرة هولشتاين منتجة، حلب يومي 20 لتر، صحة ممتازة، لقاحات محدثة.' },
  { id: 3, name: 'دجاج بلدي — الدزينة', category: 'دواجن', price: 150, location: 'نابل', weight: 'بيولوجي', gender: '12 قطعة', age: 'متوفر', healthStatus: '', emoji: '🐔', sellerName: 'علي الحمروني', sellerRating: 4.8, featured: false, verified: true, phone: '21621000003', description: 'دجاج بلدي تربية طبيعية، غذاء عضوي بدون هرمونات.' },
  { id: 4, name: 'ماعز أرضي — ذكر', category: 'ماعز', price: 1250, location: 'سيدي بوزيد', weight: '38 كغ', gender: 'ذكر', age: '18 شهر', healthStatus: 'ممتازة', emoji: '🐐', sellerName: 'الحاج رضا', sellerRating: 5.0, featured: true, verified: true, phone: '21621000004', description: 'ماعز أرضي ذكر بصحة ممتازة، تربية في الهواء الطلق، لقاحات محدثة.' },
  { id: 5, name: 'عجل فريزيان — للبيع', category: 'أبقار', price: 3200, location: 'سوسة', weight: '180 كغ', gender: 'ذكر', age: '8 أشهر', healthStatus: 'صحة جيدة', emoji: '🐂', sellerName: 'بشير المنصوري', sellerRating: 4.6, featured: false, verified: false, phone: '21621000005', description: 'عجل فريزيان بصحة جيدة، غذاء متوازن.' },
  { id: 6, name: 'خرفان عيد — مجموعة 5', category: 'أغنام', price: 5500, location: 'تونس', weight: '70-80 كغ', gender: 'مجموعة 5', age: '3-4 سنوات', healthStatus: 'ممتازة', emoji: '🐑', sellerName: 'مزرعة البركة', sellerRating: 4.9, featured: true, verified: true, phone: '21621000006', description: 'مجموعة 5 خرفان جاهزة، وزن ممتاز، بدون مرض، سعر مجموعة.' },
];

const USER_NOTIFS: Notification[] = [
  { icon: 'green', emoji: '🐑', title: 'إعلانك تم مشاهدته 47 مرة', sub: 'خروف بربري ممتاز — قابس', time: 'منذ 10 دقائق', read: false },
  { icon: 'gold', emoji: '⭐', title: 'رسالة جديدة من مشتري', sub: 'شخص ما أرسل رسالة بخصوص إعلانك', time: 'منذ 25 دقيقة', read: false },
  { icon: 'red', emoji: '🔥', title: 'إعلانات جديدة قريبة منك', sub: '3 إعلانات جديدة في منطقتك', time: 'منذ ساعة', read: false },
  { icon: 'green', emoji: '✅', title: 'حساب تم التحقق منه', sub: 'حسابك الآن موثق — يمكنك الإعلان بحرية', time: 'أمس', read: true },
];

const LS = {
  get<T>(k: string, fallback: T): T {
    try {
      const r = localStorage.getItem(k);
      if (!r) return fallback;
      const p = JSON.parse(r);
      if (p && p.__exp && Date.now() > p.__exp) { localStorage.removeItem(k); return fallback; }
      return p && p.__val !== undefined ? p.__val : p;
    } catch { return fallback; }
  },
  set(k: string, v: unknown, ttlMs?: number) {
    try { localStorage.setItem(k, JSON.stringify(ttlMs ? { __val: v, __exp: Date.now() + ttlMs } : v)); } catch {}
  },
  del(k: string) { try { localStorage.removeItem(k); } catch {} }
};

@Injectable({ providedIn: 'root' })
export class StateService {
  readonly user = signal<UserInfo | null>(null);
  readonly cart = signal<AnimalAd[]>([]);
  readonly favs = signal<number[]>([]);
  readonly notifs = signal<Notification[]>([]);
  readonly animals = signal<AnimalAd[]>([]);

  private apiBase = 'http://localhost:8080';
  private _token: string | null = null;

  constructor() {
    const remembered = LS.get<UserInfo | null>('af_user_remember', null);
    if (remembered) this.user.set(remembered);
    this._token = LS.get<string | null>('af_token', null);
    this.cart.set(LS.get<AnimalAd[]>('af_cart', []));
    this.favs.set(LS.get<number[]>('af_favs', []));
    this.notifs.set(USER_NOTIFS.map(n => ({ ...n })));
    this.loadAnimals();
  }

  get token() { return this._token; }
  setToken(t: string | null) {
    this._token = t;
    if (t) LS.set('af_token', t);
    else LS.del('af_token');
  }

  private getHeaders(): Record<string, string> {
    const h: Record<string, string> = { 'Content-Type': 'application/json' };
    if (this._token) h['Authorization'] = `Bearer ${this._token}`;
    return h;
  }

  private mapAnimalResponse(a: any): AnimalAd {
    return {
      id: a.id,
      name: a.title || '—',
      category: a.category || '',
      price: Number(a.price) || 0,
      location: a.wilaya || '',
      weight: a.zone || '',
      gender: a.gender || '',
      age: a.age || '',
      healthStatus: a.healthStatus || '',
      emoji: this.getCatEmoji(a.category),
      sellerName: a.trustedSeller ? 'بائع موثق' : 'مستخدم',
      sellerRating: 4.8,
      featured: a.featured || false,
      verified: a.trustedSeller || false,
      phone: a.phone || '',
      description: a.description || '',
      imageUrl: a.images?.[0] || '',
    };
  }

  private loadAnimals() {
    const saved = LS.get<AnimalAd[] | null>('af_animals', null);
    if (saved && saved.length >= DEFAULT_ANIMALS.length) {
      const savedMap = new Map(saved.map(a => [a.id, a]));
      const merged = [...DEFAULT_ANIMALS.filter(d => !savedMap.has(d.id)), ...saved];
      this.animals.set(merged.slice(0, 200));
    } else {
      this.animals.set([...DEFAULT_ANIMALS]);
    }
    this.fetchFromBackend();
  }

  private async fetchFromBackend() {
    try {
      const res = await fetch(`${this.apiBase}/api/animals`);
      if (!res.ok) return;
      const data = await res.json();
      const mapped = (data || []).map((a: any) => this.mapAnimalResponse(a));
      if (mapped.length) {
        this.animals.set(mapped);
        this.saveAnimals();
      }
    } catch {}
  }

  saveAnimals() {
    LS.set('af_animals', this.animals().slice(0, 200));
  }

  addAnimal(ad: AnimalAd) {
    this.animals.update(list => [ad, ...list]);
    this.saveAnimals();
    fetch(`${this.apiBase}/api/animals`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({
        title: ad.name,
        description: ad.description,
        category: ad.category,
        price: ad.price,
        wilaya: ad.location,
        zone: ad.weight,
        age: ad.age,
        gender: ad.gender,
        healthStatus: ad.healthStatus,
        phone: ad.phone,
        contactMethod: 'whatsapp',
        deliveryAvailable: false,
        vetCertificate: false,
        featured: ad.featured,
        trustedSeller: ad.verified,
        userId: null,
      }),
    }).catch(() => {});
  }

  // Auth
  setUser(u: UserInfo | null, remember = false) {
    this.user.set(u);
    if (u) {
      if (remember) LS.set('af_user_remember', u, 30 * 24 * 60 * 60 * 1000);
      else LS.del('af_user_remember');
    } else {
      LS.del('af_user_remember');
    }
  }

  logout() {
    this.user.set(null);
    this._token = null;
    this.cart.set([]);
    LS.del('af_cart');
    LS.del('af_user_remember');
    LS.del('af_token');
  }

  // Cart
  addToCart(ad: AnimalAd) {
    if (this.cart().find(x => x.id === ad.id)) return false;
    this.cart.update(list => [...list, ad]);
    LS.set('af_cart', this.cart());
    return true;
  }

  removeFromCart(id: number) {
    this.cart.update(list => list.filter(x => x.id !== id));
    LS.set('af_cart', this.cart());
  }

  // Favorites
  toggleFav(id: number): boolean {
    const has = this.favs().includes(id);
    if (has) this.favs.update(list => list.filter(x => x !== id));
    else this.favs.update(list => [...list, id]);
    LS.set('af_favs', this.favs());
    return !has;
  }

  isFav(id: number): boolean {
    return this.favs().includes(id);
  }

  // Notifications
  markNotifRead(index: number) {
    this.notifs.update(list => { list[index].read = true; return [...list]; });
  }

  markAllNotifsRead() {
    this.notifs.update(list => list.map(n => ({ ...n, read: true })));
  }

  unreadNotifCount(): number {
    return this.notifs().filter(n => !n.read).length;
  }

  // Utility
  fmtPrice(n: string | number): string {
    return Number.isFinite(+n) ? (+n).toLocaleString('fr-FR') : String(n);
  }

  esc(s: unknown): string {
    const str = typeof s === 'string' ? s : String(s ?? '');
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;');
  }

  getCatEmoji(cat: string): string {
    return { 'أغنام': '🐑', 'أبقار': '🐄', 'دواجن': '🐔', 'ماعز': '🐐', 'منتجات': '🌾', 'خدمات': '🚚' }[cat] || '🐑';
  }
}
