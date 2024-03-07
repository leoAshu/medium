import { FormEvent, useState } from 'react'
import { SigninType } from '@ashu_leo/common'
import { LabelledInput } from '.'

interface SigninFormProps {
    signinHandler: (payload: SigninType) => void
}

const SigninForm = ({ signinHandler }: SigninFormProps) => {
    const [formData, setFormData] = useState<SigninType>({
        email: '',
        password: '',
    })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        signinHandler(formData)
    }

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <LabelledInput
                type="email"
                label="Email"
                placeholder="m@example.com"
                onChange={(e) => {
                    setFormData((c) => ({
                        ...c,
                        email: e.target.value,
                    }))
                }}
            />

            <LabelledInput
                type="password"
                label="Password"
                placeholder=""
                onChange={(e) => {
                    setFormData((c) => ({
                        ...c,
                        password: e.target.value,
                    }))
                }}
            />

            <button
                type="submit"
                className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            >
                Sign In
            </button>
        </form>
    )
}

export default SigninForm
