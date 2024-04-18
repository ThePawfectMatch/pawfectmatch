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
  const [compatibilityScore, setCompatibilityScore] = useState({})
  
  useEffect(() => {
    const fetchListings = async () => {
      const response = await fetch('/api/listings', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        // dispatch({type: 'SET_LISTINGS', payload: json}) // commented out because compatibility score is final updated version
        fetchCompatibility(json)
      }
    }

    fetchListings()

  }, [dispatch])

  const fetchCompatibility = async (listings) => {
    const response = await fetch('/api/compatibility', {
      headers: {
        'Authorization': `Bearer ${user.token}`,
      },
    })
    const json = await response.json()

    if (response.ok) {
      setCompatibilityScore(json)
      console.log(json)
      console.log(listings)
      const listWithComp = listings?.map(l => ({
        ...l,
        compatibility: json[l._id] // Add new attribute and its value here
      }))

      dispatch({type: 'SET_LISTINGS', payload: listWithComp})
    }
  }

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