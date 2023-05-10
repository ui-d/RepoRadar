import { render, screen } from '@testing-library/react'

import { Tabs } from '@/components/tabs/Tabs'

describe('Tabs', () => {
    it('renders the TOP and Favorite links', () => {
        render(<Tabs />)

        const topLink = screen.getByRole('link', { name: /TOP/i })
        const favoriteLink = screen.getByRole('link', { name: /Favorite/i })

        expect(topLink).toBeInTheDocument()
        expect(favoriteLink).toBeInTheDocument()
    })
})
