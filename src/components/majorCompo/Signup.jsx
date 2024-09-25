const Signup = () => {
    return (
        <div className="w-full h-[90vh] flex justify-center items-center">
            <div className="w-[290px] h-[400px] bg-blue-100 p-6 rounded-[10px] text-xs">
                <h1 className="font-bold text-xl">Signup</h1>
                <form className="space-y-3 my-2">
                    <div className="space-y-2">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="w-full p-1 px-3 rounded-[3px] outline-none border border-b-neutral-700"
                            placeholder="Enter your name"
                        />
                    </div>

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

                    <div className="space-y-2">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            className="w-full p-1 px-3 rounded-[3px] outline-none border border-b-neutral-700"
                            placeholder="Confirm your password"
                        />
                    </div>
                </form>

                <p className="space-y-1">
                    Already have an account? <a className="text-blue-500" href="/login">Sign in</a>
                </p>

                <button className="w-full border-[1px] border-solid border-slate-700 my-2 p-[7px] hover:bg-blue-500 rounded-[20px]">
                    Signup
                </button>
            </div>
        </div>
    );
};

export default Signup;
