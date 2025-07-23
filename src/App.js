import React, { useState } from 'react';
import VideoChat from './components/VideoChat';
import AuthForm from './components/AuthForm';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import './App.css';

function AppContent() {
  const { isAuthenticated, loading, getUserDisplayName, logout } = useAuth();
  const [roomId, setRoomId] = useState('');
  const [isJoined, setIsJoined] = useState(false);

  const handleAuthSuccess = (user) => {
    console.log('인증 성공:', user);
  };

  const handleJoinRoom = () => {
    if (roomId.trim()) {
      setIsJoined(true);
    }
  };

  const handleLeaveRoom = () => {
    setIsJoined(false);
  };

  const handleLogout = async () => {
    await logout();
    setIsJoined(false);
    setRoomId('');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>로딩 중...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthForm onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <div className="App">
      {!isJoined ? (
        <div className="join-container">
          <div className="join-form">
            <div className="user-info">
              <span className="welcome-text">
                안녕하세요, {getUserDisplayName()}님!
              </span>
              <button onClick={handleLogout} className="logout-btn">
                로그아웃
              </button>
            </div>
            
            <h1>Vision - 다중 화상 채팅</h1>
            <p className="join-description">
              방 ID를 입력하여 화상채팅을 시작하세요
            </p>
            
            <div className="input-group">
              <input
                type="text"
                placeholder="방 ID (예: room123)"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="input-field"
                onKeyPress={(e) => e.key === 'Enter' && handleJoinRoom()}
              />
            </div>
            
            <button 
              onClick={handleJoinRoom} 
              className="join-btn"
              disabled={!roomId.trim()}
            >
              방 입장하기
            </button>
            
            <div className="room-tips">
              <p>💡 <strong>팁:</strong> 같은 방 ID를 사용하는 사용자들과 화상채팅을 할 수 있습니다</p>
            </div>
          </div>
        </div>
      ) : (
        <VideoChat 
          userName={getUserDisplayName()} 
          roomId={roomId} 
          onLeave={handleLeaveRoom}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;