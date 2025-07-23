import React, { useState } from 'react';
import authService from '../services/authService';
import './AuthForm.css';

function AuthForm({ onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    displayName: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // 에러 클리어
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!isLogin && !formData.displayName.trim()) {
      newErrors.displayName = '이름을 입력해주세요.';
    }

    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '유효한 이메일 주소를 입력해주세요.';
    }

    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요.';
    } else if (formData.password.length < 6) {
      newErrors.password = '비밀번호는 6자 이상이어야 합니다.';
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    
    try {
      let result;
      
      if (isLogin) {
        result = await authService.signInWithEmail(formData.email, formData.password);
      } else {
        result = await authService.signUpWithEmail(
          formData.email, 
          formData.password, 
          formData.displayName
        );
      }

      if (result.success) {
        onAuthSuccess(result.user);
      } else {
        setErrors({ general: result.error });
      }
    } catch (error) {
      setErrors({ general: '예상치 못한 오류가 발생했습니다.' });
    } finally {
      setLoading(false);
    }
  };

  const handleAnonymousLogin = async () => {
    setLoading(true);
    
    try {
      const result = await authService.signInAnonymously();
      if (result.success) {
        onAuthSuccess(result.user);
      } else {
        setErrors({ general: result.error });
      }
    } catch (error) {
      setErrors({ general: '익명 로그인에 실패했습니다.' });
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      displayName: '',
      confirmPassword: ''
    });
    setErrors({});
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <div className="auth-header">
          <h1>Vision</h1>
          <p>실시간 화상채팅 플랫폼</p>
        </div>

        {errors.general && (
          <div className="error-message">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form-container">
          {!isLogin && (
            <div className="form-group">
              <input
                type="text"
                name="displayName"
                placeholder="이름"
                value={formData.displayName}
                onChange={handleInputChange}
                className={errors.displayName ? 'error' : ''}
                disabled={loading}
              />
              {errors.displayName && <span className="error-text">{errors.displayName}</span>}
            </div>
          )}

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="이메일"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? 'error' : ''}
              disabled={loading}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="비밀번호"
              value={formData.password}
              onChange={handleInputChange}
              className={errors.password ? 'error' : ''}
              disabled={loading}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          {!isLogin && (
            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="비밀번호 확인"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={errors.confirmPassword ? 'error' : ''}
                disabled={loading}
              />
              {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
            </div>
          )}

          <button 
            type="submit" 
            className="auth-button primary"
            disabled={loading}
          >
            {loading ? '처리 중...' : (isLogin ? '로그인' : '회원가입')}
          </button>
        </form>

        <div className="auth-divider">
          <span>또는</span>
        </div>

        <button 
          onClick={handleAnonymousLogin}
          className="auth-button anonymous"
          disabled={loading}
        >
          🎭 익명으로 시작하기
        </button>

        <div className="auth-toggle">
          {isLogin ? (
            <p>
              계정이 없으신가요? 
              <button onClick={toggleMode} className="toggle-button">
                회원가입
              </button>
            </p>
          ) : (
            <p>
              이미 계정이 있으신가요? 
              <button onClick={toggleMode} className="toggle-button">
                로그인
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthForm;