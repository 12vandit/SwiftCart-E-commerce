import React from 'react';
import HomeHeader from './HomeHeader';
import Footer from './Footer';

export default function PaymentSuccess() {
  return (
    <>
      <HomeHeader />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh - 160px)', // Adjust for header and footer heights
        }}
      >
        <div
          style={{
            padding: '20px',
            border: '1px solid #4CAF50',
            borderRadius: '10px',
            maxWidth: '500px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: '48px',
              color: '#4CAF50',
              marginBottom: '20px',
            }}
          >
            <i className="fa fa-check-circle" aria-hidden="true"></i>
          </div>
          <h1 style={{ color: '#4CAF50' }}>Payment Successful!</h1>
          <p style={{ fontSize: '18px', color: '#555' }}>
            Thank you for your purchase. Your payment has been processed
            successfully.
          </p>
          <p style={{ fontSize: '16px', color: '#777' }}>
            You will receive an email confirmation shortly.
          </p>
          <a href="/" style={{ textDecoration: 'none' }}>
            <button
              style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                fontSize: '16px',
                cursor: 'pointer',
                marginTop: '20px',
              }}
            >
              Go to Homepage
            </button>
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}
