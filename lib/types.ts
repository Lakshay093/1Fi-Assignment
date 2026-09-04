export interface Variant {
  id: string;
  productId: string;
  title: string;
  color: string;
  colorHex: string;
  storage: string;
  price: number;
  mrp: number;
  image: string;
  inStock: boolean;
  sku: string;
}

export interface EmiPlan {
  id: string;
  productId: string;
  tenureMonths: number;
  interestRate: number;
  cashbackAmount: number;
  isZeroInterest: boolean;
  isPopular: boolean;
  monthlyAmount?: number; // Calculated dynamically based on variant price
  totalPayable?: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  subtitle?: string | null;
  description: string;
  rating: number;
  reviewCount: number;
  isNew: boolean;
  variants: Variant[];
  emiPlans: EmiPlan[];
}

export interface OrderPayload {
  variantSku: string;
  tenureMonths: number;
  customerName: string;
  customerEmail: string;
}
