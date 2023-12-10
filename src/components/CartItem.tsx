import React from 'react';
import {Product} from "@/payload-types";
import Image from "next/image";
import {ImageIcon, X} from "lucide-react";
import {PRODUCT_CATEGORIES} from "@/config";
import {useCart} from "@/hooks/use-cart";
import {formatPrice} from "@/lib/utils";

interface CartItemProps {
    product: Product
}

const CartItem = ({product}: CartItemProps) => {
    const {removeItem} = useCart();
    const {image} = product.images[0];
    const label = PRODUCT_CATEGORIES.find(category => category.value === product.category)?.label

    return (
        <div className='space=y-3 py-2'>
            <div className='flex items-start justify-between gap-4'>
                <div className='flex items-center space-x-4'>
                    <div className='relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded'>
                        {typeof image !== 'string' && image.url ? (
                            <Image src={image.url} alt={product.name} fill className='absolute object-cover'/>
                        ) : (
                            <div className='flex h-full items-center justify-center bg-secondary'>
                                <ImageIcon
                                    aria-hidden='true'
                                    className='h-4 w-4 text-muted-foreground'
                                />
                            </div>
                        )}
                    </div>
                    <div className='flex flex-col self-start'>
                        <span className='line-clamp-1 text-sm font-medium'>{product.name}</span>
                        <span className='line-clamp-1 text-xs capitalize text-muted-foreground'>{label}</span>
                        <div className='mt-4 text-xs text-muted-foreground'>
                            <button
                                onClick={() => removeItem(product.id)}
                                className='flex items-center gap-0.5'
                            >
                                <X className='w-3 h-4'/>
                            </button>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col space-y-1 font-medium'>
                    <span className='ml-auto line-clamp-1 text-sm'>
                        {formatPrice(product.price)}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CartItem;