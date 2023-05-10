import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import * as React from 'react'
import { useEffect, useState } from 'react'

import { getRepos } from '@/lib/api'
import { useRepos } from '@/hooks/useRepos'

import { Container } from '@/components/containers/Container'
import { Layout } from '@/components/layout/Layout'
import { ListItem } from '@/components/list/ListItem'
import { Loader } from '@/components/loaders/Loader'
import { Navbar } from '@/components/navigation/navbar'
import { Seo } from '@/components/Seo'
import { Tabs } from '@/components/tabs/Tabs'

import { Repo } from '@/types/GithubApiResponse'

interface FavouriteProps {
    repos: Repo[]
}

const Favourite = ({ repos }: FavouriteProps): JSX.Element => {
    const [isLoading, setIsLoading] = useState(true)
    const { favorites, handleAddRemoveToFavorite } = useRepos(repos)

    const session = useSession()
    const supabase = useSupabaseClient()

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(() => {
            setTimeout(() => {
                setIsLoading(false)
            }, 1000)
        })

        return () => {
            authListener.subscription.unsubscribe()
        }
    }, [supabase.auth])

    if (isLoading) {
        return <Loader />
    }

    return (
        <>
            {!session ? (
                <>
                    <Navbar />
                    <h1 className="text-center text-3xl font-bold">
                        You need to login to see your favourite repos
                    </h1>
                </>
            ) : (
                <Layout>
                    <Seo />

                    <main className="mb-52">
                        <>
                            <Container>
                                <Tabs />
                            </Container>
                            <Container glass>
                                <ul className="flex flex-col gap-5 pb-10 pt-1 xl:px-4">
                                    {favorites.length ? (
                                        favorites.map((repo: Repo) => (
                                            <ListItem
                                                key={repo.id}
                                                name={repo.name}
                                                description={repo.description}
                                                stars={repo.stargazers_count}
                                                forks={repo.forks}
                                                url={repo.html_url}
                                                issues={repo.open_issues}
                                                owner={repo.owner.login}
                                                ownerImage={
                                                    repo.owner.avatar_url
                                                }
                                                ownerUrl={repo.owner.html_url}
                                                topics={repo.topics.slice(0, 3)}
                                                isFavorite={repo.isFavorite}
                                                handleAddRemoveToFavorite={() =>
                                                    handleAddRemoveToFavorite(
                                                        repo
                                                    )
                                                }
                                            />
                                        ))
                                    ) : (
                                        <h1 className="text-center text-xl font-bold">
                                            You don't have any favourite repos
                                        </h1>
                                    )}
                                </ul>
                            </Container>
                        </>
                    </main>
                </Layout>
            )}
        </>
    )
}

export default Favourite

export async function getStaticProps() {
    const repos = await getRepos()

    return {
        props: {
            repos,
        },
        revalidate: 60 * 5,
    }
}
