import { render, screen } from '@testing-library/react'
import { useRouter } from 'next/router'

import CustomLink from '@/components/links/Link'

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}))

describe('CustomLink', () => {
    it('renders the CustomLink with the correct class and children', () => {
        const activeClassName = 'activeClass'
        const nonActiveClassName = 'nonActiveClass'
        const childrenText = 'Test Children'
        const href = '/test-route'

        ;(useRouter as jest.Mock).mockReturnValue({
            pathname: href,
        })

        render(
            <CustomLink
                href={href}
                activeClassName={activeClassName}
                nonActiveClassName={nonActiveClassName}
            >
                {childrenText}
            </CustomLink>
        )

        const link = screen.getByText(childrenText)
        expect(link).toBeInTheDocument()
        expect(link).toHaveClass(activeClassName)
        expect(link).not.toHaveClass(nonActiveClassName)
    })
})
