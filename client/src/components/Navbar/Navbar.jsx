import React,{ useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import logo from '../../assets/logo.png'
import search1 from '../../assets/search-solid.svg'
import Avatar from '../../components/Avatar/Avatar'
import { useSelector, useDispatch } from 'react-redux'
import decode from 'jwt-decode'
import './Navbar.css'
import { setCurrentUser } from '../../actions/currentUser'

const Navbar = () => {
    const dispatch = useDispatch()
    var User = useSelector((state) => (state.currentUserReducer))
    const navigate = useNavigate()

    const handelLogout = () => {
      dispatch({type: 'LOGOUT'});
      navigate('/')
      dispatch(setCurrentUser(null))
    }

    useEffect(()=>{
      const token = User?.token
      if(token){
        const decodedToken = decode(token)
        if(decodedToken.exp * 1000 < new Date().getTime()){
          handelLogout()
        }
      }
      dispatch(setCurrentUser(JSON.parse(localStorage.getItem('profile'))))
    },[dispatch])


  return (
    <nav className='main-nav'>
        <div className='navbar'>
            <Link to='/' className='nav-item nav-logo'>
                <img src={logo} alt='logo' />
            </Link>
            <Link to='/' className='nav-item nav-btn'>About</Link>
            <Link to='/' className='nav-item nav-btn'>Products</Link>
            <Link to='/' className='nav-item nav-btn'>For Teams</Link>
            <form>
                <input type='text' placeholder='Search...' />
                <img src= { search1 } alt='search' className='search-icon' width="18" />
            </form>

            { User === null ?
              <Link to='/Auth' className='nav-item nav-links'>Log in</Link> :
              <>
                <Avatar backgroundColor='#009dff' px="10px" py="7px" borderRadius="50%" color='white'><Link to={`/Users/${User?.result?._id}`} style={{color:"white", textDecoration:'none'}}>{User.result.name.charAt(0).toUpperCase()}</Link></Avatar>
                <button className='nav-item nav-links' onClick={handelLogout}>Log Out</button>
              </>
            }
        </div>
    </nav>
  )
}

export default Navbar