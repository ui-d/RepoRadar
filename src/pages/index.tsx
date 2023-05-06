import * as React from 'react'

import Layout from '@/components/layout/Layout'
import Seo from '@/components/Seo'

export default function HomePage() {
    return (
        <Layout>
            {/* <Seo templateTitle='Home' /> */}
            <Seo />

            <main>
                <h1 className="text-center font-bold">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Asperiores commodi illum inventore ipsa nobis omnis
                    recusandae, rerum sapiente totam voluptatem.
                </h1>
            </main>
        </Layout>
    )
}
