export default function AboutPage() {
  return (
    <div style={{ background: '#f8fafc' }}>
      {/* Hero Section */}
      <section 
        className="hero-section" 
        style={{
          marginBottom: '30px', 
          height: '250px', 
          background: 'black'
                }}
      >
        <div className="hero-content">
          <h1 className="hero-title" style={{ color: '#f8fafc' }}>About Us</h1>
          <p className="hero-subtitle" style={{ color: '#e2e8f0' }}>Discover our story of luxury and excellence</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-8" style={{marginLeft:'40px'}}>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {/* Left Side - Content */}
          <div style={{ flex: '0 0 60%' }}>
            <h2 style={{ 
              fontSize: '1.75rem', 
              marginBottom: '1rem',
              color: '#1e293b',
              fontWeight: '600'
            }}>
              Our Story
            </h2>
            <p style={{ 
              color: '#475569',
              marginBottom: '1.5rem',
              lineHeight: '1.6'
            }}>
              Founded in 2010, Luxury Stay has been providing exceptional hospitality services for over a decade. 
              Our commitment to excellence and attention to detail has made us one of the most prestigious hotels in the region.
            </p>

            <div style={{ 
              background: '#fff',
              padding: '1.5rem',
              borderRadius: '0.5rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ 
                fontSize: '1.25rem', 
                marginBottom: '1rem',
                color: '#1e293b',
                fontWeight: '600'
              }}>
                Our Values
              </h3>
              <ul style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(2, 1fr)', 
                gap: '0.75rem' 
              }}>
                {[
                  'Excellence in Service',
                  'Attention to Detail',
                  'Customer Satisfaction',
                  'Sustainable Practices',
                  'Innovation',
                  'Community Engagement'
                ].map((value) => (
                  <li key={value} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem'
                  }}>
                    <span style={{ color: '#0ea5e9' }}>•</span>
                    <span style={{ color: '#475569' }}>{value}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ 
                fontSize: '1.25rem', 
                marginBottom: '1rem',
                color: '#1e293b',
                fontWeight: '600'
              }}>
                Why Choose Us
              </h3>
              <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                {[
                  'Prime Location',
                  'Luxury Amenities',
                  'Professional Staff',
                  'Fine Dining',
                  'Spa & Wellness',
                  'Event Spaces'
                ].map((feature) => (
                  <li key={feature} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: '#3b82f6' }}>•</span>
                    <span style={{ color: '#4b5563' }}>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Right Side - Stats */}
          <div style={{ flex: '1' }}>
            <div style={{ 
              background: '#fff',
              padding: '1.5rem',
              borderRadius: '0.5rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ 
                fontSize: '1.25rem', 
                marginBottom: '1rem',
                color: '#1e293b',
                fontWeight: '600'
              }}>
                Our Numbers
              </h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  padding: '1rem',
                  background: '#f8fafc',
                  borderRadius: '0.5rem'
                }}>
                  <span style={{ color: '#64748b' }}>Years of Experience</span>
                  <span style={{ fontWeight: '600', color: '#0ea5e9' }}>13+</span>
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  padding: '1rem',
                  background: '#f8fafc',
                  borderRadius: '0.5rem'
                }}>
                  <span style={{ color: '#64748b' }}>Luxury Rooms</span>
                  <span style={{ fontWeight: '600', color: '#0ea5e9' }}>150+</span>
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  padding: '1rem',
                  background: '#f8fafc',
                  borderRadius: '0.5rem'
                }}>
                  <span style={{ color: '#64748b' }}>Happy Guests</span>
                  <span style={{ fontWeight: '600', color: '#0ea5e9' }}>15K+</span>
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  padding: '1rem',
                  background: '#f8fafc',
                  borderRadius: '0.5rem'
                }}>
                  <span style={{ color: '#64748b' }}>Staff Members</span>
                  <span style={{ fontWeight: '600', color: '#0ea5e9' }}>100+</span>
                </div>
              </div>
            </div>

            <div style={{ 
              background: '#fff',
              padding: '1.5rem',
              borderRadius: '0.5rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ 
                fontSize: '1.25rem', 
                marginBottom: '1rem',
                color: '#1e293b',
                fontWeight: '600'
              }}>
                Contact Information
              </h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div style={{ color: '#475569' }}>
                  <strong style={{ color: '#1e293b' }}>Address:</strong><br />
                  123 Luxury Avenue<br />
                  City Center, 10001
                </div>
                <div style={{ color: '#475569' }}>
                  <strong style={{ color: '#1e293b' }}>Phone:</strong><br />
                  +1 (555) 123-4567
                </div>
                <div style={{ color: '#475569' }}>
                  <strong style={{ color: '#1e293b' }}>Email:</strong><br />
                  info@luxurystay.com
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 