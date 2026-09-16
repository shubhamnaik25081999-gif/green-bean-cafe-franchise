export interface Product {
  id: string;
  name: string;
  category: 'signature' | 'celebration' | 'pastries' | 'desserts' | 'coffee';
  tagline: string;
  description: string;
  notes: string[];
  pairing: string;
  badge?: string;
  image?: string;
}

export interface BrandPillar {
  id: string;
  title: string;
  tag: string;
  shortDesc: string;
  fullDesc: string;
  highlights: string[];
}

export interface BusinessNode {
  id: string;
  name: string;
  iconName: string;
  role: string;
  details: string;
  metricsLabel: string;
  metricsValue: string;
}

export interface FranchiseModel {
  id: string;
  title: string;
  format: string;
  footprint: string;
  idealLocation: string;
  features: string[];
  highlight: string;
}

export interface PartnerStory {
  id: string;
  name: string;
  city: string;
  format: string;
  quote: string;
  story: string;
  background: string;
  avatarText: string;
}

export interface CityPresence {
  id: string;
  name: string;
  tagline: string;
  status: 'Flagship Hub' | 'Upcoming Outlets' | 'Metropolitan Zone';
  coordinates: [number, number]; // for 3D map projection
  storeFormats: string[];
  vibe: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'General' | 'Requirements' | 'Support' | 'Process';
}

// Brand Pillars
export const BRAND_PILLARS: BrandPillar[] = [
  {
    id: 'product-quality',
    title: 'Artisan Product Mastery',
    tag: 'Craft & Ingredients',
    shortDesc: 'French patisserie techniques blended with pure single-origin cacao and cultured butter.',
    fullDesc: 'Every recipe is developed by master pastry chefs, standardizing high-end artisan luxury into repeatable precision for franchise partners.',
    highlights: ['100% Belgian chocolate', 'Cultured European butter', 'Daily baking cadence']
  },
  {
    id: 'customer-experience',
    title: 'Multi-Sensory Hospitality',
    tag: 'Ambiance & Warmth',
    shortDesc: 'A calming sanctuary of warm woods, soft illumination, and roasted espresso aromas.',
    fullDesc: 'We engineer every customer touchpoint—from acoustic warmth to custom ceramic dishware—fostering high dwell time and community loyalty.',
    highlights: ['Acoustic comfort engineering', 'Artisanal table service', 'Curated sensorial warmth']
  },
  {
    id: 'brand-identity',
    title: 'Recognized Prestige',
    tag: 'Distinctive Aesthetic',
    shortDesc: 'An iconic silhouette and timeless green-and-crème visual language.',
    fullDesc: 'The Green Bean crest is synonymous with premium gifting, celebratory moments, and daily indulgence across premium urban neighborhoods.',
    highlights: ['Luxury packaging design', 'High social currency', 'Signature bespoke boxes']
  },
  {
    id: 'operational-support',
    title: 'Turnkey Operational Rigor',
    tag: 'Standard Operating Procedures',
    shortDesc: 'Digitized kitchen workflows, predictive prep sheets, and continuous quality audits.',
    fullDesc: 'Franchisees receive documented operational playbooks that eliminate guesswork, enabling smooth multi-shift cafe management.',
    highlights: ['Digital SOP dashboards', 'Routine secret audits', 'Waste-reduction algorithms']
  },
  {
    id: 'marketing-excellence',
    title: 'Hyper-Local & Global Buzz',
    tag: 'Growth Engine',
    shortDesc: 'Centralized brand campaigns synchronized with high-impact neighborhood activations.',
    fullDesc: 'We handle master brand storytelling, influencer gifting, seasonal product launches, and targeted geo-fenced digital promotion for your store.',
    highlights: ['Turnkey store launch PR', 'Seasonal celebration campaigns', 'Loyalty app integration']
  },
  {
    id: 'franchise-training',
    title: 'Green Bean Academy',
    tag: 'Empowerment & Mastery',
    shortDesc: 'Comprehensive 4-week immersion for store owners, head baristas, and pastry leaders.',
    fullDesc: 'From espresso extraction calibration to P&L management, our specialized academy guarantees team readiness before doors ever open.',
    highlights: ['Hands-on barista certification', 'Leadership & guest hospitality', 'Ongoing refresher clinics']
  }
];

