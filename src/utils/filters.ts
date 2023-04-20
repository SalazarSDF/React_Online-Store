import { TProductItem } from "./types";
import { TFilterOptions } from "./types";

// function findMinMaxPrice(products: TProductItem[]): {
//   totalMinMaxPrice: [number, number];
//   totalMinMaxStock: [number, number];
// } {
//   const totalMinPrice = products.reduce(
//     (min, el) => (el.price < min ? el.price : min),
//     Infinity
//   );
//   const totalMaxPrice = products.reduce(
//     (max, el) => (el.price > max ? el.price : max),
//     0
//   );

//   const totalMinStock = products.reduce(
//     (min, el) => (el.stock < min ? el.stock : min),
//     Infinity
//   );
//   const totalMaxStock = products.reduce(
//     (max, el) => (el.stock > max ? el.stock : max),
//     0
//   );

//   return {
//     totalMinMaxPrice: [totalMinPrice, totalMaxPrice],
//     totalMinMaxStock: [totalMinStock, totalMaxStock],
//   };
// }

function filterProducts(
  products: TProductItem[],
  filterOptions: TFilterOptions
) {
  const { category, brand, price, stock } = filterOptions;
  let filteredProducts = [...products];
  console.log(
    `category${Boolean(category)} brand${Boolean(brand)} price${Boolean(
      price
    )} stock${Boolean(stock)}`
  );
  if (category) {
    filteredProducts = filteredProducts.filter((product) =>
      category.includes(product.category)
    );
  }
  if (brand) {
    filteredProducts = filteredProducts.filter((product) =>
      brand.includes(product.brand)
    );
  }
  if (price) {
    const [minPrice, maxPrice] = price;
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );
  }
  if (stock) {
    const [minStock, maxStock] = stock;
    filteredProducts = filteredProducts.filter(
      (product) => product.stock >= minStock && product.stock <= maxStock
    );
  }
  return filteredProducts;
}
export { filterProducts };

////////// sleep
//console.log('start wait')
//await new Promise((resolve) => setTimeout(resolve, 4000));
//console.log('finish wait')
////////// sleep
