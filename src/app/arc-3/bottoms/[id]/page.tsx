import { ProductDetail } from './ProductDetail'

type Props = {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' }
  ]
}

export default async function Page({ params }: Props) {
  const { id } = await params
  return <ProductDetail id={id} />
}
