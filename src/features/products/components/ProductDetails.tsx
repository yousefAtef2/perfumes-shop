import type { Product } from "@/features/products/types/product.types";
import { formatWholePrice } from "@/features/products/utils/product.utils";

type ProductDetailsProps = {
  product: Product;
  currentPrice?: number;
};

/** US-04: product information & scent anatomy. */
export function ProductDetailsHeader({
  product,
  currentPrice,
}: ProductDetailsProps) {
  const displayPrice = currentPrice ?? product.price;

  return (
    <div className="flex flex-col gap-3">
      {/* Scent Family & Occasion Badges */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-sm border border-[#ebe6de] bg-[#f5f2eb] px-2.5 py-1 text-[10px] font-semibold tracking-[0.15em] text-[#605a54] uppercase">
          Scent Family: {product.scentFamily}
        </span>
        <span className="rounded-sm border border-[#ebe6de] bg-[#f5f2eb] px-2.5 py-1 text-[10px] font-semibold tracking-[0.15em] text-[#605a54] uppercase">
          Occasion: {product.occasion.replace("-", " ")}
        </span>
      </div>

      {/* Fragrance Title */}
      <h1 className="font-[family-name:var(--font-instrument-serif)] text-[36px] sm:text-[46px] leading-[1.1] text-[#1a1a1a]">
        {product.name}
      </h1>

      {/* Price & Atelier Availability */}
      <div className="flex items-center justify-between pt-1">
        <p className="text-[22px] sm:text-[24px] font-normal text-[#1a1a1a]">
          {formatWholePrice(displayPrice)}
        </p>
        <div className="flex items-center gap-1.5 text-[11px] sm:text-[12px] font-medium text-[#15803d]">
          <span className="inline-block size-2 rounded-full bg-[#22c55e]" />
          <span>{product.availability ?? "Available in Atelier"}</span>
        </div>
      </div>
    </div>
  );
}

export function ProductScentAnatomy({ product }: { product: Product }) {
  const anatomy = product.scentAnatomy;
  const story = anatomy?.story ?? product.description;

  return (
    <div className="mt-8 flex flex-col gap-5 border-t border-[#ebe6de] pt-6">
      <h2 className="font-[family-name:var(--font-instrument-serif)] text-[26px] sm:text-[28px] text-[#1a1a1a]">
        Scent Anatomy
      </h2>

      <p className="text-[12px] sm:text-[13px] leading-relaxed text-[#605a54]">
        {story}
      </p>

      {anatomy && (
        <div className="flex flex-col gap-3 pt-2">
          {anatomy.topNotes && (
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-[12px]">
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#1a1a1a]">
                Top Notes
              </span>
              <span className="text-[#605a54] sm:text-right">
                {anatomy.topNotes}
              </span>
            </div>
          )}
          {anatomy.heartNotes && (
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-[12px]">
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#1a1a1a]">
                Heart Notes
              </span>
              <span className="text-[#605a54] sm:text-right">
                {anatomy.heartNotes}
              </span>
            </div>
          )}
          {anatomy.baseNotes && (
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-[12px]">
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#1a1a1a]">
                Base Notes
              </span>
              <span className="text-[#605a54] sm:text-right">
                {anatomy.baseNotes}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/** Legacy wrapper for compatibility */
export function ProductDetails({ product, currentPrice }: ProductDetailsProps) {
  return (
    <div className="space-y-6">
      <ProductDetailsHeader product={product} currentPrice={currentPrice} />
      <ProductScentAnatomy product={product} />
    </div>
  );
}

