'use client'

import { useState } from 'react'

interface RoomType {
  id: string;
  name: string;
  description: string;
  price: number;
}

const roomTypes: RoomType[] = [
  {
    id: 'standard',
    name: 'Standard Room',
    description: 'Comfortable room with basic amenities',
    price: 150,
  },
  {
    id: 'premium',
    name: 'Premium Room',
    description: 'Spacious room with additional amenities and city view',
    price: 250,
  },
  {
    id: 'deluxe',
    name: 'Deluxe Suite',
    description: 'Luxury suite with separate bedroom and living area',
    price: 350,
  },
  {
    id: 'family',
    name: 'Family Suite',
    description: 'Spacious suite with two bedrooms, perfect for families',
    price: 450,
  },
]

export default function RoomTypeSelector() {
  const [selectedRoomType, setSelectedRoomType] = useState('premium')

  return (
    <div className="space-y-4">
      {roomTypes.map((room) => (
        <div 
          key={room.id}
          className={`
            border rounded-lg p-4 cursor-pointer transition-all duration-300
            ${selectedRoomType === room.id 
              ? 'border-blue-500 bg-blue-50 shadow-md' 
              : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'}
          `}
          onClick={() => setSelectedRoomType(room.id)}
        >
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-medium text-gray-800">{room.name}</h4>
              <p className="text-sm text-gray-500 mt-1">{room.description}</p>
            </div>
            <div className="text-right">
              <div className="text-blue-600 font-bold">${room.price}</div>
              <div className="text-xs text-gray-500">per night</div>
            </div>
          </div>
          <div className="mt-3 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {room.id === 'standard' && 'For 1-2 guests'}
              {room.id === 'premium' && 'For 1-2 guests'}
              {room.id === 'deluxe' && 'For 2-3 guests'}
              {room.id === 'family' && 'For 2-4 guests'}
            </div>
            <div className={`
              w-5 h-5 rounded-full border-2 
              ${selectedRoomType === room.id 
                ? 'border-blue-500 bg-blue-500' 
                : 'border-gray-300 bg-white'}
            `}>
              {selectedRoomType === room.id && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                  <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 