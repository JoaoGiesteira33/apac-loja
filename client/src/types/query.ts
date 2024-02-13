import { DocumentSnapshot } from 'firebase/firestore';

export type ProductQuery = {
  available?: boolean;
  seller?: string;
  limit?: number;
  featured?: boolean;
  minPrice?: number;
  maxPrice?: number;
  productTypes?: string[];
  orderBy?: string;
  startAt?: DocumentSnapshot;
};

export type SellerQuery = {
  limit?: number;
  role: 'seller';
  startAt?: DocumentSnapshot;
  orderBy?: string;
};
