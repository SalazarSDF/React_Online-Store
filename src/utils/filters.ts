import { TProductItem } from "./types";
import { TFilterOptions } from "./types";

function sortProducts(
  sortBy: string,
  products: TProductItem[]
): TProductItem[] {
  if (sortBy === "MIN price") {
    return products.sort((a, b) => a.price - b.price);
  } else if (sortBy === "MAX price") {
    return products.sort((a, b) => b.price - a.price);
  } else if (sortBy === "MIN stock") {
    return products.sort((a, b) => a.stock - b.stock);
  } else if (sortBy === "MAX stock") {
    return products.sort((a, b) => b.stock - a.stock);
  } else {
    throw new Error(
      'sortBy should be = "MIN price" | "MAX price" | "MIN stock" | "MAX stock"'
    );
  }
}

function filterProducts(
  products: TProductItem[],
  filterOptions: TFilterOptions
) {
  const { category, brand, price, stock, sortBy } = filterOptions;
  let filteredProducts = [...products];
  if (category && category.length !== 0) {
    filteredProducts = filteredProducts.filter((product) =>
      category.includes(product.category)
    );
  }
  if (brand && brand.length !== 0) {
    filteredProducts = filteredProducts.filter((product) =>
      brand.includes(product.brand)
    );
  }
  if (price && price.length === 2) {
    const [minPrice, maxPrice] = price;
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );
  }
  if (stock && stock.length === 2) {
    const [minStock, maxStock] = stock;
    filteredProducts = filteredProducts.filter(
      (product) => product.stock >= minStock && product.stock <= maxStock
    );
  }
  if (sortBy) {
    filteredProducts = sortProducts(sortBy, products);
  }

  return filteredProducts;
}
export { filterProducts };

////////// sleep
//console.log('start wait')
//await new Promise((resolve) => setTimeout(resolve, 4000));
//console.log('finish wait')
////////// sleep
