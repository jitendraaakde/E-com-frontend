import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/userSlice";
import { Link } from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch()
    const userObj = useSelector(store => store.user)

    const handleLogin = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formEntries = Object.fromEntries(formData.entries());
        try {
            const response = await fetch('/api/user/login', {
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
            dispatch(loginUser(data))

        } catch (error) {
            console.error('Login failed:', error.message);
        }
    };
    console.log(userObj)

    return (
        <div className="w-full h-[90vh] flex justify-center items-center">
            <div className="w-[290px] h-[290px] bg-blue-100 p-6 rounded-[10px] text-xs">
                <h1 className="font-bold text-xl">Login</h1>
                <form className="space-y-3 my-2" onSubmit={handleLogin}>
                    <div className="space-y-2">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="userEmail"
                            id="email"
                            className="w-full p-1 px-3 rounded-[3px] outline-none border border-b-neutral-700"
                            placeholder="Enter your email"
                            required
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
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full border-[1px] border-solid border-slate-700 my-2 p-[7px] hover:bg-blue-300 rounded-[20px]"
                    >
                        Login
                    </button>
                </form>

                <p className="space-y-1">
                    Don't have an account? Please <Link className="text-blue-500" to="/register">Signup</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
