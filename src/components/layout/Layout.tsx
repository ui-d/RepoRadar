import * as React from 'react'

import { Navbar } from '@/components/navigation/Navbar'

interface props {
    children: React.ReactNode
}

export function Layout({ children }: props): JSX.Element {
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}
