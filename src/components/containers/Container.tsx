import clsx from 'clsx'

interface ContainerProps {
    children: React.ReactNode
    glass?: boolean
}
export const Container = ({ children, glass }: ContainerProps): JSX.Element => {
    const containerClass = clsx({
        glass,
        'mx-10': true,
        'max-w-7xl': true,
        'rounded-md': true,
        'p-10': true,
        'xl:mx-auto': true,
    })

    return <div className={containerClass}>{children}</div>
}
