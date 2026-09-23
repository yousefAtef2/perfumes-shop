/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { productPaths } from "@/features/products/paths";

type ProductBreadcrumbsProps = {
  productName?: string;
  category?: string;
};

export function ProductBreadcrumbs({ productName }: ProductBreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-2 px-4 py-4 sm:px-6 sm:py-6 md:px-10 lg:px-20"
    >
      <span className="flex items-center gap-2">
        <Link
          href={productPaths.list}
          className="text-[12px] font-normal whitespace-nowrap text-[#605a54] hover:text-[#1a1a1a] transition-colors"
        >
          Home
        </Link>
        <img src="/icons/chevron-right.svg" alt="" width={10} height={10} />
      </span>
      <span className="flex items-center gap-2">
        <Link
          href={productPaths.list}
          className="text-[12px] font-normal whitespace-nowrap text-[#605a54] hover:text-[#1a1a1a] transition-colors"
        >
          Fragrances
        </Link>
        <img src="/icons/chevron-right.svg" alt="" width={10} height={10} />
      </span>
      <span className="text-[12px] font-medium whitespace-nowrap text-[#1a1a1a]">
        {productName ?? "All Fragrances"}
      </span>
    </nav>
  );
}