// Business Ecosystem 3D Nodes
export const BUSINESS_NODES: BusinessNode[] = [
  {
    id: 'training',
    name: 'TRAINING',
    iconName: 'GraduationCap',
    role: 'Green Bean Academy',
    details: 'Immersive barista and kitchen leadership programs, customer service etiquette, and shift management certifications.',
    metricsLabel: 'Curriculum Depth',
    metricsValue: '120+ Hours Hands-on'
  },
  {
    id: 'marketing',
    name: 'MARKETING',
    iconName: 'Megaphone',
    role: 'Campaigns & PR Engine',
    details: 'National brand recognition campaigns, local opening buzz, seasonal menus, and digital loyalty ecosystem.',
    metricsLabel: 'Campaign Support',
    metricsValue: 'Omnichannel & Local'
  },
  {
    id: 'operations',
    name: 'OPERATIONS',
    iconName: 'Settings',
    role: 'Proven Cafe Blueprint',
    details: 'Refined daily playbooks, staff scheduling matrices, waste management protocols, and quality benchmarks.',
    metricsLabel: 'SOP Playbooks',
    metricsValue: 'Full Digital Stack'
  },
  {
    id: 'supply',
    name: 'SUPPLY CHAIN',
    iconName: 'Truck',
    role: 'Cold-Chain Delivery',
    details: 'Centralized sourcing of single-origin beans, gourmet chocolates, proprietary doughs, and branded luxury packaging.',
    metricsLabel: 'Ingredient Integrity',
    metricsValue: 'Direct Sourced'
  },
  {
    id: 'technology',
    name: 'TECHNOLOGY',
    iconName: 'Cpu',
    role: 'Integrated POS & Ops',
    details: 'Cloud POS, real-time inventory tracking, guest feedback portal, and seamless order-ahead mobile experience.',
    metricsLabel: 'Store Tech',
    metricsValue: 'Real-Time Sync'
  },
  {
    id: 'brand',
    name: 'BRAND SUPPORT',
    iconName: 'ShieldCheck',
    role: 'Continuous Mentorship',
    details: 'Dedicated franchise business manager, architectural fit-out consultation, and quarterly business reviews.',
    metricsLabel: 'Partner Mentorship',
    metricsValue: 'Dedicated Manager'
  }
];

// 3D Outlet Hotspots
export interface OutletHotspot {
  id: string;
  title: string;
  area: string;
  position: [number, number, number];
  description: string;
  keyFeature: string;
}

export const OUTLET_HOTSPOTS: OutletHotspot[] = [
  {
    id: 'facade',
    title: 'Signature Storefront',
    area: 'Exterior & Entrance',
    position: [0, 2.2, 3.8],
    description: 'High-visibility arched glass facade featuring warm brass fixtures, forest green awnings, and backlit Green Bean crest.',
    keyFeature: 'Instant curb appeal that draws premium urban foot traffic.'
  },
  {
    id: 'counter',
    title: 'Artisan Display Counter',
    area: 'Patisserie Showcase',
    position: [-1.2, 1.1, 0.5],
    description: 'Temperature & humidity controlled museum-grade frameless glass cases highlighting daily cakes and pastries.',
    keyFeature: 'Designed for high visual impulse conversion and elegant queuing.'
  },
  {
    id: 'coffee',
    title: 'Specialty Coffee Bar',
    area: 'Beverage Bar',
    position: [1.3, 1.2, 0.4],
    description: 'Custom multi-boiler espresso workstation paired with flat-burr grinders for precision single-origin extraction.',
    keyFeature: 'High-speed morning service with theatrical craft.'
  },
  {
    id: 'lounge',
    title: 'Café Dining Lounge',
    area: 'Guest Seating Zone',
    position: [0, 0.6, -1.8],
    description: 'Bespoke cane-back dining chairs, fluted oak banquettes, acoustic baffles, and warm pendant drop lights.',
    keyFeature: 'Luxurious dwell time that drives higher average order values.'
  },
  {
    id: 'prep',
    title: 'Finishing & Prep Kitchen',
    area: 'Back-of-House',
    position: [-2.2, 1.4, -2.4],
    description: 'Stainless-steel assembly line for glaze finishing, plating, and rapid packaging dispatch.',
    keyFeature: 'Optimized ergonomic triangle minimizing staff fatigue.'
  }
];

