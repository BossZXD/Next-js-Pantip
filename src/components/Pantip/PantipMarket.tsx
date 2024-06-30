'use client';

import React, { useEffect } from 'react';
import { create } from 'zustand';

import { getPantipMarket } from '../../app/[locale]/(unauth)/api/room/getPantipmarket';

interface Product {
  title: string;
  thumbnail_url: string;
  url: string;
  group_name: string;
  group_url: string;
  group_title: string;
}

interface ProductsState {
  products: Product[];
  isLoading: boolean;
  setProducts: (products: Product[]) => void;
  setLoading: (isLoading: boolean) => void;
  fetchProducts: () => Promise<void>;
}

const useProductStore = create<ProductsState>((set) => ({
  products: [],
  isLoading: true,
  setProducts: (products) => set({ products }),
  setLoading: (isLoading) => set({ isLoading }),
  fetchProducts: async () => {
    set({ isLoading: true });
    try {
      const result = await getPantipMarket();
      const productsArray = result.data;
      const limitedProducts = productsArray.slice(0, 4);
      set({ products: limitedProducts, isLoading: false });
    } catch (error) {
      console.error('Error fetching products:', error);
      set({ products: [], isLoading: false });
    }
  },
}));

const SkeletonProduct: React.FC = () => (
  <div className="overflow-hidden rounded-xl bg-gray-800 shadow-lg transition-all duration-300 hover:shadow-2xl">
    <div className="h-56 animate-pulse bg-gray-700" />
    <div className="p-5">
      <div className="mb-3 h-6 w-3/4 animate-pulse rounded bg-gray-700" />
      <div className="h-4 w-1/2 animate-pulse rounded bg-gray-700" />
    </div>
  </div>
);

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <a
    href={product.url}
    className="group block overflow-hidden rounded-xl bg-gray-800 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
  >
    <div className="relative h-56 bg-gray-700 overflow-hidden">
      <img
        src={product.thumbnail_url}
        alt={product.title}
        className="size-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
      {product.group_name && (
        <span className="absolute left-3 top-3 rounded-full bg-[#fbc02d] px-3 py-1 text-xs font-semibold text-[#53507c] shadow-md">
          {product.group_name}
        </span>
      )}
    </div>
    <div className="p-5">
      <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-white group-hover:text-[#fbc02d] transition-colors duration-300">
        {product.title}
      </h3>
    </div>
  </a>
);

const PantipMarketProducts: React.FC = () => {
  const { products, isLoading, fetchProducts } = useProductStore();
  const skeletonIds = Array.from(
    { length: 4 },
    (_, i) => `skeleton-${i}-${Date.now()}`,
  );

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="w-full bg-gradient-to-br from-[#53507c] to-[#3f3d5e] mt-6 rounded-lg">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 p-8 rounded-3xl bg-white/10 backdrop-blur-md shadow-2xl">
          <div className="flex items-center pb-6">
            <h2 className="text-3xl font-bold text-white">
              Pantip Market
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {isLoading
              ? skeletonIds.map((id) => <SkeletonProduct key={id} />)
              : products.map((product) => (
                  <ProductCard key={product.url} product={product} />
                ))}
          </div>
          <div className="mt-8 text-center">
            <a
              href="https://www.pantipmarket.com/"
              className="inline-block rounded-full bg-white/10 px-6 py-3 text-sm font-medium text-white transition-colors duration-300 hover:bg-white/20"
            >
              แสดงเพิ่มเติม
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PantipMarketProducts;