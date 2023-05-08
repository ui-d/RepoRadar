import axios, { AxiosResponse } from 'axios'

import { Repo } from '@/types/GithubApiResponse'

export const getRepos = async (): Promise<Repo[]> => {
    const ltr = new Date()
    ltr.setDate(ltr.getDate() - 7)
    const ltrDate = ltr.toISOString().split('T')[0]

    // use URLSearchParams constructor to build the URL
    const baseURL = 'https://api.github.com/search/repositories'
    const searchParams = new URLSearchParams({
        q: `created:>${ltrDate}`,
        sort: 'stars',
        order: 'desc',
    })

    const url = new URL(baseURL)
    url.search = searchParams.toString()

    try {
        const response: AxiosResponse<{ items: Repo[] }> = await axios.get(
            url.toString()
        )
        return response.data.items
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching repositories:', error)
        return []
    }
}
