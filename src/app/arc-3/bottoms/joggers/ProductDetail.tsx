'use client'

import { ProductPage } from '@/components/ProductPage'
import { getGenericColorStory, getDefaultPairings } from '@/data/productVariants'

const productId = 'JOGGERS'
const arc = 'ARC_3' as const

// Color stories for this product
const colorStories: Record<string, string> = {
  SAKURA: getGenericColorStory(productId, 'SAKURA', arc),
  MIST: getGenericColorStory(productId, 'MIST', arc),
  CLOUD: getGenericColorStory(productId, 'CLOUD', arc),
  SAND: getGenericColorStory(productId, 'SAND', arc),
  LILAC: getGenericColorStory(productId, 'LILAC', arc),
}

// Pairing recommendations
const pairsWith: Record<string, any[]> = {
  SAKURA: getDefaultPairings('SAKURA', arc),
  MIST: getDefaultPairings('MIST', arc),
  CLOUD: getDefaultPairings('CLOUD', arc),
  SAND: getDefaultPairings('SAND', arc),
  LILAC: getDefaultPairings('LILAC', arc),
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
