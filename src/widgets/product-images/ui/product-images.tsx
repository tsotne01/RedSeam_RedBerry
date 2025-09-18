import React from 'react'
import type { IProduct } from '../../../shared/models'

export const ProductImages = ({ product, onPhotoChange, imageIndex }: { product: IProduct; onPhotoChange: (index: number) => void; imageIndex: number }) => {
    return (
        <>
            <div className="flex flex-col gap-3">
                {product.images &&
                    product.images.map((img, idx) => (
                        <button onClick={() => onPhotoChange(idx)} key={img}>
                            <img
                                className="w-[121px] h-[161px]"
                                key={img}
                                src={img}
                                alt={product.name}
                            />
                        </button>
                    ))}
            </div>
            <div>
                {product.images && (
                    <img
                        className="w-[492px] h-[656px] object-cover rounded"
                        src={product.images[imageIndex]}
                        alt={product.name}
                    />
                )}
            </div>
        </>
    )
}
