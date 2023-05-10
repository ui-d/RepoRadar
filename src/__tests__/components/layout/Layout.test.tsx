import { render, screen } from '@testing-library/react'

import { Layout } from '@/components/layout/Layout'

describe('Layout', () => {
    it('renders the Navbar and children correctly', () => {
        const childrenText = 'Test Children'

        render(<Layout>{childrenText}</Layout>)

        expect(screen.getByText(/RepoRadar/i)).toBeInTheDocument()
        expect(screen.getByText(childrenText)).toBeInTheDocument()
    })
})