// Products
export const PRODUCTS: Product[] = [
  {
    id: 'pecan-caramel-torte',
    name: 'Gourmet Salted Pecan Torte',
    category: 'signature',
    tagline: 'Dark Chocolate Sponge & Roasted Pecan Praline',
    description: 'Velvety Valrhona cocoa crumb layered with slow-cooked sea-salt caramel, toasted buttery Georgia pecans, and warm chocolate ganache drip.',
    notes: ['Salted Butter Caramel', 'Valrhona 70%', 'Toasted Pecans'],
    pairing: 'Green Bean Reserve Cold Brew',
    badge: 'Signature Hero'
  },
  {
    id: 'pistachio-rose-chiffon',
    name: 'Persian Pistachio & Rose Gateau',
    category: 'celebration',
    tagline: 'Sicilian Pistachio Cream & Damask Rose Water',
    description: 'Delicate olive oil chiffon soaked in cardamom syrup, layered with whipped Sicilian pistachio ganache and crystallized rose petals.',
    notes: ['Bronte Pistachio', 'Organic Rose Petals', 'Cardamom Essence'],
    pairing: 'Pour-Over Ethiopian Yirgacheffe',
    badge: 'Best Celebration'
  },
  {
    id: 'golden-croissant-supreme',
    name: 'Artisan Laminated Butter Croissant',
    category: 'pastries',
    tagline: '72-Layer Flaky French Viennoiserie',
    description: 'Cultured Normandy butter laminated across 72 micro-folds, baked to honeyed golden crispness with a honeycomb interior.',
    notes: ['Normandy AOP Butter', 'Slow Fermentation', 'Caramelized Flakes'],
    pairing: 'Double Cortado',
    badge: 'Morning Classic'
  },
  {
    id: 'matcha-yuzu-tart',
    name: 'Kyoto Ceremonial Matcha & Yuzu Tart',
    category: 'desserts',
    tagline: 'Uji Matcha Ganache with Citrus Yuzu Curd',
    description: 'Crisp almond sablé tart shell filled with tart Kochi yuzu curd, crowned with velvety bittersweet Uji ceremonial matcha cream.',
    notes: ['First-Harvest Matcha', 'Japanese Yuzu', 'Almond Sablé'],
    pairing: 'Sparkling Jasmine Tonic'
  },
  {
    id: 'green-bean-espresso',
    name: 'Estate Reserve Velvet Espresso',
    category: 'coffee',
    tagline: 'Direct-Trade Micro-Lot Roast',
    description: 'Full-bodied washed Arabica with tasting notes of milk chocolate praline, ripe yellow plum, and a lingering hazelnut finish.',
    notes: ['Dark Cocoa', 'Yellow Plum', 'Hazelnut Butter'],
    pairing: 'Pecan Caramel Torte',
    badge: 'Barista Choice'
  },
  {
    id: 'tiramisu-opera',
    name: 'Milano Mascarpone Opera Cake',
    category: 'signature',
    tagline: 'Espresso-Infused Joconde & Creamy Mascarpone',
    description: 'Classic Italian indulgence elevated with almond sponge drenched in Green Bean espresso, layered with whipped zabaglione cream and dusted with raw cocoa nibs.',
    notes: ['Fresh Mascarpone', 'Single-Origin Espresso', 'Dutch Cocoa Nibs'],
    pairing: 'Flat White'
  }
];

