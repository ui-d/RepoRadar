// reactSelectStyles.ts
import { StylesConfig } from 'react-select'

type OptionType = {
    value: string | null
    label: string | null
}

export const customReactSelectStyles: StylesConfig<OptionType, false> = {
    control: (provided) => ({
        ...provided,
        minHeight: '40px',
        fontSize: '16px',
        width: '200px',
        background: '#909090',
        borderColor: '#5b5b5b',
    }),
    menu: (provided) => ({
        ...provided,
        fontSize: '16px',
        background: '#909090',
        borderColor: '#5b5b5b',
    }),
    option: (provided, state) => ({
        ...provided,
        cursor: 'pointer',
        color: state.isSelected ? '#fff' : '#000',
        backgroundColor: state.isSelected ? '#2684ff' : 'transparent',
    }),
    singleValue: (provided) => ({
        ...provided,
        color: '#000',
    }),
}
