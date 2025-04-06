'use client'

import { useState } from 'react'

export default function BookingButton() {
  const [isLoading, setIsLoading] = useState(false)
  
  const handleBookingClick = () => {
    setIsLoading(true)
    
    
    setTimeout(() => {
      setIsLoading(false)
     
      window.location.href = '/booking/available-rooms'
    }, 1500)
  }
  
  return (
    <button
      onClick={handleBookingClick}
      disabled={isLoading}
      className={`
        w-full py-4 px-6 rounded-lg text-white font-medium
        transition-all duration-300 relative
        ${isLoading 
          ? 'bg-blue-400 cursor-not-allowed' 
          : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-1'}
      `}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <span>Check Room Availability</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 ml-2" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>
      )}
    </button>
  )
} 