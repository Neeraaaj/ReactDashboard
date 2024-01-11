import React from 'react'
import './logout.css'
import { Link } from 'react-router-dom'

const Logout = () => {
  return (
    <div className="content" >
        <div className="wrapper-1">
            <div className="wrapper-2">
                <h1>Thank you !</h1>
                <Link to="/" className="go-home">
                go home
                </Link>
            </div>
            
        </div>
    </div>
  )
}

export default Logout