import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="center">
      <div className="form-container">
        <h1 className="title">404 - Page Not Found</h1>
        
        <p className="error-message">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div style={{ marginTop: '2rem' }}>
          <Link href="/" className="button">
            Return Home
          </Link>

          <Link href="/rooms" className="link">
            View Our Rooms
          </Link>

          <div className="text-center mt-4 text-gray-600">
            Need assistance? Contact us at{' '}
            <a href="tel:+359877382224" className="text-blue-600 hover:underline">
              (+359) 0877382224
            </a>
          </div>
        </div>
      </div>
    </div>
  )
} 