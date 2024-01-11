import React from 'react'
import './card.css'

const Card = ({ country, intensity, rank}) => {
  return (
    <div className='card'>
                <div className='card-inner'>
                    <h3>{country} being the top {rank} with</h3>
                </div>
                <h1>{intensity} amount of Intensity</h1>
    </div>
  )
}

export default Card