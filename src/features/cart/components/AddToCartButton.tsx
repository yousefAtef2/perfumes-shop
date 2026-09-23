"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/features/cart/hooks/useCart";
import type { AddToCartInput } from "@/features/cart/types/cart.types";
import { cn } from "@/lib/utils/cn";

type AddToCartButtonProps = AddToCartInput & {
  className?: string;
  label?: string;
};

export function AddToCartButton({
  className,
  label,
  ...props
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addItem(props);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <Button
      onClick={handleClick}
      className={cn(
        "h-12 w-full rounded bg-[#1a1a1a] text-[12px] font-semibold uppercase tracking-[0.15em] text-white transition-all hover:bg-[#2e2e2e] active:scale-[0.99]",
        added && "bg-[#15803d] hover:bg-[#15803d] text-white",
        className,
      )}
    >
      {added ? "Added to Cart ✓" : (label ?? `Add to cart | $${props.price}`)}
    </Button>
  );
}

