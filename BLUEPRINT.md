# Diyorbek Zarifboyev — Videomaker Portfolio · BLUEPRINT

> Premium, kinematik, uch tilli portfolio sayti.
> Pozitsiya: **"Qimmat, lekin arziydi."**
> Bu hujjat — yagona haqiqat manbai. Har qanday qaror shu yerdan boshlanadi.

---

## 0 · Qarorlar xulosasi

| Soha | Qaror |
|---|---|
| Ism / unvon | Diyorbek Zarifboyev · **Videomaker** |
| Manzil | Toshkent · xalqaro safarlar |
| Domen | `diyorbekportfolio.vercel.app` |
| Tillar | **uz** (asosiy, `/`) · ru (`/ru`) · en (`/en`) |
| Pozitsiya | *"Qimmat, lekin arziydi"* — hashamat kamlik orqali |
| Ohang | Muharrirona, ishonchli, qisqa |
| Auditoriya | Brendlar va agentliklar · moda/go'zallik · Instagram (bloger + Reels) |
| O'sish yo'nalishi | Chet el |
| Uslub | Qorong'i, kontrastli, kinematik · iliq oltin + teal-orange |
| Ritm | Aralash — sekin asos, tez Reels |
| Xizmatlar | Brend filmlari · reklama · Reels · moda/go'zallik · rang berish · montaj |
| Narx | Ko'rsatilmaydi |
| Ish shakli | Yolg'iz muallif |
| Raqamlar | **100+ loyiha · 50+ mijoz · 4 yil** |
| Journey | 2022 · 2023 · 2024 · 2025 · 2026 |
| Skills | Mahorat asosida, jihoz — nafis qator |
| Hero ikonkalar | 6 ta: Premiere · DaVinci · Photoshop · Google Flow · Kling · Higgsfield — qora shisha plitka + rasmiy logo |
| Loyihalar | 10 ta · muqovalar tayyor · video **Telegram** (`t.me/dicouz`) |
| Ranglar | To'q ko'k-qora + orange + oq · **ikki rejim (kunduzgi/tungi)** |
| Ilhom | Frame.io (aniqlik) + Apple TV+ (vazminlik) |
| Kontent | Fayl asosida (CMS'ga tayyor) |
| Aloqa | Brif shakli → pochta + Telegram |
| Aloqa ma'lumotlari | `zarifboyevdiyor@gmail.com` · `+998 93 255 69 49` · `@dico.uz` · `t.me/dicouz` |
| Logotip | Vaqtinchalik: `DIYORBEK ZARIFBOYEV` (Unbounded Light, keng oraliq) |
| Shior | Yo'q (kelajakda qo'shilishi mumkin) |

**Texnik steka:** Next.js 16 · React 19 · TypeScript (strict) · Tailwind CSS 4 · shadcn/ui · Motion · Lenis · next/image · App Router · Vercel.

---

## 1 · Information Architecture

Uch qatlamli tuzilma:

**1-qatlam — Ishontirish (bosh sahifa, bitta uzluksiz oqim)**

```
Hero        → "Bu kim va u qanday darajada?"     (hissiy zarba)
Showreel    → "Ishini ko'rsat"                    (isbot)
About       → "Nega aynan u?"                     (ishonch)
Skills      → "Nima qila oladi?"                  (imkoniyat)
Projects    → "Kim bilan ishlagan?"               (dalil)
Journey     → "Qanday o'sgan?"                     (yo'l)
Contact     → "Qanday yozaman?"                   (harakat)
```