// Franchise Models
export const FRANCHISE_MODELS: FranchiseModel[] = [
  {
    id: 'flagship',
    title: 'Flagship Destination Cafe',
    format: 'Full Dine-in & Patisserie',
    footprint: '1,500 – 2,500 sq.ft.',
    idealLocation: 'Prime High-Street, Heritage Quarters, Luxury Lifestyle Malls',
    features: [
      'Comprehensive artisan bakery & dessert display counter',
      'Specialty brew bar with full barista station',
      'Comfortable seating for 45 – 70 guests with private nook seating',
      'Full seasonal breakfast, dessert, and afternoon tea service',
      'Dedicated pick-up & delivery dispatch counter'
    ],
    highlight: 'Highest revenue potential with prestigious community footprint.'
  },
  {
    id: 'boutique',
    title: 'High-Street Neighborhood Cafe',
    format: 'Curated Dine-in & Gifting',
    footprint: '800 – 1,400 sq.ft.',
    idealLocation: 'Upscale Residential Enclaves, Premium Urban Transit Hubs',
    features: [
      'Frontline cake showcase with signature celebration box gifting',
      'Espresso bar tuned for rapid takeaway and leisurely seating',
      'Comfortable seating for 20 – 35 guests',
      'Streamlined kitchen with daily fresh-baked delivery model',
      'High repeat community customer cadence'
    ],
    highlight: 'Balanced capital efficiency with steady high-margin daily orders.'
  },
  {
    id: 'express',
    title: 'Boutique Kiosk & Express',
    format: 'Quick Takeaway & Celebration Cakes',
    footprint: '350 – 700 sq.ft.',
    idealLocation: 'Airport Terminals, Corporate Tech Parks, Luxury Transit Concourses',
    features: [
      'Compact footprint with eye-catching illuminated 360° display',
      'Specialized grab-and-go coffee, viennoiserie, and signature tarts',
      'Pre-ordered celebration cake collection point',
      'Rapid turnaround design for maximum throughput',
      'Low staffing overhead requirement'
    ],
    highlight: 'Maximum foot-traffic capture with optimized initial setup.'
  }
];

// Franchise Journey
export const FRANCHISE_JOURNEY = [
  {
    step: '01',
    phase: 'EXPLORE',
    title: 'Discover Green Bean Cafe',
    desc: 'Immerse yourself in our aesthetic philosophy, taste the product caliber, and experience the cultural momentum of the brand in person.',
    action: 'Download Franchise Brochure',
    duration: 'Week 1'
  },
  {
    step: '02',
    phase: 'UNDERSTAND',
    title: 'Review The Opportunity',
    desc: 'Connect with our franchise expansion directors. Review tailored territory maps, store format models, and the comprehensive support ecosystem.',
    action: 'Initial Discovery Dialogue',
    duration: 'Week 2 – 3'
  },
  {
    step: '03',
    phase: 'TRUST',
    title: 'Site Selection & Due Diligence',
    desc: 'Our real estate team performs spatial footfall analysis on your prospective location while you attend our live store management shadowing session.',
    action: 'Territory Approval',
    duration: 'Week 4 – 5'
  },
  {
    step: '04',
    phase: 'APPLY',
    title: 'Academy Immersion & Launch',
    desc: 'Complete full franchise agreement, undertake Green Bean Academy masterclasses, receive turnkey fit-out support, and execute an unforgettable grand opening.',
    action: 'Grand Opening',
    duration: 'Week 6 – 10'
  }
];

// Sample Partner Stories
export const PARTNER_STORIES: PartnerStory[] = [
  {
    id: 'story-1',
    name: 'Aarav & Meera Mehta',
    city: 'Bandra West, Mumbai',
    format: 'Flagship Destination Cafe',
    quote: 'The customer response from day one was staggering. People treat Green Bean Cafe like their daily sacred ritual.',
    story: 'After corporate careers in finance and design, we wanted to build something tactile with timeless warmth. The operational blueprints, central pastry consistency, and architectural guidance made opening our flagship an exhilarating triumph.',
    background: 'Former Investment Banker & Interior Architect',
    avatarText: 'AM'
  },
  {
    id: 'story-2',
    name: 'Vikramaditya Kulkarni',
    city: 'Koregaon Park, Pune',
    format: 'High-Street Neighborhood Cafe',
    quote: 'The training at Green Bean Academy gave our barista and floor team genuine hospitality pride.',
    story: 'Pune has an exceptionally discerning cafe culture. Green Bean Cafe immediately stood apart because the dessert quality is truly five-star artisan level, while the branding feels friendly, luxurious, and deeply comforting.',
    background: 'Hospitality Entrepreneur',
    avatarText: 'VK'
  },
  {
    id: 'story-3',
    name: 'Rohit & Natasha Sen',
    city: 'Indiranagar, Bengaluru',
    format: 'Flagship Destination Cafe',
    quote: 'We have corporate tech leaders holding meetings by day, and families celebrating birthdays every single evening.',
    story: 'What surprised us most was the gifting and celebration cake demand. During festivals and weekends, our pre-orders completely booked our pastry display 48 hours in advance.',
    background: 'Tech Founders turned F&B Investors',
    avatarText: 'RN'
  }
];

