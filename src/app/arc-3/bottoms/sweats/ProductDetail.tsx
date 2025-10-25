'use client'

import { ProductPage } from '@/components/ProductPage'
import { getGenericColorStory, getSmartPairings } from '@/data/productVariants'

const productId = 'SWEATS'
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
  SAKURA: getSmartPairings(productId, 'SAKURA', arc),
  MIST: getSmartPairings(productId, 'MIST', arc),
  CLOUD: getSmartPairings(productId, 'CLOUD', arc),
  SAND: getSmartPairings(productId, 'SAND', arc),
  LILAC: getSmartPairings(productId, 'LILAC', arc),
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
