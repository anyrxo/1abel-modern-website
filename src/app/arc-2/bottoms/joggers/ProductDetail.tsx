'use client'

import { ProductPage } from '@/components/ProductPage'
import { getGenericColorStory, getDefaultPairings } from '@/data/productVariants'

const productId = 'JOGGERS'
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
  VOID: getDefaultPairings('VOID', arc),
  STEEL: getDefaultPairings('STEEL', arc),
  BLOOD: getDefaultPairings('BLOOD', arc),
  MOSS: getDefaultPairings('MOSS', arc),
  EARTH: getDefaultPairings('EARTH', arc),
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