// Sample City Presence (Illustrative Target Expansion Hubs)
export const CITIES_PRESENCE: CityPresence[] = [
  {
    id: 'mumbai',
    name: 'Mumbai',
    tagline: 'Financial & Cultural Epicenter',
    status: 'Flagship Hub',
    coordinates: [18.922, 72.834],
    storeFormats: ['Flagship Cafe (Bandra)', 'Boutique (Juhu)', 'Express (BKC)'],
    vibe: 'High-density luxury retail, vibrant celebration culture & elite gifting demand.'
  },
  {
    id: 'pune',
    name: 'Pune',
    tagline: 'Heritage & Contemporary Cafe Connoisseurs',
    status: 'Upcoming Outlets',
    coordinates: [18.520, 73.856],
    storeFormats: ['High-Street Cafe (Koregaon Park)', 'Boutique (Kalyani Nagar)'],
    vibe: 'Passionate coffee community, artistic dwell time, and artisan brunch preference.'
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru',
    tagline: 'Innovation & Cosmopolitan Pulse',
    status: 'Flagship Hub',
    coordinates: [12.971, 77.594],
    storeFormats: ['Flagship (Indiranagar)', 'Boutique (Koramangala)', 'Tech Hub Express'],
    vibe: 'High discretionary spend, digital-first ordering, and round-the-clock cafe culture.'
  },
  {
    id: 'delhi',
    name: 'Delhi NCR',
    tagline: 'Grand Celebrations & Capital Sophistication',
    status: 'Metropolitan Zone',
    coordinates: [28.613, 77.209],
    storeFormats: ['Flagship (Khan Market)', 'Luxury Mall Store (Golf Course Rd)'],
    vibe: 'Unrivaled gourmet gifting volume, grand celebration cake orders, and social prestige.'
  }
];

// FAQs
export const FAQS: FAQItem[] = [
  {
    question: 'What defines the Green Bean Cafe franchise opportunity?',
    answer: 'Green Bean Cafe is a premium artisan patisserie, specialty coffee, and contemporary cafe concept designed for scalable growth. Franchise partners receive a fully documented operating system, centralized high-grade ingredient supply, architectural guidelines, and dedicated marketing engines.',
    category: 'General'
  },
  {
    question: 'Who is an ideal Green Bean Cafe franchise candidate?',
    answer: 'We seek passionate entrepreneurs, hospitality groups, or experienced business leaders who share our obsession with quality, aesthetics, and heartfelt guest experiences. While prior F&B experience is valued, our comprehensive Green Bean Academy equips qualified business minds with complete operational mastery.',
    category: 'Requirements'
  },
  {
    question: 'What comprehensive support does the franchisor provide?',
    answer: 'Partners receive end-to-end guidance including site feasibility evaluation, 3D store layout blueprints, equipment procurement, 4 weeks of hands-on academy training, cold-chain supply access, cloud tech integration, grand opening PR, and ongoing quarterly operational reviews.',
    category: 'Support'
  },
  {
    question: 'What space and location specifications are required?',
    answer: 'Requirements vary by format: Boutique Kiosks need 350–700 sq.ft., High-Street Cafes need 800–1,400 sq.ft., and Flagship Destination Cafes need 1,500–2,500 sq.ft. Preferred locations have high footfall, strong visibility, affluent residential catchments, or luxury retail adjacency.',
    category: 'Requirements'
  },
  {
    question: 'How does Green Bean Cafe maintain consistent artisan pastry quality?',
    answer: 'We utilize a proprietary hybrid commissary and on-site finishing model. Base doughs, signature glazes, and proprietary recipes are standardized through temperature-controlled supply chains, while final baking, lamination, and fresh fruit assembly occur freshly at each cafe.',
    category: 'Support'
  },
  {
    question: 'What happens after I submit a franchise enquiry?',
    answer: 'Our franchise development team will review your application within 48 business hours. If your preferred city and profile align with our strategic expansion map, an introductory discovery call will be scheduled to discuss territory availability and store formats.',
    category: 'Process'
  },
  {
    question: 'Can I secure multi-unit or territorial development rights?',
    answer: 'Yes. Qualified partners demonstrating operational capacity and local market insight may apply for multi-unit territory agreements to develop a cluster of outlets across an entire metropolitan sector.',
    category: 'Process'
  }
];
