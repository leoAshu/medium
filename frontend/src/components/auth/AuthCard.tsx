import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { SigninType, SignupType } from '@ashu_leo/common'

import cfg from '../../config'
import { AuthHeader, AuthType, SigninForm, SignupForm } from '.'

interface AuthCardProps {
    type: AuthType
}

const AuthCard = ({ type }: AuthCardProps) => {
    const navigate = useNavigate()

    const sendRequest = async (payload: SigninType | SignupType) => {
        const url = `${cfg.API_BASE_URL}/${
            type === AuthType.SIGNIN ? cfg.SIGNIN_ENDPOINT : cfg.SIGNUP_ENDPOINT
        }`

        try {
            const response = await axios.post(url, payload)
            const token = response.data.token

            if (response.data.error) {
                alert(response.data.error)
                return
            }

            console.log('token: ', token)
            localStorage.setItem(cfg.JWT_KEY, token)
            navigate('/blogs')
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className="h-screen flex flex-col justify-center">
            <div className="flex justify-center">
                <div>
                    <AuthHeader type={type} />

                    <>
                        {type === AuthType.SIGNIN ? (
                            <SigninForm signinHandler={sendRequest} />
                        ) : (
                            <SignupForm signupHandler={sendRequest} />
                        )}
                    </>
                </div>
            </div>
        </div>
    )
}

export default AuthCard
