import { useEffect } from 'react'
import { useListingsContext } from "../hooks/useListingsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import '../styles/main.css'

// components
import Navbar from '../components/Navbar'
import CardDisplay from '../components/CardDisplay'

const Main = () => {
  const {listings, dispatch} = useListingsContext()
  const {user} = useAuthContext()
  const [isInView, setInView] = useState(false)
  
  useEffect(() => {
    const fetchListings = async () => {
      const response = await fetch('/api/listings', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_LISTINGS', payload: json})
      }
    }

    fetchListings()
  }, [dispatch])


  const handleView = () => {
    setInView(!isInView)
    console.log(isInView)
  }

  return (
    <div>
        <Navbar />
      <div className={`filters-container ${isInView ? 'inView' : ''}`}>
          <div className='filters-tab'>
            <img src="/images/filters_tab.png" alt="-" onClick={handleView}/>
          </div>
          <div className='filters'>
            <h1>Filters</h1>
          </div>
        </div>
        <div className="main">
            {listings && <CardDisplay listing={listings}></CardDisplay>}
        </div>
    </div>
  )
}

export default Main