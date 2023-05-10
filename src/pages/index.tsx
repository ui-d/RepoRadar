import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import * as React from 'react'
import { useEffect, useState } from 'react'

import { getRepos } from '@/lib/api'
import { useRepos } from '@/hooks/useRepos'

import { Container } from '@/components/containers/Container'
import { SelectElement } from '@/components/forms/Select'
import { Layout } from '@/components/layout/Layout'
import { ListItem } from '@/components/list/ListItem'
import { Loader } from '@/components/loaders/Loader'
import { Navbar } from '@/components/navigation/Navbar'
import { Seo } from '@/components/Seo'
import { Tabs } from '@/components/tabs/Tabs'

import { Repo } from '@/types/GithubApiResponse'

interface HomePageProps {
    repos: Repo[]
}

const HomePage = ({ repos }: HomePageProps): JSX.Element => {
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const {
        reposList,
        handleAddRemoveToFavorite,
        updateFavoriteStatus,
        filterReposOfSpecificLanguage,
    } = useRepos(repos)

    const session = useSession()
    const supabase = useSupabaseClient()

    useEffect(() => {
        updateFavoriteStatus()
    }, [updateFavoriteStatus])

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
                        Welcome to trial project for Veed.io
                    </h1>
                </>
            ) : (
                <Layout>
                    <Seo />

                    <main className="mb-52">
                        <>
                            <Container>
                                <div className="flex flex-col items-center justify-between gap-10 md:flex-row">
                                    <Tabs />
                                    <SelectElement
                                        repos={reposList}
                                        filterReposOfSpecificLanguage={
                                            filterReposOfSpecificLanguage
                                        }
                                    />
                                </div>
                            </Container>
                            <Container glass>
                                <ul className="flex flex-col gap-5 pb-10 pt-1 xl:px-4">
                                    {reposList.map((repo: Repo) => (
                                        <ListItem
                                            key={repo.id}
                                            name={repo.name}
                                            description={repo.description}
                                            stars={repo.stargazers_count}
                                            forks={repo.forks}
                                            url={repo.html_url}
                                            issues={repo.open_issues}
                                            owner={repo.owner.login}
                                            ownerImage={repo.owner.avatar_url}
                                            ownerUrl={repo.owner.html_url}
                                            language={repo.language}
                                            topics={repo.topics.slice(0, 3)}
                                            isFavorite={repo.isFavorite}
                                            handleAddRemoveToFavorite={() =>
                                                handleAddRemoveToFavorite(repo)
                                            }
                                        />
                                    ))}
                                </ul>
                            </Container>
                        </>
                    </main>
                </Layout>
            )}
        </>
    )
}

export default HomePage

export async function getStaticProps() {
    const repos = await getRepos()

    return {
        props: {
            repos,
        },
        // revalidate every day
        revalidate: 60 * 60 * 24,
    }
}
