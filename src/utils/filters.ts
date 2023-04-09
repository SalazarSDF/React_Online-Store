import { TProductItem } from "./types";
import { TFilterOptions } from "./types";

// const filterByCategory = (filterOptions: string[], products: ProductItem[]) => {
//   if (!products && filterOptions.length === 0) {
//     throw new Error("it's should be impossible");
//   }
//   const filteredProducts = products.filter((el) =>
//     filterOptions.includes(el.category)
//   );
//   return filteredProducts;
// };
function findMinMaxPrice(products: TProductItem[]): {
  totalMinMaxPrice: [number, number];
  totalMinMaxStock: [number, number];
} {
  const totalMinPrice = products.reduce(
    (min, el) => (el.price < min ? el.price : min),
    Infinity
  );
  const totalMaxPrice = products.reduce(
    (max, el) => (el.price > max ? el.price : max),
    0
  );

  const totalMinStock = products.reduce(
    (min, el) => (el.stock < min ? el.stock : min),
    Infinity
  );
  const totalMaxStock = products.reduce(
    (max, el) => (el.stock > max ? el.stock : max),
    0
  );

  return {
    totalMinMaxPrice: [totalMinPrice, totalMaxPrice],
    totalMinMaxStock: [totalMinStock, totalMaxStock],
  };
}

async function filterProducts(
  products: TProductItem[],
  filterOptions: TFilterOptions
) {
  const { category, brand, price, stock } = filterOptions;
  const [minPrice, maxPrice] = price;
  const [minStock, maxStock] = stock;
  const { totalMinMaxPrice, totalMinMaxStock } = findMinMaxPrice(products);
  let filteredProducts = [...products];
  if (category.length) {
    filteredProducts = filteredProducts.filter((product) =>
      category.includes(product.category)
    );
  }
  if (brand.length) {
    filteredProducts = filteredProducts.filter((product) =>
      brand.includes(product.brand)
    );
  }
  if (minPrice !== 0 || maxPrice !== Infinity) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );
  }
  if (minStock !== 0 || maxStock !== Infinity) {
    filteredProducts = filteredProducts.filter(
      (product) => product.stock >= minStock && product.stock <= maxStock
    );
  }
  return Promise.resolve({
    products: filteredProducts,
    totalMinMaxPrice,
    totalMinMaxStock,
  });
}
export { filterProducts };

////////// sleep
//console.log('start wait')
//await new Promise((resolve) => setTimeout(resolve, 4000));
//console.log('finish wait')
////////// sleep
