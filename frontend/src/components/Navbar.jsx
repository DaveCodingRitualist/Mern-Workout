import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
const Navbar = () => {
const { logout } = useLogout()
const { user } = useAuthContext()
  const handleClick = () => {
    logout()
  }
  return (
    <header>
     <div className="container">
        <Link to='/'>
            <h1 className='my-title'>Workout Buddy</h1>
        </Link>
        <nav>
        {user && <div>
          {/* <span>{user.email}  </span> */}
          <button onClick={handleClick}>Log out</button>
        </div>}
        {!user && <>
          <Link to='/login'>Login</Link>
          <Link to='/signup'>Signup</Link>
        </>
        }
        </nav>
        
     </div>
    </header>
  )
}

export default Navbar
