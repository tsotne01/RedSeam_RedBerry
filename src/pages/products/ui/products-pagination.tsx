import type { IProductsMetadata } from '../models/model'
import { Pagination } from '../../../features/pagination'
import { memo } from 'react'

export const ProductsPagination = memo(({ productsMetaData }: { productsMetaData: IProductsMetadata }) => {
    return (
        <>
            {productsMetaData && (
                <Pagination
                    totalPages={productsMetaData?.last_page}
                />
            )}
        </>
    )
})
