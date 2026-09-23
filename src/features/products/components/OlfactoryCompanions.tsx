"use client";

import { ProductCard } from "@/features/products/components/ProductCard";
import { useProducts } from "@/features/products/hooks/useProducts";
import type { Product } from "@/features/products/types/product.types";

type OlfactoryCompanionsProps = {
  currentProductId: string;
};

export function OlfactoryCompanions({
  currentProductId,
}: OlfactoryCompanionsProps) {
  const { data, isLoading } = useProducts();

  const companions: Product[] = (data?.items ?? [])
    .filter((p) => p.id !== currentProductId)
    .slice(0, 4);

  if (isLoading || companions.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-[#f4f1ea] px-4 py-16 sm:px-6 md:px-10 lg:px-20 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-10 text-center sm:mb-14">
          <h2 className="font-[family-name:var(--font-instrument-serif)] text-[34px] sm:text-[44px] text-[#1a1a1a]">
            Olfactory Companions
          </h2>
          <p className="mt-2 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.25em] text-[#78716c]">
            Fragrances of synonymous sophistication
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {companions.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
