'use client'

import { useState } from 'react'

export default function GuestsCounter() {
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  
  const handleIncrement = (type: 'adults' | 'children') => {
    if (type === 'adults' && adults < 4) {
      setAdults(adults + 1)
    } else if (type === 'children' && children < 3) {
      setChildren(children + 1)
    }
  }
  
  const handleDecrement = (type: 'adults' | 'children') => {
    if (type === 'adults' && adults > 1) {
      setAdults(adults - 1)
    } else if (type === 'children' && children > 0) {
      setChildren(children - 1)
    }
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium text-gray-800">Adults</h4>
          <p className="text-sm text-gray-500">Ages 13+</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => handleDecrement('adults')}
            disabled={adults <= 1}
            className={`
              w-8 h-8 rounded-full flex items-center justify-center border 
              ${adults <= 1 
                ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                : 'border-blue-500 text-blue-500 hover:bg-blue-50'}
            `}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M3.75 12a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z" clipRule="evenodd" />
            </svg>
          </button>
          <span className="text-gray-700 font-medium w-6 text-center">{adults}</span>
          <button 
            onClick={() => handleIncrement('adults')}
            disabled={adults >= 4}
            className={`
              w-8 h-8 rounded-full flex items-center justify-center border 
              ${adults >= 4 
                ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                : 'border-blue-500 text-blue-500 hover:bg-blue-50'}
            `}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium text-gray-800">Children</h4>
          <p className="text-sm text-gray-500">Ages 2-12</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => handleDecrement('children')}
            disabled={children <= 0}
            className={`
              w-8 h-8 rounded-full flex items-center justify-center border 
              ${children <= 0 
                ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                : 'border-blue-500 text-blue-500 hover:bg-blue-50'}
            `}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M3.75 12a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z" clipRule="evenodd" />
            </svg>
          </button>
          <span className="text-gray-700 font-medium w-6 text-center">{children}</span>
          <button 
            onClick={() => handleIncrement('children')}
            disabled={children >= 3}
            className={`
              w-8 h-8 rounded-full flex items-center justify-center border 
              ${children >= 3 
                ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                : 'border-blue-500 text-blue-500 hover:bg-blue-50'}
            `}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
        <p className="text-sm text-blue-800">
          Total guests: <span className="font-semibold">{adults + children}</span>
        </p>
        <p className="text-xs text-blue-600 mt-1">Maximum occupancy: 6 guests per room</p>
      </div>
    </div>
  )
} 