import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { Session, SessionContextProvider } from '@supabase/auth-helpers-react'
import { AppProps } from 'next/app'
import { useState } from 'react'

import '@/styles/globals.css'

function MyApp({
    Component,
    pageProps,
}: AppProps<{
    initialSession: Session
}>) {
    // Create a new supabase browser client on every first render.
    const [supabaseClient] = useState(() => createBrowserSupabaseClient())

    return (
        <SessionContextProvider
            supabaseClient={supabaseClient}
            initialSession={pageProps.initialSession}
        >
            <Component {...pageProps} />
        </SessionContextProvider>
    )
}

export default MyApp
