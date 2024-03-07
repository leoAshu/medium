import { ChangeEvent } from 'react'

interface LabelledInputProps {
    type: string
    label: string
    placeholder: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const LabelledInput = ({
    type,
    label,
    placeholder,
    onChange,
}: LabelledInputProps) => {
    return (
        <>
            <label
                htmlFor={`input_${label}`}
                className="block mt-4 mb-1 text-sm font-semibold text-gray-900"
            >
                {label}
            </label>

            <input
                required
                type={type}
                id={`input_${label}`}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder={placeholder}
                onChange={onChange}
            />
        </>
    )
}

export default LabelledInput
