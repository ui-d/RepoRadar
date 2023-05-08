import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface CustomLinkProps {
    href: string
    children: React.ReactNode
    activeClassName: string
    nonActiveClassName: string
}

const CustomLink = ({
    href,
    children,
    activeClassName,
    nonActiveClassName,
}: CustomLinkProps): JSX.Element => {
    const router = useRouter()
    const isActive = router.pathname === href

    const linkClass = clsx({
        [activeClassName]: isActive,
        [nonActiveClassName]: !isActive,
    })

    return (
        <Link className={linkClass} href={href}>
            {children}
        </Link>
    )
}

export default CustomLink
