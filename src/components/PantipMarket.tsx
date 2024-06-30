'use client';

import React, { useEffect } from 'react';
import { create } from 'zustand';

import { getPantipMarket } from '../app/[locale]/(unauth)/api/room/getPantipmarket';

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
  <div className="overflow-hidden rounded-lg bg-gray-800 shadow-lg">
    <div className="h-48 animate-pulse bg-gray-600" />
    <div className="p-4">
      <div className="mb-2 h-6 w-3/4 animate-pulse rounded bg-gray-600" />
      <div className="h-4 w-1/2 animate-pulse rounded bg-gray-600" />
    </div>
  </div>
);

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <a
    href={product.url}
    className="block overflow-hidden rounded-lg bg-gray-800 shadow-lg transition-shadow duration-300 hover:shadow-xl"
  >
    <div className="relative h-48 bg-gray-700">
      <img
        src={product.thumbnail_url}
        alt={product.title}
        className="size-full object-contain"
      />
      {product.group_name && (
        <span className="absolute left-2 top-2 rounded-full bg-[#fbc02d] px-2 py-1 text-xs font-semibold text-[#53507c]">
          {product.group_name}
        </span>
      )}
    </div>
    <div className="p-4">
      <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-white">
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
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-[#fbc02d]">Pantip Market</h2>
        <a
          href="https://www.pantipmarket.com/"
          className="rounded-full bg-[#fbc02d] px-6 py-2 text-sm font-semibold text-[#53507c] transition-colors hover:bg-[#fbc02d]/80"
        >
          ดูทั้งหมด
        </a>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {isLoading
          ? skeletonIds.map((id) => <SkeletonProduct key={id} />)
          : products.map((product) => (
              <ProductCard key={product.url} product={product} />
            ))}
      </div>
    </div>
  );
};

export default PantipMarketProducts;
