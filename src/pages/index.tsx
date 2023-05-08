import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import * as React from 'react'
import { useEffect, useState } from 'react'

import { Container } from '@/components/containers/Container'
import { Layout } from '@/components/layout/Layout'
import { Navbar } from '@/components/navigation/navbar'
import { Seo } from '@/components/Seo'

const HomePage = (): JSX.Element => {
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
                        Welcome to trial project for Veed.io
                    </h1>
                </>
            ) : (
                <Layout>
                    <Seo templateTitle="Dashboard" />
                    <Seo />

                    <main className="mb-52">
                        <>
                            <Container>
                                <div className="flex grid w-full grid-flow-row grid-cols-12 gap-4 overflow-y-hidden overflow-x-scroll px-10 pb-10 pt-1 xl:overflow-x-auto xl:px-4">
                                    Veed.io
                                </div>
                            </Container>
                        </>
                    </main>
                </Layout>
            )}
        </>
    )
}

export default HomePage
