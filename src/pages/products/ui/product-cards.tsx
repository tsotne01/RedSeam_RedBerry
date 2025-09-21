import { memo } from 'react'
import type { IProduct } from '../../../shared/models'
import { ProductCard } from '../../../shared/ui/product-card/product-card'

export const ProductCards = memo(({ products }: { products: IProduct[] }) => {
    return (
        <div className="flex flex-wrap gap-[24px] mt-10">
            {products &&
                products?.map((product: IProduct) => (
                    <ProductCard key={product.id} {...product} />
                ))}
        </div>
    )
})
