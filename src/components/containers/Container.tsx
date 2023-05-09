import clsx from 'clsx'

interface ContainerProps {
    children: React.ReactNode
    glass?: boolean
}

export const Container = ({ children, glass }: ContainerProps): JSX.Element => {
    const containerClass = clsx(
        'mx-2 p-4 lg:p-8 max-w-7xl rounded-md xl:p-10 xl:mx-auto',
        {
            glass,
        }
    )

    return <div className={containerClass}>{children}</div>
}
