import Image, { ImageProps } from 'next/image'
import * as React from 'react'

import clsxm from '@/lib/clsxm'

type NextImageProps = {
    useSkeleton?: boolean
    imgClassName?: string
    blurClassName?: string
    alt: string
} & (
    | { width: string | number; height: string | number }
    | { layout: 'fill'; width?: string | number; height?: string | number }
) &
    ImageProps

/**
 *
 * @description Must set width using `w-` className
 * @param src image source
 * @param width image width
 * @param height image height
 * @param alt image alt
 * @param className image wrapper className
 * @param imgClassName image className
 * @param blurClassName blur effect className
 * @param rest other props
 * @param useSkeleton add background with pulse animation, don't use it if image is transparent
 */
export default function NextImage({
    useSkeleton = false,
    src,
    width,
    height,
    alt,
    className,
    imgClassName,
    blurClassName,
    ...rest
}: NextImageProps) {
    const [status, setStatus] = React.useState(
        useSkeleton ? 'loading' : 'complete'
    )
    const widthIsSet = className?.includes('w-') ?? false

    return (
        <figure
            style={!widthIsSet ? { width: `${width}px` } : undefined}
            className={className}
        >
            <Image
                className={clsxm(
                    imgClassName,
                    status === 'loading' &&
                        clsxm('animate-pulse', blurClassName)
                )}
                src={src}
                width={width}
                height={height}
                alt={alt}
                onLoadingComplete={() => setStatus('complete')}
                {...rest}
            />
        </figure>
    )
}