**2-qatlam — Chuqurlashtirish**
`/work` — barcha loyihalar · `/work/[slug]` — Case Study (loyihaning to'liq tahlili).

**3-qatlam — Xizmat sahifalari**
`sitemap.xml` · `robots.txt` · `404` · `og-image` generatori.

**Kontent modellari**

```
Project    slug · title · client · category · year · format(16:9|9:16)
           cover · teaser · telegramUrl · gallery[] · caseStudy?
Milestone  year · title · description
Skill      key · label · description · icon
Service    key · label · description
Tool       key · label · logo
Stat       value · label
```

Har bir model tarjima kalitlari bilan — matnli maydonlar uch tilda.

---

## 2 · Sitemap

```
/                          uz — bosh sahifa (barcha bo'limlar)
├─ #showreel #about #skills #work #journey #contact
/work                      barcha loyihalar (filtr: hammasi | brend | moda | reels)
/work/[slug]               Case Study × 10
/ru  /ru/work  /ru/work/[slug]
/en  /en/work  /en/work/[slug]
/sitemap.xml  /robots.txt  /opengraph-image  /not-found
```

Indekslanadigan sahifalar: **(1 + 1 + 10) × 3 = 36**.
`localePrefix: 'as-needed'` — o'zbek tili prefikssiz.

---

## 3 · Folder Structure

```
diyorbek-portfolio/
├─ src/
│  ├─ app/
│  │  ├─ [locale]/
│  │  │  ├─ layout.tsx              root layout · fontlar · providerlar
│  │  │  ├─ page.tsx                bosh sahifa
│  │  │  ├─ work/
│  │  │  │  ├─ page.tsx             barcha loyihalar
│  │  │  │  └─ [slug]/
│  │  │  │     ├─ page.tsx          case study
│  │  │  │     └─ opengraph-image.tsx
│  │  │  ├─ not-found.tsx
│  │  │  └─ opengraph-image.tsx
│  │  ├─ api/contact/route.ts       brif → Resend + Telegram bot
│  │  ├─ sitemap.ts
│  │  ├─ robots.ts
│  │  └─ globals.css                Tailwind 4 · @theme · tokenlar
│  ├─ components/
│  │  ├─ sections/
│  │  │  ├─ hero/
│  │  │  │  ├─ hero.tsx
│  │  │  │  ├─ hero-portrait.tsx
│  │  │  │  ├─ hero-backdrop-type.tsx
│  │  │  │  ├─ floating-tools.tsx
│  │  │  │  ├─ tool-tile.tsx
│  │  │  │  ├─ hero-light.tsx
│  │  │  │  └─ scroll-cue.tsx
│  │  │  ├─ showreel.tsx
│  │  │  ├─ about.tsx
│  │  │  ├─ skills.tsx
│  │  │  ├─ work.tsx
│  │  │  ├─ journey.tsx
│  │  │  └─ contact.tsx
│  │  ├─ work/
│  │  │  ├─ project-card.tsx        16:9
│  │  │  ├─ project-card-vertical.tsx  9:16
│  │  │  ├─ project-grid.tsx
│  │  │  ├─ project-filter.tsx
│  │  │  ├─ video-modal.tsx         Telegram embed
│  │  │  └─ gallery-lightbox.tsx
│  │  ├─ journey/
│  │  │  ├─ timeline.tsx
│  │  │  ├─ timeline-item.tsx
│  │  │  └─ timeline-progress.tsx
│  │  ├─ layout/
│  │  │  ├─ header.tsx  nav.tsx  mobile-menu.tsx  footer.tsx
│  │  │  ├─ locale-switcher.tsx  theme-toggle.tsx  skip-link.tsx
│  │  ├─ motion/
│  │  │  ├─ reveal.tsx  text-reveal.tsx  parallax.tsx
│  │  │  ├─ magnetic.tsx  smooth-scroll.tsx
│  │  ├─ ui/                        shadcn (faqat kerakli)
│  │  └─ shared/
│  │     ├─ section-heading.tsx  eyebrow.tsx  stat-row.tsx
│  │     ├─ glass-panel.tsx  grain-overlay.tsx  noise-gradient.tsx
│  ├─ content/                      YAGONA kontent manbai
│  │  ├─ projects/*.ts              10 ta fayl
│  │  ├─ journey.ts  skills.ts  services.ts  tools.ts  stats.ts  site.ts
│  ├─ lib/
│  │  ├─ content/                   repozitoriy qatlami (CMS'ga o'tish nuqtasi)
│  │  ├─ seo/  metadata.ts  json-ld.ts
│  │  ├─ telegram.ts  motion-tokens.ts  utils.ts  validation.ts
│  ├─ hooks/
│  │  ├─ use-mouse-parallax.ts  use-reduced-motion.ts
│  │  ├─ use-media-query.ts  use-scroll-progress.ts  use-lock-scroll.ts
│  ├─ i18n/  routing.ts  request.ts  messages/{uz,ru,en}.json
│  ├─ types/  project.ts  journey.ts  content.ts
│  └─ middleware.ts
├─ public/
│  ├─ portrait/  tools/  work/  fonts/  favicon/
├─ BLUEPRINT.md
├─ tsconfig.json  next.config.ts  eslint.config.mjs  package.json
```

**Tamoyil:** `content/` → `lib/content/` → komponent. Komponentlar hech qachon kontentga bevosita murojaat qilmaydi. CMS qo'shilsa, faqat `lib/content/` o'zgaradi.

---

## 4 · Component Hierarchy

```
RootLayout
├─ SkipLink
├─ ThemeProvider · NextIntlProvider · SmoothScroll(Lenis)
├─ GrainOverlay                      ← butun sayt ustida kino donadorligi
├─ Header (Wordmark · Nav · LocaleSwitcher · ThemeToggle · MobileMenu · CTA)
├─ main
│  ├─ Hero  (100vh)
│  │  ├─ HeroLight · HeroBackdropType · FloatingTools(6×ToolTile)
│  │  ├─ HeroPortrait · HeroContent · StatRow · ScrollCue
│  ├─ Showreel  (muqova + Play → VideoModal)
│  ├─ About  (Eyebrow · TextReveal · portret detali · imzo)
│  ├─ Skills  (SkillCard×6 · ToolMarquee)
│  ├─ Work  (SectionHeading · ProjectFilter · ProjectGrid · "Barcha ishlar")
│  ├─ Journey  (TimelineProgress · TimelineItem×5)
│  └─ Contact  (CTA · BriefForm · ContactChannels)
└─ Footer

/work/[slug]
├─ CaseHero · VideoBlock · CaseIntro · CaseApproach
├─ Gallery(Lightbox) · CaseMeta · NextProject
```

**Server / Client chegarasi**

| Server Component (default) | Client Component (`"use client"`) |
|---|---|
| Sahifalar, section qobiqlari, matn, kontent o'qish, SEO | Hero parallax, FloatingTools, VideoModal, Filter, Form, ThemeToggle, Lenis, Reveal |

Client kod faqat harakat/o'zaro ta'sir kerak bo'lgan barglarda.

---

## 5 · Design System

**Setka**

| | Ustunlar | Chekka | Maks. kenglik |
|---|---|---|---|
| Mobil | 4 | 20px | — |
| Planshet | 8 | 40px | — |
| Desktop | 12 | 64px | 1440px |
| Katta | 12 | 80px | 1600px |

**Bo'sh joy (8px asos):** `2 4 8 12 16 24 32 48 64 96 128 160 200 240`
Bo'limlar orasidagi vertikal masofa: mobil `96px` → desktop `200px`.

**Radiuslar:** `4 · 8 · 12 · 20 · 28 · full` — shisha `20`, kartochka `12`, tugma `full`.

**Shisha (glassmorphism)**

```
glass-1   blur(16px)  bg 6%   border 8%    ← ToolTile
glass-2   blur(24px)  bg 8%   border 12%   ← Header, Modal
glass-3   blur(40px)  bg 12%  border 16%   ← CTA panel
```

Har bir shisha yuzada ichki yuqori yorug'lik chizig'i: `inset 0 1px 0 rgba(255,255,255,.08)`.

**Chuqurlik (nur, soya emas)**

```
e0  yassi
e1  0 1px 2px black/40
e2  0 8px 24px black/50
e3  0 24px 64px black/60  +  0 0 80px orange/8
```

**Kino donadorligi:** butun sayt ustida `opacity 3%` SVG shovqin, `mix-blend-mode: overlay`, `pointer-events: none`.

---

## 6 · Typography System

| Rol | Shrift | Sabab |
|---|---|---|
| Display | **Unbounded** Variable (200–700) | Geometrik, kinoafisha hissi, kirill ✓ |
| Body | **Inter** Variable | Toza, o'qish qulay, kirill ✓ |
| Meta / label | **JetBrains Mono** (400–500) | Frame.io aniqligi: yil, kategoriya, raqam |

Uchalasi `next/font/local` · `.woff2` variable · `display: swap` · subset (lotin + kirill). Tashqi so'rov yo'q.

**O'lcham shkalasi (`clamp()`, 320→1600px)**

| Token | Mobil → Desktop | Qo'llanishi |
|---|---|---|
| `hero-backdrop` | 96 → 320px | Orqa fon "VIDEOMAKER" |
| `display-1` | 44 → 104px | Hero ismi |
| `display-2` | 34 → 72px | Bo'lim sarlavhalari |
| `h1` | 28 → 48px | Case study sarlavhasi |
| `h2` | 22 → 32px | Kartochka sarlavhasi |
| `body-lg` | 17 → 20px | About matni |
| `body` | 15 → 17px | Umumiy matn |
| `label` | 11 → 12px | Mono, `letter-spacing .14em`, CAPS |

**Qoidalar:** Display faqat yengil og'irlik (200–300); katta sarlavha `letter-spacing -0.03em`; line-height display `0.92–1.0`, matn `1.6`; matn qatori maks `68ch`; sarlavhada `text-wrap: balance`, paragrafda `pretty`; kirill uchun `font-size-adjust` bilan tenglashtirish.

---

## 7 · Color System

**Falsafa:** fon — kechki osmon, urg'u — quyosh botishi.

### Qorong'i rejim (asosiy)

| Token | Qiymat | Rol |
|---|---|---|
| `bg` | `#05070C` | Deyarli qora, ko'k tagrang |
| `bg-elevated` | `#0A0E16` | Ko'tarilgan sirt |
| `surface` | `#101623` | Kartochka |
| `surface-raised` | `#18202F` | Hover |
| `border` | `#FFFFFF` 8% | Nozik chegara |
| `fg` | `#F2F5F9` | Asosiy matn |
| `fg-muted` | `#9AA5B4` | Ikkilamchi |
| `fg-subtle` | `#5B6779` | Uchinchi darajali |
| `accent` | `#FF6B21` | Orange — CTA, urg'u, chiziq |
| `accent-hover` | `#FF7F3D` | |
| `accent-soft` | `#FF6B21` 12% | Fon dog'i |
| `azure` | `#1D5CFF` | To'q ko'k — ikkilamchi nur |
| `azure-deep` | `#0A2A66` | Chuqur ko'k gradient |

### Yorug' rejim (muharrirona variant)

| Token | Qiymat |
|---|---|
| `bg` | `#F4F2ED` — suyak oq |
| `surface` | `#FFFFFF` |
| `fg` | `#0A0D14` |
| `fg-muted` | `#5A6070` |
| `accent` | `#D9480F` |
| `azure` | `#123A9E` |

**Kontrast (WCAG AA)**

| Kombinatsiya | Nisbat | Holat |
|---|---|---|
| `fg` / `bg` (qorong'i) | 16.8:1 | ✓ AAA |
| `fg-muted` / `bg` | 7.1:1 | ✓ AAA |
| `accent` / `bg` | 6.2:1 | ✓ AA |
| `accent` yorug' `#D9480F`/`#F4F2ED` | 5.4:1 | ✓ AA |

**Qoida:** orange — tugma foni/chiziq/urg'u sifatida; hech qachon 16px dan kichik matn rangi sifatida emas.

Barcha tokenlar Tailwind 4 `@theme` orqali **OKLCH** formatida.

---

## 8 · Motion & Animation Strategy

**Falsafa:** kamera harakati kabi — hech narsa sakramaydi, hamma narsa suziladi.

**Davomiylik:** `instant 120 · quick 240 · base 420 · slow 800 · cinema 1400` (ms)

**Easing**
```
ease-out-expo     cubic-bezier(0.16, 1, 0.30, 1)     ← asosiy
ease-in-out-quart cubic-bezier(0.77, 0, 0.175, 1)    ← modal, sahifa
spring-soft       stiffness 120 · damping 22         ← parallax
spring-float      stiffness 40  · damping 14         ← ikonkalar
```

**Hero kirish partiturasi (2.4s)**
```
0.0s  fon ochiladi              opacity 0→1, 1400ms
0.2s  radial nurlar kengayadi   scale 0.9→1
0.4s  "VIDEOMAKER" orqa yozuv    y+40→0, opacity 0→.04
0.7s  portret ko'tariladi        y60→0, scale 1.04→1
1.2s  6 ikonka yoqiladi          stagger 90ms, scale .7→1, blur 8→0
1.6s  ism harflari               clip-path reveal, stagger 60ms
1.9s  unvon + shior              opacity, y20→0
2.2s  CTA + raqamlar             opacity, y12→0
2.4s  ScrollCue nafas oladi      infinite 3s
```

**Sichqoncha parallaksi (4 qatlam)**
```
orqa yozuv ±6px · nur ±12px · portret ±10px(+1.5°) · ikonkalar ±28px
```
Spring bilan silliqlanadi; kursor to'xtasa markazga qaytadi.

**Suzish:** har ikonka o'z fazasida — `y ±14px`, `rotate ±4°`, `6–9s`, cheksiz, har xil delay (hech qachon sinxron emas).

**Nur harakati:** radial gradientlar `20s` juda sekin siljiydi.

**Scroll animatsiyalari:** sarlavha clip-path reveal (stagger 40ms) · paragraf opacity+y · kartochkalar stagger 80ms · rasm ichki parallaks ±8% · Journey chizig'i scroll bilan to'ladi · nuqta scale 0→1 + nur portlashi · statistika 0→100 sanoq · case muqovasi scale 1→1.08.

Barcha reveal `once: true`.

**Lenis:** `lerp 0.09` · `duration 1.2` · `wheelMultiplier 0.9`. **Mobilda o'chiriladi.**

**Taqiqlar:** sakrash · pulsatsiya · aylanuvchi bezak · neon · haddan tashqari parallaks · harf-harf sakrash · avtomatik karusel.

**`prefers-reduced-motion`:** Lenis o'chadi, parallaks/suzish o'chadi, reveal'lar `200ms opacity` ga aylanadi. Sayt to'liq va chiroyli ishlaydi.

**60 FPS:** faqat `transform`+`opacity`; `will-change` faqat harakat paytida; Hero harakati bitta rAF siklida.

---

## 9 · Responsive Strategy

**Nuqtalar:** `sm 480 · md 768 · lg 1024 · xl 1280 · 2xl 1536`

**Hero moslashuvi**

| | Mobil (<768) | Planshet | Desktop |
|---|---|---|---|
| Portret balandligi | 62vh | 70vh | 78vh |
| Orqa yozuv | 96px | 180px | 320px |
| Ikonkalar | 4 ta (yon) | 5 ta | 6 ta (orbita) |
| Ikonka o'lchami | 44px | 56px | 68px |
| Orbita radiusi | 40vw | 32vw | 26vw |
| Sichqoncha parallaks | o'chiq | o'chiq | yoqiq |
| Kontent | portret ostida | markazda | portret ustida |

Mobilda ikonkalar yuz sohasini qoplamaydi.

**Boshqa bo'limlar**

| Bo'lim | Mobil | Desktop |
|---|---|---|
| Skills | 1 ustun | 3×2 |
| Projects 16:9 | 1 ustun | 2 ustun asimmetrik |
| Projects 9:16 | 2 ustun | 4 ustun lenta |
| Journey | chap chiziq | markaziy, almashinuvchi |
| Contact | vertikal | 2 ustun |

Mobile-first CSS · `clamp()` suyuq tipografika · container queries kartochkalar uchun.
Sinov: 375 · 393 · 820 · 1440 · 2560.

---

## 10 · Accessibility Strategy

Maqsad: Lighthouse 100 + haqiqiy foydalanish qulayligi.

- **Semantika:** bitta `<h1>`; `<header><nav><main><section aria-labelledby><footer>`; Journey — `<ol>`; loyiha — `<article>`.
- **Klaviatura:** hamma element Tab bilan; focus 2px orange halqa + offset (hech qachon `outline:none`); modal focus trap + Esc + focus qaytishi; SkipLink; filtr `role=tablist`.
- **Ekran o'quvchi:** portret alt; bezaklar `aria-hidden`; orqa yozuv yashiriladi (h1 emas); ikonka `aria-label`; shakl `<label>` + `aria-live`; til `<html lang>` + hreflang.
- **Ko'rish:** AA+; rang yagona ma'no tashuvchi emas; 200% zoom; `prefers-contrast: more`.
- **Harakat:** `prefers-reduced-motion` to'liq; avtoplay ovoz yo'q; miltillash yo'q.
- **Sinov:** axe · Lighthouse · VoiceOver · NVDA · faqat klaviatura.

---

## 11 · SEO Strategy

- Har sahifa Server Component (to'liq HTML).
- `generateMetadata()` har sahifa/til uchun.
- `alternates.languages` — uz · ru · en · `x-default: uz`; har tilda canonical.
- `sitemap.ts` 36 sahifa; `robots.ts` to'liq indekslash.

**Meta shablon**
```
Bosh (uz)  Diyorbek Zarifboyev — Videomaker | Toshkent
Bosh (en)  Diyorbek Zarifboyev — Videomaker | Tashkent, Uzbekistan
Ish        {title} — {client} | Diyorbek Zarifboyev
Ishlar     Portfolio — brend filmlari, reklama, Reels
```
Tavsif 150–160 belgi, har tilda alohida yozilgan.

**JSON-LD:** Person · ProfessionalService · VideoObject (har loyiha) · BreadcrumbList · WebSite.

**Kalit so'zlar (tabiiy)**
```
uz  videomaker Toshkent · brend videosi · reels tayyorlash · videograf
ru  видеограф Ташкент · съёмка рекламы · видеопродакшн
en  videographer Tashkent · brand film Uzbekistan · commercial filmmaker
```

**Ijtimoiy:** dinamik OG rasm (1200×630); `twitter:card = summary_large_image`.
**Mahalliy:** `ProfessionalService` + Google Business Profile tavsiya.
Maqsad: Lighthouse SEO 100.

---

## 12 · Performance Strategy

**Byudjetlar**

| Ko'rsatkich | Maqsad |
|---|---|
| LCP | < 1.8s |
| INP | < 150ms |
| CLS | < 0.02 |
| Birinchi JS (bosh) | < 130 KB gzip |
| Portret rasm | < 180 KB |
| Birinchi ekran og'irligi | < 500 KB |
| Lighthouse Performance | ≥ 95 mobil |

**Qarorlar**
1. Hero'da video yo'q — LCP = portret.
2. Portret: AVIF+WebP, shaffof, mobil variant, `priority`+`fetchPriority`+`preload`, aniq o'lcham (CLS 0), LQIP. 1.5MB → 150–180KB.
3. Telegram vidjeti faqat "Play" bosilganda yuklanadi (~300KB va 4 so'rovni birinchi yuklanishdan olib tashlaydi).
4. Shriftlar o'z serverdan, subset, `preload` faqat Display+Body.
5. JS: `LazyMotion`+`domAnimation`; shadcn'dan 8 komponent; Lenis 3KB; og'ir bo'limlar `dynamic()`.
6. Rasm: AVIF, aniq `sizes`, ekrandan tashqari `lazy`, galereya faqat Lightbox'da.
7. Render: barcha sahifa statik (SSG), Edge; faqat `/api/contact` dinamik.
8. Analitika: `@vercel/analytics` (~1KB, cookie yo'q).
9. Animatsiya: faqat GPU qatlam; `contain` og'ir bo'limda; Hero bitta rAF.

Nazorat: har bosqichda `next build` hajm hisoboti + Lighthouse. Byudjet oshsa — bosqich yakunlanmagan.

---

## 13 · Development Roadmap

Har bosqichdan keyin **to'xtash**, hisobot, tasdiq kutish.

| # | Bosqich | Mazmun | Natija |
|---|---|---|---|
| 0 | Poydevor | Next.js 16 · TS strict · Tailwind 4 · ESLint · papka · `site.ts` | `npm run dev` ishlaydi |
| 1 | Dizayn tizimi | Rang tokenlari (2 rejim) · tipografika · bo'sh joy · shisha · grain · `ui/` | Ichki stil sahifasi |
| 2 | Karkas | Header · Nav · Footer · Theme · Locale · Lenis · i18n · SkipLink | Sayt aylanadi, til/rejim almashadi |
| 3 | HERO ⭐ | Portret kesish · orqa yozuv · 6 shisha ikonka · nur · parallaks · partitura · moslashuv | Eng muhim bosqich |
| 4 | Kontent qatlami | `content/` · tiplar · repozitoriy · 3 tilli tarjima | Ma'lumot tayyor |
| 5 | About + Skills | Bayonot · TextReveal · 6 mahorat · jihoz qatori · statistika | Ikki bo'lim |
| 6 | Projects | Kartochka (16:9, 9:16) · filtr · setka · Telegram VideoModal · `/work` | Portfolio ishlaydi |
| 7 | Case Study | `/work/[slug]` · galereya · Lightbox · keyingi · dinamik OG | 10 sahifa |
| 8 | Journey | Vertikal chiziq · scroll progressi · 5 bosqich · nuqta animatsiya | Vaqt chizig'i |
| 9 | Contact | Brif shakli · zod · Resend + Telegram bot · 4 kanal · toast | So'rov keladi |
| 10 | SEO + A11y | Metadata · JSON-LD · sitemap · hreflang · axe · VoiceOver | 100/100 |
| 11 | Performance | Rasm optimizatsiya · bundle · Lighthouse · byudjet | ≥95 mobil |
| 12 | Joylashtirish | Vercel · domen · analitika · yakuniy sinov | Efirda |

3-bosqich (Hero) eng ko'p vaqt oladi va bir necha marta qayta ko'riladi.

---

## Kerakli materiallar

| Material | Qachon | Holat |
|---|---|---|
| `portrait.png` (asl fayl) | 3-bosqichdan oldin | ⏳ kutilmoqda |
| 10 loyiha muqovasi | 6-bosqich | ✅ bor |
| Telegram post havolalari (10) | 6-bosqich | ⏳ kerak |
| Loyiha ma'lumotlari (nom·mijoz·kategoriya·yil) | 4-bosqich | ⏳ kerak |
| Showreel | 6-bosqich | ❓ noma'lum |
| BTS rasmlari | 7-bosqich | ❓ noma'lum |
| Instagram / Telegram | ✅ | `@dico.uz` · `t.me/dicouz` |
