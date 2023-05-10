import { render, screen } from '@testing-library/react'

import { ListItem } from '@/components/list/ListItem'

describe('ListItem', () => {
    const mockProps = {
        name: 'Repo 1',
        url: 'https://github.com/user/repo1',
        owner: 'user',
        ownerImage: 'https://avatars.githubusercontent.com/u/123456?v=4',
        ownerUrl: 'https://github.com/user',
        issues: 3,
        stars: 5,
        forks: 2,
        language: 'JavaScript',
        description: 'Repo 1 description',
        topics: ['topic1', 'topic2', 'topic3'],
        isFavorite: false,
        handleAddRemoveToFavorite: jest.fn(),
    }

    it('renders the repository name', () => {
        render(<ListItem {...mockProps} />)

        const repoName = screen.getByRole('link', { name: /Repo 1/i })
        expect(repoName).toBeInTheDocument()
    })

    it('renders the repository description', () => {
        render(<ListItem {...mockProps} />)

        const repoDescription = screen.getByText(/Repo 1 description/i)
        expect(repoDescription).toBeInTheDocument()
    })

    it('renders the repository language', () => {
        render(<ListItem {...mockProps} />)

        const repoLanguage = screen.getByText(/JavaScript/i)
        expect(repoLanguage).toBeInTheDocument()
    })

    it('renders the repository owner', () => {
        render(<ListItem {...mockProps} />)

        const repoOwner = screen.getByText(/user/i)
        expect(repoOwner).toBeInTheDocument()
    })

    it('renders the repository stars', () => {
        render(<ListItem {...mockProps} />)

        const repoStars = screen.getByText(/5/i)
        expect(repoStars).toBeInTheDocument()
    })

    it('renders the repository forks', () => {
        render(<ListItem {...mockProps} />)

        const repoForks = screen.getByText(/Forks: 2/i)
        expect(repoForks).toBeInTheDocument()
    })

    it('renders the repository issues', () => {
        render(<ListItem {...mockProps} />)

        const repoIssues = screen.getByText(/Open issues: 3/i)
        expect(repoIssues).toBeInTheDocument()
    })

    it('renders the repository topics', () => {
        render(<ListItem {...mockProps} />)

        const topic1 = screen.getByText(/topic1/i)
        const topic2 = screen.getByText(/topic2/i)
        const topic3 = screen.getByText(/topic3/i)
        expect(topic1).toBeInTheDocument()
        expect(topic2).toBeInTheDocument()
        expect(topic3).toBeInTheDocument()
    })
})
