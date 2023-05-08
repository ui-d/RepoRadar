import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import * as React from 'react'
import { useEffect, useState } from 'react'

import { Container } from '@/components/containers/Container'
import { Layout } from '@/components/layout/Layout'
import { Navbar } from '@/components/navigation/navbar'
import { Seo } from '@/components/Seo'
import { Tabs } from '@/components/tabs/Tabs'

const Favourite = (): JSX.Element => {
    const [isLoading, setIsLoading] = useState(true)

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
        return (
            <div className="pt-32 text-center text-3xl font-bold text-black">
                Loading...
            </div>
        )
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
                                {/*<ul className="flex flex-col gap-5 px-10 pb-10 pt-1 xl:px-4">*/}
                                {/*    {repos.map((repo) => (*/}
                                {/*        <ListItem*/}
                                {/*            key={repo.id}*/}
                                {/*            name={repo.name}*/}
                                {/*            description={repo.description}*/}
                                {/*            stars={repo.stargazers_count}*/}
                                {/*            forks={repo.forks}*/}
                                {/*            url={repo.html_url}*/}
                                {/*            issues={repo.open_issues}*/}
                                {/*            owner={repo.owner.login}*/}
                                {/*            ownerImage={repo.owner.avatar_url}*/}
                                {/*            ownerUrl={repo.owner.html_url}*/}
                                {/*            topics={repo.topics.slice(0, 3)}*/}
                                {/*        />*/}
                                {/*    ))}*/}
                                {/*</ul>*/}
                            </Container>
                        </>
                    </main>
                </Layout>
            )}
        </>
    )
}

export default Favourite
