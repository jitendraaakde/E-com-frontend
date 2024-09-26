import { Link } from "react-router-dom";

const Profile = () => {
    const handleSignup = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formEntries = Object.fromEntries(formData.entries());
        console.log(formEntries)
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
            // Handle success - possibly redirect or display success message
        } catch (error) {
            console.error('Signup failed:', error.message);
        }
    };

    return (
        <section className="bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-1"></div>

            <div className="flex items-center justify-center px-4 py-6 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-10">
                <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
                    <h2 className="text-xl font-bold leading-tight text-black sm:text-2xl">Sign up to Celebration</h2>
                    <p className="mt-2 text-base text-gray-600">
                        Already have an account? <Link to="/login" title="" className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 focus:text-blue-700 hover:underline">Login</Link>
                    </p>

                    <form className="mt-8" onSubmit={handleSignup}>
                        <div className="space-y-3">
                            {/* Name field */}
                            <div>
                                <label htmlFor="name" className="text-base font-medium text-gray-900">First & Last name</label>
                                <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        name="userName"
                                        id="name"
                                        placeholder="Enter your full name"
                                        className="block w-full py-3 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                    />
                                </div>
                            </div>

                            {/* Email field */}
                            <div>
                                <label htmlFor="email" className="text-base font-medium text-gray-900">Email address</label>
                                <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                        </svg>
                                    </div>
                                    <input
                                        type="email"
                                        name="userEmail"
                                        id="email"
                                        placeholder="Enter email to get started"
                                        className="block w-full py-3 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                    />
                                </div>
                            </div>

                            {/* Password field */}
                            <div>
                                <label htmlFor="password" className="text-base font-medium text-gray-900">Password</label>
                                <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                                        </svg>
                                    </div>
                                    <input
                                        type="password"
                                        name="userPassword"
                                        id="password"
                                        placeholder="Enter your password"
                                        className="block w-full py-3 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center w-full px-4 py-3 text-base font-semibold text-white transition-all duration-200 border border-transparent rounded-md bg-gradient-to-r from-fuchsia-600 to-blue-600 focus:outline-none hover:opacity-80 focus:opacity-80"
                                >
                                    Sign up
                                </button>
                              <button
                        type="button"
                        class="relative inline-flex items-center justify-center w-full px-4 py-3 text-base font-semibold text-gray-700 transition-all duration-200 bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100 focus:bg-gray-100 hover:text-black focus:text-black focus:outline-none"
                    >
                        <div class="absolute inset-y-0 left-0 p-4">
                            <svg class="w-6 h-6 text-rose-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"
                                ></path>
                            </svg>
                        </div>
                        Sign up with Google
                    </button>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Profile;
