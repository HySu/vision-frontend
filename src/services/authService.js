import { auth } from '../config/firebase';
import { 
  signInAnonymously, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth';

class AuthService {
  constructor() {
    this.currentUser = null;
    this.authListeners = [];
  }

  // 인증 상태 변화 리스너
  onAuthStateChange(callback) {
    this.authListeners.push(callback);
    return onAuthStateChanged(auth, (user) => {
      this.currentUser = user;
      callback(user);
    });
  }

  // 현재 사용자 가져오기
  getCurrentUser() {
    return this.currentUser || auth.currentUser;
  }

  // 익명 로그인
  async signInAnonymously() {
    try {
      const result = await signInAnonymously(auth);
      console.log('익명 로그인 성공:', result.user.uid);
      return {
        success: true,
        user: result.user,
        isAnonymous: true
      };
    } catch (error) {
      console.error('익명 로그인 오류:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // 이메일/비밀번호 회원가입
  async signUpWithEmail(email, password, displayName) {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // 사용자 프로필 업데이트
      if (displayName) {
        await updateProfile(result.user, {
          displayName: displayName
        });
      }

      console.log('회원가입 성공:', result.user.uid);
      return {
        success: true,
        user: result.user,
        isAnonymous: false
      };
    } catch (error) {
      console.error('회원가입 오류:', error);
      return {
        success: false,
        error: this.getErrorMessage(error.code)
      };
    }
  }

  // 이메일/비밀번호 로그인
  async signInWithEmail(email, password) {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log('로그인 성공:', result.user.uid);
      return {
        success: true,
        user: result.user,
        isAnonymous: false
      };
    } catch (error) {
      console.error('로그인 오류:', error);
      return {
        success: false,
        error: this.getErrorMessage(error.code)
      };
    }
  }

  // 로그아웃
  async signOut() {
    try {
      await signOut(auth);
      this.currentUser = null;
      console.log('로그아웃 성공');
      return { success: true };
    } catch (error) {
      console.error('로그아웃 오류:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // 사용자 표시명 가져오기
  getUserDisplayName() {
    const user = this.getCurrentUser();
    if (!user) return '게스트';
    
    if (user.isAnonymous) {
      return `게스트${user.uid.substring(0, 6)}`;
    }
    
    return user.displayName || user.email || '사용자';
  }

  // 에러 메시지 한국어화
  getErrorMessage(errorCode) {
    const errorMessages = {
      'auth/email-already-in-use': '이미 사용 중인 이메일입니다.',
      'auth/weak-password': '비밀번호는 6자 이상이어야 합니다.',
      'auth/invalid-email': '유효하지 않은 이메일 주소입니다.',
      'auth/user-not-found': '존재하지 않는 사용자입니다.',
      'auth/wrong-password': '잘못된 비밀번호입니다.',
      'auth/too-many-requests': '너무 많은 시도가 있었습니다. 잠시 후 다시 시도하세요.',
      'auth/network-request-failed': '네트워크 오류가 발생했습니다.',
      'auth/invalid-credential': '잘못된 로그인 정보입니다.'
    };
    
    return errorMessages[errorCode] || '인증 오류가 발생했습니다.';
  }

  // 사용자 인증 여부 확인
  isAuthenticated() {
    return !!this.getCurrentUser();
  }

  // 익명 사용자 여부 확인
  isAnonymous() {
    const user = this.getCurrentUser();
    return user ? user.isAnonymous : false;
  }
}

export default new AuthService();