import { Link } from 'react-router-dom'
import { AuthType } from '.'

interface AuthHeaderProps {
    type: AuthType
}

const AuthHeader = ({ type }: AuthHeaderProps) => {
    return (
        <div className="px-10">
            <div className="text-3xl font-extrabold">
                {type === AuthType.SIGNIN
                    ? 'Login to account'
                    : 'Create an account'}
            </div>

            <div className="text-slate-500 text-center">
                {type === AuthType.SIGNIN
                    ? "Don't have an account"
                    : 'Already have an account?'}
                <Link
                    className="pl-2 underline"
                    to={type === AuthType.SIGNIN ? '/signup' : '/signin'}
                >
                    {type === AuthType.SIGNIN ? 'Sign Up' : 'Sign In'}
                </Link>
            </div>
        </div>
    )
}

export default AuthHeader
