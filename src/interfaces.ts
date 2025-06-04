import { Decimal } from "@prisma/client/runtime/library";

export interface Product {
  id: string;
  name: string;
  price: Decimal;
  images: string[];
}

export interface CartItem {
  product: Product;
  qty: number;
}
