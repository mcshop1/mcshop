// app.js

const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// EJS 템플릿 엔진 사용 설정
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 정적 파일을 위한 설정 (CSS, 이미지 등)
app.use(express.static('public'));

// POST 요청을 처리할 수 있도록 설정
app.use(express.urlencoded({ extended: true }));

// 고객 입력 정보를 저장할 배열 (메모리에 저장)
let customerData = [];

// 기본 페이지 (홈페이지) 라우트
app.get('/', (req, res) => {
    res.render('index');  // views/index.ejs 파일을 렌더링
});

// 폼 제출 후 처리 라우트
app.post('/buy', (req, res) => {
    const { characterName, depositorName, phoneNumber, quantity } = req.body;
    const totalPrice = quantity * 280;  // 1개당 280원

    // 고객이 입력한 정보 객체로 저장
    const customerInfo = {
        characterName,
        depositorName,
        phoneNumber,
        quantity,
        totalPrice
    };

    // 배열에 고객 정보 추가
    customerData.push(customerInfo);

    // 콘솔에 고객 입력 정보 출력 (관리자만 확인)
    console.log("고객이 입력한 정보:");
    console.log(customerInfo);

    // 구매한 정보 표시
    res.render('confirmation', {
        characterName,
        depositorName,
        phoneNumber,
        quantity,
        totalPrice,
        bankInfo: '국민은행 557502-04-153451 최유림'  // 입금 계좌 정보
    });
});

// 관리자가 볼 수 있는 고객 데이터 페이지 (관리자만 볼 수 있음)
app.get('/admin', (req, res) => {
    // 관리자만 볼 수 있도록 고객 데이터를 전달
    res.render('admin', { customerData });
});

// 서버 실행
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
