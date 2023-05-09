import Link from 'next/link'
import * as React from 'react'

import { NextImage } from '@/components/NextImage'

interface ListItemProps {
    name: string
    description: string | null
    stars: number
    issues: number
    forks: number
    url: string
    ownerUrl: string
    language?: string | null
    owner: string
    ownerImage: string
    isFavorite?: boolean
    topics?: string[]
    handleAddRemoveToFavorite: () => void
}
export function ListItem({
    name,
    url,
    owner,
    ownerImage,
    ownerUrl,
    issues,
    stars,
    forks,
    language,
    description,
    topics,
    isFavorite,
    handleAddRemoveToFavorite,
}: ListItemProps): JSX.Element {
    return (
        <div className="stats flex w-full max-w-full shadow">
            <div className="flex w-full max-w-xs">
                <div className="stat-figure text-secondary pl-5">
                    <div className="avatar online">
                        <div className="w-16 rounded-full">
                            <NextImage
                                src={ownerImage}
                                alt={owner}
                                width="64"
                                height="64"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-center pl-4">
                    <div className="stat-value text-base">{owner}</div>
                    <div className="stat-desc text-accent">
                        <Link href={ownerUrl}>Follow</Link>{' '}
                    </div>
                </div>
            </div>
            <div className="stat max-w-xl overflow-hidden">
                <div className="stat-figure text-primary">
                    <svg
                        onClick={handleAddRemoveToFavorite}
                        xmlns="http://www.w3.org/2000/svg"
                        fill={isFavorite ? 'currentColor' : 'none'}
                        viewBox="0 0 24 24"
                        className="inline-block h-8 w-8 cursor-pointer stroke-current transition hover:text-gray-600"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        ></path>
                    </svg>
                </div>
                <div className="stat-title">
                    {!!topics?.length && (
                        <>
                            <ul className="mb-2 flex flex-wrap gap-2">
                                {topics.map((topic) => (
                                    <li
                                        key={topic}
                                        className="rounded bg-gray-700 px-2 py-0.5 text-sm text-gray-400"
                                    >
                                        {topic}
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
                <div className="stat-value text-primary mb-2 truncate text-2xl">
                    <Link className="transition hover:text-gray-600" href={url}>
                        {name}{' '}
                        {!!language && (
                            <div className="badge badge-outline badge-xs">
                                {language}
                            </div>
                        )}
                    </Link>{' '}
                </div>
                <div className="stat-desc line-clamp-2 whitespace-normal">
                    {description}
                </div>
            </div>

            <div className="stat flex-1">
                <div className="stat-figure text-secondary">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20px"
                        width="20px"
                        version="1.1"
                        id="Capa_1"
                        viewBox="0 0 53.867 53.867"
                    >
                        <polygon
                            fill="#FFFF70"
                            points="26.934,1.318 35.256,18.182 53.867,20.887 40.4,34.013 43.579,52.549 26.934,43.798   10.288,52.549 13.467,34.013 0,20.887 18.611,18.182 "
                        />
                    </svg>
                </div>
                <div className="stat-title">Forks: {forks}</div>
                <div className="stat-value text-primary text-yellow-200">
                    {stars}
                </div>
                <div className="stat-desc">Open issues: {issues}</div>
            </div>
        </div>
    )
}
