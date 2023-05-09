import Head from 'next/head'
import { useRouter } from 'next/router'

// !STARTERCONF Change these default meta
const defaultMeta = {
    title: 'Veed.io Challenge',
    siteName: 'Veed.io Challenge',
    description: 'Veed.io Challenge',
    url: '/',
    type: 'website',
    robots: 'follow, index',

    image: '',
}

type SeoProps = {
    date?: string
    templateTitle?: string
} & Partial<typeof defaultMeta>

export function Seo(props: SeoProps) {
    const router = useRouter()
    const meta = {
        ...defaultMeta,
        ...props,
    }
    meta['title'] = props.templateTitle
        ? `${props.templateTitle} | ${meta.siteName}`
        : meta.title

    return (
        <Head>
            <title>{meta.title}</title>
            <meta name="robots" content={meta.robots} />
            <meta content={meta.description} name="description" />
            <meta property="og:url" content={`${meta.url}${router.asPath}`} />
            <link rel="canonical" href={`${meta.url}${router.asPath}`} />
            {/* Open Graph */}
            <meta property="og:type" content={meta.type} />
            <meta property="og:site_name" content={meta.siteName} />
            <meta property="og:description" content={meta.description} />
            <meta property="og:title" content={meta.title} />
            <meta name="image" property="og:image" content={meta.image} />
            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            {/* // !STARTERCONF Remove or change to your handle */}
            {/* <meta name='twitter:site' content='@th_clarence' /> */}
            <meta name="twitter:title" content={meta.title} />
            <meta name="twitter:description" content={meta.description} />
            <meta name="twitter:image" content={meta.image} />
            {meta.date && (
                <>
                    <meta
                        property="article:published_time"
                        content={meta.date}
                    />
                    <meta
                        name="publish_date"
                        property="og:publish_date"
                        content={meta.date}
                    />
                    {/* // !STARTERCONF Remove or change to your name */}
                    <meta
                        name="author"
                        property="article:author"
                        content="Theodorus Clarence"
                    />
                </>
            )}

            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta
                name="msapplication-config"
                content="/favicon/browserconfig.xml"
            />
            <meta name="theme-color" content="#ffffff" />
        </Head>
    )
}
