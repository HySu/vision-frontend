# Vision Frontend - Firebase 인증이 포함된 React Application

Vision 화상채팅 애플리케이션의 프론트엔드 React 앱입니다. Firebase 인증 기능이 포함되어 있습니다.

## 🔥 새로운 기능

### Firebase 인증
- ✅ **익명 로그인**: 이메일 없이 빠르게 시작
- ✅ **이메일 회원가입**: 새 계정 생성
- ✅ **이메일 로그인**: 기존 계정으로 로그인
- ✅ **자동 사용자명**: Firebase 사용자 정보 기반
- ✅ **세션 관리**: 자동 로그인 상태 유지

## 🚀 시작하기

### 1. 의존성 설치
```bash
npm install
```

### 2. 백엔드 서버 실행 (필수)
먼저 `../vision-backend` 디렉토리에서 백엔드 서버를 실행해야 합니다:
```bash
cd ../vision-backend
npm install
npm run dev:https
```

### 3. 프론트엔드 실행
```bash
npm run dev        # HTTPS로 실행 (권장)
npm run start:http # HTTP로 실행 (옵션)
```

## 📋 사용 가능한 스크립트

- `npm run dev` - HTTPS 개발 서버 실행 (포트 3000)
- `npm run start:http` - HTTP 개발 서버 실행
- `npm run build` - 프로덕션 빌드
- `npm test` - 테스트 실행

## 🔧 환경 설정

`.env` 파일에서 다음 설정을 확인하세요:
- `REACT_APP_SERVER_URL` - 백엔드 서버 URL
- `REACT_APP_SOCKET_URL` - Socket.io 서버 URL
- Firebase 설정 (클라이언트용)

## 🔐 인증 플로우

### 1. 로그인/회원가입 페이지
- 이메일 회원가입/로그인
- 익명 로그인 (🎭 버튼)
- 폼 유효성 검사
- 한국어 에러 메시지

### 2. 메인 화면 (인증 후)
- 사용자 환영 메시지
- 로그아웃 버튼
- 방 ID 입력으로 화상채팅 시작

### 3. 화상채팅
- Firebase 사용자 ID가 서버로 전송
- 사용자별 고유 식별
- 채팅 메시지와 사용자 연동

## 📁 새로운 파일 구조

```
src/
├── components/
│   ├── AuthForm.js         # 로그인/회원가입 폼
│   ├── AuthForm.css        # 인증 폼 스타일
│   ├── VideoChat.js        # 화상채팅 (인증 연동)
│   ├── VideoCall.js        # 개별 비디오
│   ├── ChatBox.js          # 채팅 박스
│   └── ParticipantsList.js # 참가자 목록
├── contexts/
│   └── AuthContext.js      # 인증 컨텍스트
├── services/
│   └── authService.js      # Firebase 인증 서비스
├── config/
│   └── firebase.js         # Firebase 설정
├── utils/
│   ├── webrtc.js          # WebRTC 관리자
│   ├── socketConnection.js # Socket.io 연결
│   └── debug.js           # 디버그 유틸리티
├── App.js                 # 메인 앱 (인증 플로우)
└── App.css               # 앱 스타일 (인증 포함)
```

## 🌐 브라우저 접속

- **HTTPS**: https://localhost:3000 (권장)
- **HTTP**: http://localhost:3000 (WebRTC 제한 있음)

## 🔥 Firebase 기능

### 익명 로그인
- 이메일 없이 빠른 시작
- 임시 사용자 ID 생성
- `게스트XXXXXX` 형태의 사용자명

### 이메일 인증
- 회원가입 시 이름 설정 가능
- 로그인 상태 자동 유지
- 비밀번호 6자 이상 필수

### 자동 사용자명
- 익명: `게스트XXXXXX`
- 회원: 설정한 이름 또는 이메일

## ⚠️ 주의사항

1. **백엔드 서버 필수**: 프론트엔드만으로는 화상채팅이 동작하지 않습니다
2. **HTTPS 권장**: WebRTC는 HTTPS에서만 완전히 동작합니다
3. **Firebase 설정**: 환경변수에 올바른 Firebase 설정이 필요합니다
4. **SSL 인증서**: 자체 서명된 인증서 경고가 나타나면 "고급" → "계속 진행" 선택

## 🚀 Vercel 배포

프로젝트명을 **"vision"**으로 설정하여 `https://vision.vercel.app` 도메인으로 배포 가능합니다.

자세한 배포 가이드는 `VERCEL_SETUP.md`를 참조하세요.