"use client";

import { Select } from "@/components/ui/Select";
import type { Product, VolumeOption } from "@/features/products/types/product.types";
import { cn } from "@/lib/utils/cn";

type ProductOptionsProps = {
  product: Product;
  selectedVolume: string;
  onVolumeChange: (volume: string, price: number) => void;
  giftWrapping: boolean;
  onGiftWrappingChange: (enabled: boolean) => void;
  selectedOptions?: Record<string, string>;
  onChange?: (optionId: string, value: string) => void;
};

export function ProductOptions({
  product,
  selectedVolume,
  onVolumeChange,
  giftWrapping,
  onGiftWrappingChange,
  selectedOptions = {},
  onChange,
}: ProductOptionsProps) {
  // Default volumes if none specified
  const volumes: VolumeOption[] =
    product.volumeOptions && product.volumeOptions.length > 0
      ? product.volumeOptions
      : [
          { size: "30 ml", price: Math.round(product.price * 0.65) },
          { size: "50 ml", price: Math.round(product.price * 0.82) },
          { size: "100 ml", price: product.price },
        ];

  return (
    <div className="space-y-5">
      {/* Select Volume */}
      <div>
        <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.1em] text-[#605a54]">
          Select Volume
        </label>
        <div className="grid grid-cols-3 gap-3">
          {volumes.map((vol) => {
            const isSelected = selectedVolume === vol.size;
            return (
              <button
                key={vol.size}
                type="button"
                onClick={() => onVolumeChange(vol.size, vol.price)}
                className={cn(
                  "flex flex-col items-center justify-center rounded border py-3 px-2 transition-all text-center",
                  isSelected
                    ? "border-[#1a1a1a] bg-white ring-1 ring-[#1a1a1a] shadow-xs"
                    : "border-[#ebe6de] bg-[#faf8f5] hover:border-[#b5aea3] text-[#605a54]",
                )}
              >
                <span
                  className={cn(
                    "text-[13px]",
                    isSelected
                      ? "font-semibold text-[#1a1a1a]"
                      : "font-medium text-[#1a1a1a]",
                  )}
                >
                  {vol.size}
                </span>
                <span className="mt-0.5 text-[11px] text-[#78716c]">
                  ${vol.price}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Complimentary Signature Gift Wrapping */}
      <div className="flex items-center justify-between rounded bg-[#f5f2ec] p-4">
        <div className="flex flex-col pr-4">
          <span className="text-[13px] font-medium text-[#1a1a1a]">
            Complimentary Signature Gift Wrapping
          </span>
          <span className="mt-0.5 text-[11px] text-[#78716c]">
            Embossed linen paper box with custom wax seal stamp.
          </span>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={giftWrapping}
          onClick={() => onGiftWrappingChange(!giftWrapping)}
          className={cn(
            "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a1a1a]",
            giftWrapping ? "bg-[#1a1a1a]" : "bg-[#d8d2c7]",
          )}
          aria-label="Toggle Complimentary Signature Gift Wrapping"
        >
          <span
            className={cn(
              "pointer-events-none inline-block size-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out",
              giftWrapping ? "translate-x-5" : "translate-x-0",
            )}
          />
        </button>
      </div>

      {/* Any additional product options */}
      {product.options.length > 0 && onChange && (
        <div className="space-y-3 pt-2">
          {product.options.map((option) => (
            <label key={option.id} className="block">
              <span className="mb-1 block text-sm font-medium text-[#1a1a1a]">
                {option.name}
              </span>
              <Select
                value={selectedOptions[option.id] ?? option.values[0]}
                onChange={(event) => onChange(option.id, event.target.value)}
              >
                {option.values.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </Select>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

