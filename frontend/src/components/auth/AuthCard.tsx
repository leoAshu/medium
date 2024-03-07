import { SigninType, SignupType } from '@ashu_leo/common'
import { AuthHeader, AuthType, SigninForm, SignupForm } from '.'

interface AuthCardProps {
    type: AuthType
}

const AuthCard = ({ type }: AuthCardProps) => {
    const sendRequest = (payload: SigninType | SignupType) => {
        console.log(payload)
        alert(JSON.stringify(payload))
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
