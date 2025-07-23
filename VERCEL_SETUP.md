# Vercel 배포 설정 가이드 - Vision 프로젝트

## 🚀 빠른 배포 단계

### 1. GitHub에 코드 푸시
```bash
git init
git add .
git commit -m "Vision frontend with Firebase authentication"
git remote add origin https://github.com/your-username/vision-frontend.git
git push -u origin main
```

### 2. Vercel 프로젝트 생성
1. https://vercel.com 접속
2. "New Project" 클릭
3. GitHub 레포지토리 연결: `vision-frontend`
4. **Project Name**: `vision` (중요!)
5. Framework: `Create React App` 선택

### 3. 환경 변수 설정
Vercel 대시보드에서 다음 환경 변수 추가:

```
NODE_ENV=production
REACT_APP_SERVER_URL=https://13.54.208.52:3443
REACT_APP_SOCKET_URL=https://13.54.208.52:3443
REACT_APP_FIREBASE_API_KEY=AIzaSyAsRccRdebJCyyInJtgyOEh-28VB3uEoZM
REACT_APP_FIREBASE_AUTH_DOMAIN=vision-video-chat.firebaseapp.com
REACT_APP_FIREBASE_DATABASE_URL=https://vision-video-chat-default-rtdb.asia-southeast1.firebasedatabase.app
REACT_APP_FIREBASE_PROJECT_ID=vision-video-chat
REACT_APP_FIREBASE_STORAGE_BUCKET=vision-video-chat.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=995748643748
REACT_APP_FIREBASE_APP_ID=1:995748643748:web:04ce614d660ef00f0b3731
```

### 4. 배포 실행
- "Deploy" 버튼 클릭
- 배포 완료 후 도메인 확인

### 5. 백엔드 CORS 업데이트
EC2 서버의 `server.js`에서 Vision Vercel 도메인이 이미 추가되어 있습니다:

```javascript
origin: [
  "https://vision.vercel.app",        // 메인 도메인
  /https:\/\/vision.*\.vercel\.app$/, // Vision 프로젝트 프리뷰 도메인들
  /https:\/\/.*\.vercel\.app$/        // 모든 Vercel 도메인
]
```

프로젝트명을 "vision"으로 생성하면 자동으로 `https://vision.vercel.app` 도메인이 할당됩니다.

## ⚠️ 주의사항

1. **환경 변수**: 반드시 EC2 IP 주소를 정확히 입력
2. **HTTPS**: EC2 백엔드가 HTTPS로 실행되어야 함
3. **CORS**: 백엔드에서 Vercel 도메인 허용 필요

## 🧪 테스트

배포 후 다음을 확인하세요:
1. Vercel 앱 접속 가능
2. 브라우저 개발자 도구에서 Socket.io 연결 확인
3. 두 개의 브라우저로 화상채팅 테스트