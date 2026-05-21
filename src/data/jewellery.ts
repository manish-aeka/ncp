import ring from "@/assets/j-ring-1.jpg";
import necklace from "@/assets/j-necklace-1.jpg";
import earrings from "@/assets/j-earrings-1.jpg";
import bracelet from "@/assets/j-bracelet-1.jpg";
import pendant from "@/assets/j-pendant-1.jpg";
import set from "@/assets/j-set-1.jpg";
import bangle from "@/assets/j-bangle-1.jpg";

export type Category =
  | "Gold"
  | "Platinum"
  | "Silver"
  | "Diamond"
  | "Gemstone"
  | "Sets";

export const CATEGORIES: Category[] = [
  "Gold",
  "Platinum",
  "Silver",
  "Diamond",
  "Gemstone",
  "Sets",
];

export type Product = {
  id: string;
  name: string;
  category: Category;
  material: string;
  stone: string;
  stoneColor: string;
  purity: string;
  weight: number; // grams
  price: number; // INR
  style: string;
  image: string;
  description: string;
  tags: string[];
};

export const PRODUCTS: Product[] = [
  {
    id: "p-001",
    name: "Aurora Solitaire Ring",
    category: "Diamond",
    material: "18K Gold",
    stone: "Diamond",
    stoneColor: "White",
    purity: "VS1",
    weight: 3.4,
    price: 124000,
    style: "Solitaire",
    image: ring,
    description:
      "A timeless brilliant-cut solitaire set in warm 18K gold — designed to catch every angle of light.",
    tags: ["bridal", "engagement", "classic"],
  },
  {
    id: "p-002",
    name: "Rubina Drop Necklace",
    category: "Gemstone",
    material: "22K Gold",
    stone: "Ruby",
    stoneColor: "Red",
    purity: "22K",
    weight: 8.1,
    price: 78500,
    style: "Pendant",
    image: necklace,
    description:
      "A teardrop ruby suspended on a fine gold chain. A statement of quiet confidence.",
    tags: ["festive", "ruby", "gift"],
  },
  {
    id: "p-003",
    name: "Lumière Diamond Studs",
    category: "Diamond",
    material: "18K Gold",
    stone: "Diamond",
    stoneColor: "White",
    purity: "VVS",
    weight: 1.8,
    price: 56000,
    style: "Stud",
    image: earrings,
    description: "Everyday brilliance — four-prong studs cut for maximum sparkle.",
    tags: ["everyday", "minimal"],
  },
  {
    id: "p-004",
    name: "Eternity Tennis Bracelet",
    category: "Platinum",
    material: "Platinum 950",
    stone: "Diamond",
    stoneColor: "White",
    purity: "PT950",
    weight: 12.5,
    price: 312000,
    style: "Tennis",
    image: bracelet,
    description: "A continuous line of round brilliants in a refined platinum setting.",
    tags: ["luxury", "anniversary"],
  },
  {
    id: "p-005",
    name: "Verdé Emerald Pendant",
    category: "Silver",
    material: "Sterling Silver 925",
    stone: "Emerald",
    stoneColor: "Green",
    purity: "925",
    weight: 2.2,
    price: 14500,
    style: "Pendant",
    image: pendant,
    description: "An emerald-cut emerald in sterling silver. Modern, architectural.",
    tags: ["minimal", "everyday"],
  },
  {
    id: "p-006",
    name: "Maharani Bridal Set",
    category: "Sets",
    material: "22K Gold",
    stone: "Ruby & Diamond",
    stoneColor: "Red",
    purity: "22K",
    weight: 86,
    price: 985000,
    style: "Bridal",
    image: set,
    description:
      "A heritage bridal ensemble — necklace, earrings, and matched bangles in 22K gold with rubies.",
    tags: ["bridal", "set", "heritage"],
  },
  {
    id: "p-007",
    name: "Rosé Slim Bangle",
    category: "Gold",
    material: "14K Rose Gold",
    stone: "—",
    stoneColor: "—",
    purity: "14K",
    weight: 5.4,
    price: 42000,
    style: "Bangle",
    image: bangle,
    description: "A whisper-thin rose gold bangle. Made to stack, made to wear forever.",
    tags: ["everyday", "stackable"],
  },
];

export function getProduct(id: string) {
  return PRODUCTS.find((p) => p.id === id);
}

export function formatINR(n: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}
