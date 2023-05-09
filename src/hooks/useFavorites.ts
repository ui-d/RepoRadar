import { useCallback, useEffect, useState } from 'react'

import { Repo } from '@/types/GithubApiResponse'

export const useFavorites = (initialRepos: Repo[]) => {
    const [reposList, setReposList] = useState<Repo[]>(initialRepos)
    const [favorites, setFavorites] = useState<Repo[]>([])
    const [currentLanguageFilter, setCurrentLanguageFilter] = useState<
        string | null
    >(null)

    const updateFavoriteStatus = useCallback(() => {
        const data = localStorage.getItem('favorite')
        const favorite = data ? JSON.parse(data) : []

        const updatedRepos = initialRepos.map((repo) => {
            const isExist = favorite.find((item: Repo) => item.id === repo.id)
            if (isExist) {
                return {
                    ...repo,
                    isFavorite: true,
                }
            }
            return {
                ...repo,
                isFavorite: false,
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
                const isExist = favorites.find(
                    (item: Repo) => item.id === repo.id
                )
                if (isExist) {
                    return {
                        ...repo,
                        isFavorite: true,
                    }
                }
                return {
                    ...repo,
                    isFavorite: false,
                }
            })
            setReposList(updatedFilteredRepos)
        },
        [initialRepos, favorites]
    )

    const handleAddRemoveToFavorite = useCallback(
        (props: Repo) => {
            const data = localStorage.getItem('favorite')
            const favorite = data ? JSON.parse(data) : []

            const isExist = favorite.find((item: Repo) => item.id === props.id)
            if (isExist) {
                const filtered = favorite.filter(
                    (item: Repo) => item.id !== props.id
                )
                localStorage.setItem('favorite', JSON.stringify(filtered))
            } else {
                props.isFavorite = true
                favorite.push(props)
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
