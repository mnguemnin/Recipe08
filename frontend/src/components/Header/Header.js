import React from 'react';
import classes from './header.module.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
 



export default function Header() {
    
    const {user, logout}=useAuth();
  return (
   <header className={classes.header}>
    <div className={classes.container}>
    <Link to="/" className={classes.logo}>
            Recipes🥦🌽🥐!
    </Link>
      <nav>
               <ul> {
                    user?(
                    <li className={classes.menu_container}>
                        <Link to='/profile'>{user.name}</Link>
                        <div className={classes.menu}>
                            <Link to='/profile'>profile</Link>
                            <Link to='/addRecipe'>Add Recipe</Link>
                            <a onClick={logout}>Logout</a>

                        </div>

                    </li>):(
                        <Link to='/login'>Login</Link>
                    )
                }
                
          </ul>  
        </nav>
    </div>
   </header>
  )
}
