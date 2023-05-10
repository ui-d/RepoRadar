import { render, screen } from '@testing-library/react'

import { Loader } from '@/components/loaders/Loader'

describe('Loader', () => {
    it('renders the loader with an image and alt text', () => {
        render(<Loader />)

        const loaderImage = screen.getByRole('img', { name: /loading/i })

        expect(loaderImage).toHaveAttribute('src', '/svg/Loader.svg')
        expect(loaderImage).toHaveAttribute('alt', 'loading')
        expect(loaderImage).toHaveAttribute('width', '30')
        expect(loaderImage).toHaveAttribute('height', '30')
    })
})
