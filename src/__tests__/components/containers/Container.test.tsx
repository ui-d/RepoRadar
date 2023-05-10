import { render, screen } from '@testing-library/react'
import clsx from 'clsx'

import { Container } from '@/components/containers/Container'

describe('Container', () => {
    it('renders children correctly', () => {
        const testText = 'Test Content'
        render(<Container>{testText}</Container>)

        const containerContent = screen.getByText(testText)
        expect(containerContent).toBeInTheDocument()
    })

    it('applies default CSS classes to container', () => {
        render(<Container>Test</Container>)

        const container = screen.getByText('Test')
        const defaultClasses =
            'mx-2 p-4 lg:p-8 max-w-7xl rounded-md xl:p-10 xl:mx-auto'
        expect(container).toHaveClass(defaultClasses)
    })

    it('applies glass class when glass prop is true', () => {
        render(<Container glass>Test</Container>)

        const container = screen.getByText('Test')
        const containerClass = clsx(
            'mx-2 p-4 lg:p-8 max-w-7xl rounded-md xl:p-10 xl:mx-auto',
            { glass: true }
        )
        expect(container).toHaveClass(containerClass)
    })

    it('does not apply glass class when glass prop is false or not provided', () => {
        render(<Container>Test</Container>)

        const container = screen.getByText('Test')
        const containerClass = clsx(
            'mx-2 p-4 lg:p-8 max-w-7xl rounded-md xl:p-10 xl:mx-auto',
            { glass: false }
        )
        expect(container).toHaveClass(containerClass)
    })
})
