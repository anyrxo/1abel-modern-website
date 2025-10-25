'use client'

import { ProductPage } from '@/components/ProductPage'
import { getGenericColorStory, getSmartPairings } from '@/data/productVariants'

const productId = 'TOTE'
const arc = 'ARC_2' as const

// Color stories for this product
const colorStories: Record<string, string> = {
  VOID: getGenericColorStory(productId, 'VOID', arc),
  STEEL: getGenericColorStory(productId, 'STEEL', arc),
  BLOOD: getGenericColorStory(productId, 'BLOOD', arc),
  MOSS: getGenericColorStory(productId, 'MOSS', arc),
  EARTH: getGenericColorStory(productId, 'EARTH', arc),
}

// Pairing recommendations
const pairsWith: Record<string, any[]> = {
  VOID: getSmartPairings(productId, 'VOID', arc),
  STEEL: getSmartPairings(productId, 'STEEL', arc),
  BLOOD: getSmartPairings(productId, 'BLOOD', arc),
  MOSS: getSmartPairings(productId, 'MOSS', arc),
  EARTH: getSmartPairings(productId, 'EARTH', arc),
}

export function ProductDetail() {
  return (
    <ProductPage
      productId={productId}
      arc={arc}
      colorStories={colorStories}
      pairsWith={pairsWith}
    />
  )
}
