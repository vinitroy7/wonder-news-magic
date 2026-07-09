export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  age: string;
  rating: number;
  description: string;
  emoji: string;
  color: string;
};

export const products: Product[] = [
  { id: "p1", name: "Printed Newspaper Bundle", price: 24, category: "Newspaper", age: "6-12", rating: 4.9, description: "12 issues of our flagship monthly newspaper — delivered to your door.", emoji: "📰", color: "bg-primary/15" },
  { id: "p2", name: "Adventure Activity Book", price: 14, category: "Activity", age: "5-9", rating: 4.8, description: "80 pages of mazes, drawings, and story prompts.", emoji: "🎨", color: "bg-sunny/25" },
  { id: "p3", name: "Curio Kids Magazine", price: 9, category: "Magazine", age: "8-12", rating: 4.7, description: "Long-form stories, interviews and world news for curious kids.", emoji: "📖", color: "bg-mint/25" },
  { id: "p4", name: "Rainbow Coloring Book", price: 8, category: "Activity", age: "3-7", rating: 4.9, description: "60 illustrated pages featuring animals, space and cities.", emoji: "🖍️", color: "bg-bubble/50" },
  { id: "p5", name: "Educational Wall Posters (Set of 6)", price: 19, category: "Posters", age: "4-12", rating: 4.6, description: "Solar system, dinosaurs, human body, world map, alphabet & numbers.", emoji: "🪐", color: "bg-grape/15" },
  { id: "p6", name: "Puzzle Book: Brain Boost", price: 12, category: "Activity", age: "7-12", rating: 4.8, description: "Sudoku, crosswords, logic puzzles and riddles.", emoji: "🧩", color: "bg-leaf/40" },
  { id: "p7", name: "Back-to-School Kit", price: 39, category: "School", age: "5-10", rating: 5.0, description: "Notebook, pencils, stickers, ruler set and a surprise comic.", emoji: "🎒", color: "bg-sky/60" },
  { id: "p8", name: "Comic Strips Collection", price: 15, category: "Magazine", age: "7-12", rating: 4.7, description: "The best comic strips from a whole year of the paper.", emoji: "💥", color: "bg-primary/20" },
];

export const categories = [
  { name: "Science", emoji: "🔬", color: "bg-mint" },
  { name: "Sports", emoji: "⚽", color: "bg-sunny" },
  { name: "Environment", emoji: "🌱", color: "bg-leaf" },
  { name: "Technology", emoji: "🤖", color: "bg-grape text-white" },
  { name: "Animals", emoji: "🐼", color: "bg-bubble" },
  { name: "Space", emoji: "🚀", color: "bg-sky" },
  { name: "History", emoji: "🏛️", color: "bg-primary/30" },
  { name: "Art", emoji: "🎨", color: "bg-secondary" },
  { name: "Comics", emoji: "💥", color: "bg-sunny/70" },
];

export const benefits = [
  { title: "Age-Appropriate News", desc: "Every story is written and reviewed for young readers.", emoji: "📰", color: "bg-primary/15" },
  { title: "Educational Stories", desc: "Learn about the world through fun, curated narratives.", emoji: "📚", color: "bg-mint/25" },
  { title: "Science Experiments", desc: "Hands-on activities to try safely at home.", emoji: "🧪", color: "bg-grape/15" },
  { title: "Fun Activities", desc: "Crafts, DIYs and outdoor adventures every week.", emoji: "🎯", color: "bg-sunny/30" },
  { title: "Comics & Cartoons", desc: "Original characters kids love to follow.", emoji: "💥", color: "bg-bubble/60" },
  { title: "Puzzles & Games", desc: "Brain teasers that make learning addictive.", emoji: "🧩", color: "bg-leaf/40" },
  { title: "Quiz Corner", desc: "Weekly quizzes with prizes for top players.", emoji: "🏆", color: "bg-sky/60" },
  { title: "Safe & Ad-Free", desc: "A screen-free experience parents can trust.", emoji: "🛡️", color: "bg-secondary/40" },
];

export const testimonials = [
  { name: "Priya S.", role: "Parent of 3", text: "My kids fight over who gets to read it first. Worth every rupee!", emoji: "👩" },
  { name: "Mr. Kumar", role: "Teacher, Grade 5", text: "I use the science section in class every week. Incredibly well-researched.", emoji: "👨‍🏫" },
  { name: "Aarav, 9", role: "Student", text: "The comics are AWESOME and I learned about black holes!", emoji: "🧒" },
  { name: "Ravi & Neha", role: "Parents", text: "Our daughter now asks for the newspaper before her tablet.", emoji: "👨‍👩‍👧" },
  { name: "Ms. Fernandes", role: "Librarian", text: "The best children's publication I've seen in twenty years.", emoji: "👩‍🏫" },
];

