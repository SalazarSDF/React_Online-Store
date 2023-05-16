export type TShopCartProductItem = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  quantity: number;
};

export type TProductItem = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

export type TClient = {
  products: TProductItem[];
  limit: number;
  skip: number;
  total: number;
};

export type TFilterOptions = {
  category?: string[];
  brand?: string[];
  price?: [number, number];
  stock?: [number, number];
  query?: string;
  sortBy?: string;
};
