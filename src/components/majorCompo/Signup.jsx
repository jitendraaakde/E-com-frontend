import { Link } from "react-router-dom";

const Signup = () => {
    const handleSignup = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formEntries = Object.fromEntries(formData.entries());
        try {
            const response = await fetch('/api/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formEntries),
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
        } catch (error) {
            console.error('Signup failed:', error.message);
        }
    };
    return (
        <div className="w-full h-[90vh] flex justify-center items-center">
            <div className="w-[290px] h-[400px] bg-blue-100 p-6 rounded-[10px] text-xs">
                <h1 className="font-bold text-xl">Signup</h1>
                <form className="space-y-3 my-2" onSubmit={handleSignup}>
                    <div className="space-y-2">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="userName"
                            id="name"
                            className="w-full p-1 px-3 rounded-[3px] outline-none border border-b-neutral-700"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="userEmail"
                            id="email"
                            className="w-full p-1 px-3 rounded-[3px] outline-none border border-b-neutral-700"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="userPassword"
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

                    <button
                        type="submit"
                        className="w-full border-[1px] border-solid border-slate-700 my-2 p-[7px] hover:bg-blue-500 rounded-[20px]"
                    >
                        Signup
                    </button>
                </form>

                <p className="space-y-1">
                    Already have an account? <Link className="text-blue-500" to="/login">Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
