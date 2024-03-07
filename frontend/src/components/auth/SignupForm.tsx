import { FormEvent, useState } from 'react'
import { SignupType } from '@ashu_leo/common'
import { LabelledInput } from '.'

interface SignupFormProps {
    signupHandler: (payload: SignupType) => void
}

const SignupForm = ({ signupHandler }: SignupFormProps) => {
    const [formData, setFormData] = useState<SignupType>({
        name: '',
        email: '',
        password: '',
    })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        signupHandler(formData)
    }

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <LabelledInput
                type="text"
                label="Name"
                placeholder="Enter your name"
                onChange={(e) => {
                    setFormData((c) => ({
                        ...c,
                        name: e.target.value,
                    }))
                }}
            />

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
                Sign Up
            </button>
        </form>
    )
}

export default SignupForm
