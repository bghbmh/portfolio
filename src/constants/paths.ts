// my-portfolio/src/constants/paths.ts
import path from 'path';

// 내 위치: /Users/.../wow-project/my-portfolio
const ROOT = process.cwd();

// ✅ 1. DB 및 업로드 경로는 현재 내 폴더 내부이므로 그대로 유지합니다.
export const DB_PATH = path.join(ROOT, 'data', 'myDB.json');
export const UPLOAD_DIR = path.join(ROOT, 'public', 'uploads');


// 확인용 로그
console.log('--- 🖥️ 포트폴리오 경로 체크 ---');
console.log('DB 경로:', DB_PATH);
console.log('-----------------------------');