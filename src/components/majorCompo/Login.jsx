const Login = () => {
    return <>
        <div className="w-full h-[90vh]  flex justify-center items-center">
            <div className="w-[290px] h-[290px] bg-blue-100 p-6 rounded-[10px] text-xs">
                <h1 className="font-bold text-xl">Login</h1>
                <form className="space-y-3 my-2">
                    <div className="space-y-2">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="w-full p-1 px-3 rounded-[3px] outline-none border border-b-neutral-700"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="w-full p-1 px-3 rounded-[3px] outline-none border border-b-neutral-700"
                            placeholder="Enter your password"
                        />
                    </div>
                </form>

                <p className="space-y-1">
                    Don't Have Account Please <a className="text-blue-500" href="/register">Signup</a>
                </p>

                <button className="w-full border-[1px] border-solid border-slate-700 my-2 p-[7px] hover:bg-blue-300 rounded-[20px]">
                    Login
                </button>
            </div>
        </div>
    </>
}
export default Login