# Vision Frontend - React Application

Vision 화상채팅 애플리케이션의 프론트엔드 React 앱입니다.

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

## 📁 프로젝트 구조

```
src/
├── components/          # React 컴포넌트
│   ├── VideoChat.js    # 메인 화상채팅 컴포넌트
│   ├── VideoCall.js    # 개별 비디오 컴포넌트
│   ├── ChatBox.js      # 채팅 박스
│   └── ParticipantsList.js # 참가자 목록
├── utils/              # 유틸리티
│   ├── webrtc.js       # WebRTC 관리자
│   ├── socketConnection.js # Socket.io 연결
│   └── debug.js        # 디버그 유틸리티
├── App.js              # 메인 앱 컴포넌트
└── index.js            # 진입점
```

## 🌐 브라우저 접속

- **HTTPS**: https://localhost:3000 (권장)
- **HTTP**: http://localhost:3000 (WebRTC 제한 있음)

## ⚠️ 주의사항

1. **백엔드 서버 필수**: 프론트엔드만으로는 화상채팅이 동작하지 않습니다
2. **HTTPS 권장**: WebRTC는 HTTPS에서만 완전히 동작합니다
3. **SSL 인증서**: 자체 서명된 인증서 경고가 나타나면 "고급" → "계속 진행" 선택