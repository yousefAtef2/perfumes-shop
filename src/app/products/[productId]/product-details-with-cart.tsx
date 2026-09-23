"use client";

import { AddToCartButton } from "@/features/cart";
import { ProductDetailsPage } from "@/features/products";
import { formatWholePrice } from "@/features/products/utils/product.utils";

type ProductDetailsWithCartProps = {
  productId: string;
};

export function ProductDetailsWithCart({
  productId,
}: ProductDetailsWithCartProps) {
  return (
    <ProductDetailsPage
      productId={productId}
      actions={({
        product,
        selectedOptions,
        currentPrice,
        quantity,
        setQuantity,
      }) => (
        <div className="flex items-center gap-3 pt-2">
          {/* Quantity selector */}
          <div className="flex h-12 items-center rounded border border-[#ebe6de] bg-white px-1">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="flex h-full w-8 items-center justify-center text-lg font-light text-[#605a54] hover:text-[#1a1a1a] transition-colors"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="w-8 text-center text-sm font-medium text-[#1a1a1a]">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="flex h-full w-8 items-center justify-center text-lg font-light text-[#605a54] hover:text-[#1a1a1a] transition-colors"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          {/* Add to Cart button */}
          <div className="flex-1">
            <AddToCartButton
              productId={product.id}
              name={product.name}
              price={currentPrice}
              image={product.images[0]}
              selectedOptions={selectedOptions}
              quantity={quantity}
              label={`ADD TO CART | ${formatWholePrice(currentPrice * quantity)}`}
            />
          </div>
        </div>
      )}
    />
  );
}

