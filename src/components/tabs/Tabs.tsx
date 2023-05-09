import * as React from 'react'

import CustomLink from '@/components/links/Link'

export function Tabs(): JSX.Element {
    return (
        <div className="tabs">
            <CustomLink
                href="/"
                activeClassName="tab tab-bordered text-yellow-200"
                nonActiveClassName="tab text-gray-500"
            >
                TOP
            </CustomLink>
            <CustomLink
                href="/favourite"
                activeClassName="tab tab-bordered text-yellow-200"
                nonActiveClassName="tab text-gray-500"
            >
                Favorite
            </CustomLink>
        </div>
    )
}
