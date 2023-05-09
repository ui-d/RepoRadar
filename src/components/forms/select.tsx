import { useMemo } from 'react'
import Select, { SingleValue } from 'react-select'

import { customReactSelectStyles } from '@/config/reactSelectStyle'

import { Repo } from '@/types/GithubApiResponse'

interface SelectElementProps {
    repos: Repo[]
    filterReposOfSpecificLanguage: (language: string | null) => void
}

interface Option {
    value: string | null
    label: string | null
}

export const SelectElement = ({
    repos,
    filterReposOfSpecificLanguage,
}: SelectElementProps): JSX.Element => {
    const options = useMemo(() => {
        const languages = [
            ...new Set(repos.map((repo) => repo.language).filter(Boolean)),
        ]
        const languageOptions = languages.map((language) => ({
            value: language,
            label: language,
        }))
        const allOption = { value: null, label: 'All' }
        return [allOption, ...languageOptions]
    }, [repos])

    const handleLanguageChange = (selectedOption: SingleValue<Option>) => {
        if (selectedOption) {
            filterReposOfSpecificLanguage(selectedOption.value)
        }
    }

    return (
        <Select
            onChange={(selected) => handleLanguageChange(selected)}
            placeholder="All"
            options={options}
            styles={customReactSelectStyles}
        />
    )
}
