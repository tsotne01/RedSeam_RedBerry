import type { IProduct } from '../../../shared/models'

interface IProductImages {
    product: IProduct;
    onPhotoChange: (index: number) => void;
    imageIndex: number;
}

export const ProductImages = ({ product, onPhotoChange, imageIndex }: IProductImages) => {
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
                                loading='lazy'
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
                        loading='lazy'
                    />
                )}
            </div>
        </>
    )
}