export type Plan = {
  name: string;
  tagline: string;
  emoji: string;
  duration: string;
  editions: string;
  price: number;
  originalPrice?: number;
  discount: string;
  period: string;
  features: string[];
  color: string;
  accent: string;
  popular?: boolean;
  badge?: string;
  footnote?: string;
};

export const plans: Plan[] = [
  {
    name: "Wonder Explorer Starter",
    tagline: "Perfect for families starting their Wonder journey.",
    emoji: "🌱",
    duration: "6 Months",
    editions: "6 Monthly Learning Editions",
    price: 996,
    discount: "10% OFF",
    period: "/6 months",
    features: [
      "6 Wonder Sprouts Learning Editions",
      "Wonder Explorer Welcome Kit",
      "Wonder Explorer Badge",
      "Digital Achievement Certificates",
      "Monthly Challenges & Fun Contests",
      "QR Code Interactive Learning",
      "Parent Activity Guide",
      "FREE Home Delivery",
    ],
    color: "bg-mint/20",
    accent: "bg-mint",
    popular: false,
  },
  {
    name: "Wonder Explorer Premium",
    tagline: "Everything in Starter, plus premium perks and a graduation kit.",
    emoji: "⭐",
    duration: "12 Months",
    editions: "12 Monthly Learning Editions",
    price: 1439,
    originalPrice: 1599,
    discount: "10% OFF",
    period: "/year",
    features: [
      "12 Wonder Sprouts Learning Editions",
      "Exclusive Wonder Explorer Passport",
      "Wonder Explorer Badge Collection",
      "Printed Achievement Certificates",
      "Hall of Fame Eligibility",
      "FREE Craft Activity Book",
      "FREE 2 Master Practice Copies",
      "Annual Wonder Graduation Kit 🎓",
      "Exciting Contests, Rewards & Recognition",
      "FREE Home Delivery",
    ],
    color: "bg-primary/15",
    accent: "bg-primary",
    popular: true,
    badge: "⭐ MOST POPULAR",
  },
  {
    name: "Wonder Explorer Elite",
    tagline: "Our best value — two full years of wonder, rewards and recognition.",
    emoji: "👑",
    duration: "2 Years",
    editions: "24 Monthly Learning Editions",
    price: 2558,
    originalPrice: 3198,
    discount: "20% OFF",
    period: "/2 years",
    features: [
      "24 Wonder Sprouts Learning Editions",
      "Premium Wonder Explorer Passport",
      "Complete Wonder Badge Collection",
      "24 Printed Achievement Certificates",
      "Priority Hall of Fame Recognition",
      "Premium Craft Activity Book",
      "FREE 6 Master Practice Copies",
      "Premium Annual Wonder Graduation Kit 🎓",
      "Exclusive Member Gifts & Surprise Rewards",
      "Member-Only Bonus Activities & Printables",
      "Priority Contest Participation",
      "FREE Home Delivery for 24 Months",
    ],
    color: "bg-grape/15",
    accent: "bg-grape",
    popular: false,
    badge: "👑 BEST VALUE",
  },
];


export const faqs = [
  { q: "What age group is this for?", a: "Our content is crafted for children aged 5-12, with sections tailored to each reading level." },
  { q: "Do you ship internationally?", a: "Yes! We ship worldwide with tracked delivery. International orders take 7-14 days." },
  { q: "Can I cancel anytime?", a: "Absolutely. Monthly plans can be cancelled from your account with a single click." },
  { q: "Is there a digital-only option?", a: "Yes — every plan includes digital access, and we offer digital-only pricing on request." },
  { q: "Is the content ad-free?", a: "100%. We never run third-party ads. Your subscription is our only income source." },
];

export const videos = [
  { id: "v1", title: "Why do stars twinkle?", cat: "Science", duration: "4:12", emoji: "⭐" },
  { id: "v2", title: "The story of paper airplanes", cat: "Stories", duration: "6:05", emoji: "✈️" },
  { id: "v3", title: "Build a volcano at home", cat: "Craft", duration: "8:30", emoji: "🌋" },
  { id: "v4", title: "This week in the world", cat: "Current Affairs", duration: "5:45", emoji: "🌍" },
  { id: "v5", title: "10 wild facts about octopuses", cat: "Fun Facts", duration: "3:22", emoji: "🐙" },
  { id: "v6", title: "How does a rainbow form?", cat: "Learning", duration: "4:58", emoji: "🌈" },
];

export const videoCategories = ["All", "Learning", "Science", "Stories", "Craft", "Current Affairs", "Fun Facts"];
