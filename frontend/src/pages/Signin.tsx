import { AuthCard, AuthType, Quote } from '../components'

const Signin = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                <AuthCard type={AuthType.SIGNIN} />
            </div>
            <div className="invisible lg:visible">
                <Quote />
            </div>
        </div>
    )
}

export default Signin
