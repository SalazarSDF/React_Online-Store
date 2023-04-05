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

export type TProductItems = {
  products: TProductItem[];
  limit: number;
  skip: number;
  total: number;
};


export type TFilterContextType = {
  filterOptions: TFilterOptions;
  setFilterOptions:
    | React.Dispatch<React.SetStateAction<TFilterOptions>>
    | (() => void);
};

export type TFilterOptions = {
  category: string[];
  brand: string[];
  price: [number, number];
  stock: [number, number];
};
