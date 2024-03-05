import { useEffect }from 'react'
import { useListingsContext } from "../hooks/useListingsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import '../index.css'

// components
import CardDetails from '../components/Card'
import Navbar from '../components/Navbar'
import CardDisplay from '../components/CardDisplay'

const Main = () => {
  const {listings, dispatch} = useListingsContext()
  const {user} = useAuthContext()
  
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

  return (
    <div>
        <Navbar />
        <div className="main">
        <div className="listings">
            {listings && <CardDisplay listing={listings}></CardDisplay>}
        </div>
        </div>
        <div className="listing-button">
          <Link to="/Listing">
            <button>List</button>
          </Link>
        </div>
    </div>
  )
}

export default Main