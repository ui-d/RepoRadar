import { useEffect, useMemo, useState } from 'react'
import Select, { SingleValue } from 'react-select'

import { customReactSelectStyles } from '@/config/reactSelectStyle'

import { Repo } from '@/types/GithubApiResponse'

interface SelectElementProps {
    repos: Repo[]
    filterReposOfSpecificLanguage: (language: string) => void
}

interface Option {
    value: string | null
    label: string | null
}

export const SelectElement = ({
    repos,
    filterReposOfSpecificLanguage,
}: SelectElementProps): JSX.Element => {
    const languages = useMemo(() => {
        return [...new Set(repos.map((repo) => repo.language).filter(Boolean))]
    }, [repos])

    const [options, setOptions] = useState<Option[]>([])

    useEffect(() => {
        const languageOptions = languages.map((language) => ({
            value: language,
            label: language,
        }))
        const allOption = { value: null, label: 'All' }
        setOptions([allOption, ...languageOptions])
    }, [languages])

    const handleLanguageChange = (selectedOption: SingleValue<Option>) => {
        if (selectedOption && selectedOption.value !== null) {
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
