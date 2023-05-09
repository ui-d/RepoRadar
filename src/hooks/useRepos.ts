import { useCallback, useEffect, useState } from 'react'

import { Repo } from '@/types/GithubApiResponse'

export const useRepos = (initialRepos: Repo[]) => {
    const [reposList, setReposList] = useState<Repo[]>(initialRepos)
    const [favorites, setFavorites] = useState<Repo[]>([])
    const [currentLanguageFilter, setCurrentLanguageFilter] = useState<
        string | null
    >(null)

    const updateFavoriteStatus = useCallback(() => {
        const favoriteRepos = localStorage.getItem('favorite')
        const favorite = favoriteRepos ? JSON.parse(favoriteRepos) : []

        const updatedRepos = initialRepos.map((repo) => {
            const isFavorite = favorite.some(
                (item: Repo) => item.id === repo.id
            )
            return {
                ...repo,
                isFavorite,
            }
        })

        if (currentLanguageFilter) {
            const filteredRepos = updatedRepos.filter(
                (repo) => repo.language === currentLanguageFilter
            )
            setReposList(filteredRepos)
        } else {
            setReposList(updatedRepos)
        }

        setFavorites(favorite)
    }, [initialRepos, currentLanguageFilter])

    const filterReposOfSpecificLanguage = useCallback(
        (language: string | null) => {
            setCurrentLanguageFilter(language)

            const filteredRepos = initialRepos.filter(
                (repo) => repo.language === language
            )

            const updatedFilteredRepos = filteredRepos.map((repo) => {
                const isFavorite = favorites.some(
                    (item: Repo) => item.id === repo.id
                )
                return {
                    ...repo,
                    isFavorite,
                }
            })
            setReposList(updatedFilteredRepos)
        },
        [initialRepos, favorites]
    )

    const handleAddRemoveToFavorite = useCallback(
        (repo: Repo) => {
            const favoriteRepos = localStorage.getItem('favorite')
            const favorite = favoriteRepos ? JSON.parse(favoriteRepos) : []

            const isFavorite = favorite.some(
                (item: Repo) => item.id === repo.id
            )

            if (isFavorite) {
                const updatedFavorites = favorite.filter(
                    (item: Repo) => item.id !== repo.id
                )
                localStorage.setItem(
                    'favorite',
                    JSON.stringify(updatedFavorites)
                )
            } else {
                repo.isFavorite = true
                favorite.push(repo)
                localStorage.setItem('favorite', JSON.stringify(favorite))
            }

            updateFavoriteStatus()
        },
        [updateFavoriteStatus]
    )

    useEffect(() => {
        updateFavoriteStatus()
    }, [updateFavoriteStatus])

    return {
        reposList,
        favorites,
        handleAddRemoveToFavorite,
        updateFavoriteStatus,
        filterReposOfSpecificLanguage,
    }
}
