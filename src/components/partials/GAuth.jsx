import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { app } from '../../store/firebase'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../store/userSlice'
const GAuth = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)

            const result = await signInWithPopup(auth, provider)

            const response = await fetch('https://e-comm-backend-ugos.onrender.com/api/users/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: result.user.displayName, email: result.user.email, image: result.user.photoURL })
            })
            const data = await response.json()
            dispatch(loginUser(data.user))
            if (data.success) {
                navigate('/')
            }
        } catch (error) {
            console.log('Could not signin with google', error)
        }
    }
    return <button
        type="button" onClick={handleGoogleClick}
        className="relative inline-flex items-center justify-center w-full px-4 py-3 text-base font-semibold text-gray-700 transition-all duration-200 bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100 focus:bg-gray-100 hover:text-black focus:text-black focus:outline-none"
    >
        <div className="absolute inset-y-0 left-0 p-[0.8rem] ">
            <svg className="w-6 h-6 text-cyan-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path
                    d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"
                ></path>
            </svg>
        </div>
        Sign up with Google
    </button>
}
export default GAuth