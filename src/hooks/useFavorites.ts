import { useCallback, useEffect, useState } from 'react'

import { Repo } from '@/types/GithubApiResponse'

export const useFavorites = (initialRepos: Repo[]) => {
    const [reposList, setReposList] = useState<Repo[]>(initialRepos)
    const [favorites, setFavorites] = useState<Repo[]>([])

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
        setReposList(updatedRepos)
        setFavorites(favorite)
    }, [initialRepos])

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
                setReposList((prevState) => [...prevState, props])
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
    }
}
