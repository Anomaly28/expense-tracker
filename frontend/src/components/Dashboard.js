// src/components/Dashboard.js
import React, { useState } from "react";
import UploadReceipt from "./UploadReceipt";
import ExpenseTable from "./ExpensesTable";
import AnalyticsCharts from "./AnalyticsCharts";

const Dashboard = ({ user, onLogout }) => {
const [refreshKey, setRefreshKey] = useState(0);
  const handleLogout = () => {

    if (onLogout) {
      onLogout();
    }
  };
const handleUploadComplete = () => {
    // 👇 bump the key to trigger re-fetch in AnalyticsCharts
    setRefreshKey((prev) => prev + 1);
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      fontFamily: 'Arial, sans-serif',
      padding: '0',
      margin: '0'
    },
    header: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
      borderBottom: '3px solid #667eea',
      padding: '20px 0',
      position: 'sticky',
      top: '0',
      zIndex: '100'
    },
    headerContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    logoIcon: {
      width: '50px',
      height: '50px',
      background: 'linear-gradient(45deg, #667eea, #764ba2)',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
    },
    logoText: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#333',
      margin: '0'
    },
    logoSubtext: {
      fontSize: '14px',
      color: '#667eea',
      fontWeight: '600',
      margin: '0'
    },
    userSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px'
    },
    userInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      background: 'linear-gradient(45deg, #f093fb, #f5576c)',
      padding: '12px 20px',
      borderRadius: '25px',
      boxShadow: '0 4px 15px rgba(240, 147, 251, 0.3)'
    },
    userAvatar: {
      width: '40px',
      height: '40px',
      background: 'linear-gradient(45deg, #4facfe, #00f2fe)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '18px'
    },
    userName: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: '16px',
      margin: '0'
    },
    userEmail: {
      color: 'rgba(255,255,255,0.8)',
      fontSize: '12px',
      margin: '0'
    },
    logoutButton: {
      background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
      color: 'white',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '25px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    main: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 24px'
    },
    welcomeSection: {
      textAlign: 'center',
      marginBottom: '40px'
    },
    welcomeCard: {
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      borderRadius: '25px',
      padding: '40px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
      border: '2px solid rgba(255,255,255,0.3)'
    },
    welcomeTitle: {
      fontSize: '48px',
      fontWeight: 'bold',
      background: 'linear-gradient(45deg, #667eea, #764ba2, #f093fb)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: '16px'
    },
    welcomeSubtitle: {
      fontSize: '20px',
      color: '#555',
      fontWeight: '600'
    },
    sectionsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
      gap: '30px',
      marginBottom: '30px'
    },
    sectionCard: {
      borderRadius: '25px',
      overflow: 'hidden',
      boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'pointer'
    },
    uploadSection: {
      background: 'linear-gradient(135deg, #11998e, #38ef7d)'
    },
    analyticsSection: {
      background: 'linear-gradient(135deg, #667eea, #764ba2)'
    },
    expenseSection: {
      background: 'linear-gradient(135deg, #f093fb, #f5576c)',
      gridColumn: '1 / -1'
    },
    sectionHeader: {
      padding: '30px',
      color: 'white'
    },
    sectionHeaderContent: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px'
    },
    sectionIcon: {
      width: '60px',
      height: '60px',
      background: 'rgba(255,255,255,0.2)',
      borderRadius: '15px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '30px'
    },
    sectionTitle: {
      fontSize: '28px',
      fontWeight: 'bold',
      margin: '0 0 8px 0'
    },
    sectionSubtitle: {
      fontSize: '16px',
      opacity: '0.9',
      margin: '0'
    },
    sectionContent: {
      background: 'white',
      padding: '30px',
      minHeight: '200px'
    },
    featureCards: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
      marginTop: '40px'
    },
    featureCard: {
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      padding: '30px',
      textAlign: 'center',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      transition: 'transform 0.3s ease',
      cursor: 'pointer',
      border: '2px solid rgba(255,255,255,0.3)'
    },
    featureIcon: {
      fontSize: '48px',
      marginBottom: '16px'
    },
    featureTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '8px'
    },
    featureDesc: {
      fontSize: '14px',
      color: '#666',
      lineHeight: '1.5'
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logo}>
            <div style={styles.logoIcon}>
              💰
            </div>
            <div>
              <h1 style={styles.logoText}>ExpenseTracker Pro</h1>
              <p style={styles.logoSubtext}>Smart Financial Management</p>
            </div>
          </div>
          
          <div style={styles.userSection}>
            <div style={styles.userInfo}>
              <div style={styles.userAvatar}>
                {user?.displayName?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div>
                <p style={styles.userName}>{user?.displayName || 'User'}</p>
                <p style={styles.userEmail}>{user?.email}</p>
              </div>
            </div>
            
            <button
              style={styles.logoutButton}
              onClick={handleLogout}
              onMouseOver={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 6px 20px rgba(255, 107, 107, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 4px 15px rgba(255, 107, 107, 0.3)';
              }}
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        {/* Welcome Section */}
        <div style={styles.welcomeSection}>
          <div style={styles.welcomeCard}>
            <h2 style={styles.welcomeTitle}>
              🎉 Welcome back, {user?.displayName?.split(' ')[0] || 'User'}!
            </h2>
            <p style={styles.welcomeSubtitle}>
              🚀 Ready to track your expenses and achieve your financial goals?
            </p>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div style={styles.sectionsGrid}>
          {/* Upload Receipt Section */}
          <div 
            style={{...styles.sectionCard, ...styles.uploadSection}}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.2)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
            }}
          >
            <div style={styles.sectionHeader}>
              <div style={styles.sectionHeaderContent}>
                <div style={styles.sectionIcon}>📤</div>
                <div>
                  <h3 style={styles.sectionTitle}>Upload Receipt</h3>
                  <p style={styles.sectionSubtitle}>📸 Snap & Track Instantly!</p>
                </div>
              </div>
            </div>
            <div style={styles.sectionContent}>
              <UploadReceipt onUploadComplete={handleUploadComplete} />

            </div>
          </div>

          {/* Analytics Section */}
          <div 
            style={{...styles.sectionCard, ...styles.analyticsSection}}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.2)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
            }}
          >
            <div style={styles.sectionHeader}>
              <div style={styles.sectionHeaderContent}>
                <div style={styles.sectionIcon}>📊</div>
                <div>
                  <h3 style={styles.sectionTitle}>Analytics Dashboard</h3>
                  <p style={styles.sectionSubtitle}>📈 Smart Insights & Trends</p>
                </div>
              </div>
            </div>
            <div style={styles.sectionContent}>
              <AnalyticsCharts uid={user?.uid} refreshKey={refreshKey} />

            </div>
          </div>
        </div>

        {/* Expense Table Section - Full Width */}
        <div 
          style={{...styles.sectionCard, ...styles.expenseSection}}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.2)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
          }}
        >
          <div style={styles.sectionHeader}>
            <div style={styles.sectionHeaderContent}>
              <div style={styles.sectionIcon}>📋</div>
              <div>
                <h3 style={styles.sectionTitle}>Expense Overview</h3>
                <p style={styles.sectionSubtitle}>💼 All Your Transactions in One Place</p>
              </div>
            </div>
          </div>
          <div style={styles.sectionContent}>
            <ExpenseTable uid={user?.uid} />
          </div>
        </div>

        {/* Feature Cards */}
        <div style={styles.featureCards}>
          <div 
            style={styles.featureCard}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={styles.featureIcon}>🎯</div>
            <h4 style={styles.featureTitle}>AI-Powered</h4>
            <p style={styles.featureDesc}>Smart receipt scanning with machine learning technology</p>
          </div>
          
          <div 
            style={styles.featureCard}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={styles.featureIcon}>⚡</div>
            <h4 style={styles.featureTitle}>Lightning Fast</h4>
            <p style={styles.featureDesc}>Real-time expense tracking and instant analytics</p>
          </div>
          
          <div 
            style={styles.featureCard}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={styles.featureIcon}>🔒</div>
            <h4 style={styles.featureTitle}>Bank-Level Security</h4>
            <p style={styles.featureDesc}>Your financial data is completely safe and encrypted</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;