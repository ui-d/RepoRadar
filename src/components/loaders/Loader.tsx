import React from 'react'

import { NextImage } from '@/components/NextImage'

export const Loader = (): JSX.Element => (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center text-3xl font-bold text-black">
        <NextImage
            className="mx-auto"
            width="30"
            height="30"
            src="/svg/Loader.svg"
            alt="loading"
        />
    </div>
)
