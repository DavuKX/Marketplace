import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {Metadata} from "next";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(
    price: number | string,
    options : {
      currency?: "USD" | "EUR" | "GBP" | "BDT"
      notation?: Intl.NumberFormatOptions["notation"]
    } = {}
) {
  const { currency = "USD", notation = "compact" } = options

  const numericPrice = typeof price === "string" ? parseFloat(price) : price

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    notation,
    maximumFractionDigits: 2,
  }).format(numericPrice)
}

export function constructMetadata({
                                      title = 'Marketplace - the marketplace for digital assets',
                                      description = 'Marketplace is an open-source marketplace for high-quality digital goods.',
                                      image = '/thumbnail.png',
                                      icons = '/favicon.ico',
                                      noIndex = false,
                                  }: {
    title?: string
    description?: string
    image?: string
    icons?: string
    noIndex?: boolean
} = {}): Metadata {
    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [
                {
                    url: image,
                },
            ],
        },
        icons,
        metadataBase: new URL('https://marketplace-production-d8c9.up.railway.app'),
        ...(noIndex && {
            robots: {
                index: false,
                follow: false,
            },
        }),
    }
}
