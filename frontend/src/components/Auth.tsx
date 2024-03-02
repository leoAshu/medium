import { Link } from "react-router-dom"

const Auth = ({ type }: { type: "signup" | "signin" }) => {
    return (
        <div className="h-screen flex flex-col justify-center">
            <div className="flex justify-center">
                <div>
                    <div className="text-3xl font-extrabold">
                        Create an account
                    </div>
                    <div className="text-slate-400">
                        Already have an account?
                        <Link className="pl-2 underline" to={"/signin"}>
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth
