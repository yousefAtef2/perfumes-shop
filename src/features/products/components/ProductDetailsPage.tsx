"use client";

import { useMemo, useState, type ReactNode } from "react";
import { OlfactoryCompanions } from "@/features/products/components/OlfactoryCompanions";
import { ProductBreadcrumbs } from "@/features/products/components/ProductBreadcrumbs";
import {
  ProductDetailsHeader,
  ProductScentAnatomy,
} from "@/features/products/components/ProductDetails";
import { ProductImages } from "@/features/products/components/ProductImages";
import { ProductOptions } from "@/features/products/components/ProductOptions";
import { useProduct } from "@/features/products/hooks/useProduct";
import type { Product } from "@/features/products/types/product.types";

export type ProductDetailsActionsContext = {
  product: Product;
  selectedOptions: Record<string, string>;
  selectedVolume: string;
  currentPrice: number;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  giftWrapping: boolean;
};

type ProductDetailsPageProps = {
  productId: string;
  actions?: (context: ProductDetailsActionsContext) => ReactNode;
};

export function ProductDetailsPage({
  productId,
  actions,
}: ProductDetailsPageProps) {
  const productQuery = useProduct(productId);
  const product = productQuery.data;

  // Volumes
  const initialVolume = useMemo(() => {
    if (!product?.volumeOptions || product.volumeOptions.length === 0) {
      return { size: "100 ml", price: product?.price ?? 220 };
    }
    // Default to the 100ml option or last option
    const hundredMl = product.volumeOptions.find((v) => v.size === "100 ml");
    return hundredMl ?? product.volumeOptions[product.volumeOptions.length - 1];
  }, [product]);

  const [selectedVolume, setSelectedVolume] = useState<string>("");
  const [selectedPrice, setSelectedPrice] = useState<number>(0);
  const [giftWrapping, setGiftWrapping] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [customOptions, setCustomOptions] = useState<Record<string, string>>({});

  // Synchronize initial volume when product loads
  const currentVolume = selectedVolume || initialVolume.size;
  const currentPrice = selectedPrice || initialVolume.price;

  const resolvedOptions = useMemo(() => {
    const opts: Record<string, string> = {
      Volume: currentVolume,
      ...customOptions,
    };
    if (giftWrapping) {
      opts["Gift Wrapping"] = "Signature Box";
    }
    return opts;
  }, [currentVolume, customOptions, giftWrapping]);

  if (productQuery.isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center bg-[#faf8f5]">
        <p className="text-sm font-medium tracking-wider text-[#605a54] uppercase">
          Loading fragrance...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 bg-[#faf8f5]">
        <p className="text-base text-[#605a54]">Fragrance not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1a1a1a]">
      {/* Breadcrumbs */}
      <ProductBreadcrumbs productName={product.name} />

      {/* Main 2-Column Product Details */}
      <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 md:px-10 lg:px-20 lg:py-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6">
            <ProductImages product={product} />
          </div>

          {/* Right Column: Information & Actions */}
          <div className="flex flex-col lg:col-span-6">
            <ProductDetailsHeader
              product={product}
              currentPrice={currentPrice}
            />

            <div className="mt-6 space-y-6">
              <ProductOptions
                product={product}
                selectedVolume={currentVolume}
                onVolumeChange={(volume, price) => {
                  setSelectedVolume(volume);
                  setSelectedPrice(price);
                }}
                giftWrapping={giftWrapping}
                onGiftWrappingChange={setGiftWrapping}
                selectedOptions={customOptions}
                onChange={(optionId, value) =>
                  setCustomOptions((curr) => ({ ...curr, [optionId]: value }))
                }
              />

              {actions?.({
                product,
                selectedOptions: resolvedOptions,
                selectedVolume: currentVolume,
                currentPrice,
                quantity,
                setQuantity,
                giftWrapping,
              })}

              <ProductScentAnatomy product={product} />
            </div>
          </div>
        </div>
      </section>

      {/* Olfactory Companions Section */}
      <OlfactoryCompanions currentProductId={product.id} />
    </div>
  );
}

