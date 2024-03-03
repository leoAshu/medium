import { SignupType } from '@ashu_leo/common'
import { ChangeEvent, useState } from 'react'
import { Link } from 'react-router-dom'

const Auth = ({ type }: { type: 'signup' | 'signin' }) => {
    const [, setPostInputs] = useState<SignupType>({
        name: '',
        email: '',
        password: '',
    })

    return (
        <div className="h-screen flex flex-col justify-center">
            <div className="flex justify-center">
                <div>
                    <div className="px-10">
                        <div className="text-3xl font-extrabold">
                            Create an account
                        </div>
                        <div className="text-slate-500">
                            Already have an account?
                            <Link className="pl-2 underline" to={'/signin'}>
                                Login
                            </Link>
                        </div>
                    </div>

                    <div className="mt-4">
                        <LabelledInput
                            type="text"
                            label="Name"
                            placeholder="Enter your name"
                            onChange={(e) => {
                                setPostInputs((c) => ({
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
                                setPostInputs((c) => ({
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
                                setPostInputs((c) => ({
                                    ...c,
                                    password: e.target.value,
                                }))
                            }}
                        />

                        <button
                            type="button"
                            className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                        >
                            {type === 'signup' ? 'Sign Up' : 'Sign In'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

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

export default Auth
