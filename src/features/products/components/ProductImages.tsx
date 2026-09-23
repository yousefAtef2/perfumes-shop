"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/features/products/types/product.types";
import { cn } from "@/lib/utils/cn";

type ProductImagesProps = {
  product: Product;
};

/** US-04: product image gallery. */
export function ProductImages({ product }: ProductImagesProps) {
  const images = product.images.length > 0 ? product.images : [];
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex aspect-[4/5] w-full items-center justify-center rounded-sm bg-[#ebe6de] text-[#605a54]">
        No product images yet
      </div>
    );
  }

  const activeImage = images[selectedIndex] ?? images[0];

  return (
    <div className="flex w-full flex-col gap-3 sm:gap-4">
      {/* Main Hero Image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-sm bg-[#f2eee7] shadow-sm sm:aspect-[4/5] lg:aspect-square">
        <Image
          src={activeImage}
          alt={product.name}
          fill
          priority
          className="object-cover transition-opacity duration-300"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      </div>

      {/* Thumbnails row */}
      {images.length > 1 && (
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {images.slice(1, 4).map((thumb, index) => {
            const actualIndex = index + 1;
            const isSelected = selectedIndex === actualIndex;
            return (
              <button
                key={thumb}
                type="button"
                onClick={() => setSelectedIndex(actualIndex)}
                className={cn(
                  "group relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-[#f2eee7] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a1a1a]",
                  isSelected
                    ? "ring-2 ring-[#1a1a1a] shadow-sm opacity-100"
                    : "opacity-80 hover:opacity-100 border border-[#ebe6de]",
                )}
                aria-label={`View image ${actualIndex + 1} of ${product.name}`}
              >
                <Image
                  src={thumb}
                  alt={`${product.name} thumbnail ${actualIndex}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(min-width: 1024px) 15vw, 30vw"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

