import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    // Giả lập 50 người dùng ảo tăng dần trong 30 giây
    stages: [
        { duration: '10s', target: 20 }, // Tăng lên 20 users
        { duration: '10s', target: 50 }, // Tăng lên 50 users (Peak load)
        { duration: '10s', target: 0 },  // Giảm về 0
    ],
    thresholds: {
        // Poka-Yoke cho hiệu năng: Nếu hơn 5% yêu cầu bị lỗi hoặc phản hồi > 2s thì tạch
        http_req_failed: ['rate<0.05'], 
        http_req_duration: ['p(95)<2000'], 
    },
};

export default function () {
    const url = 'https://v-shop-staging.example.com/api/calculate-voucher';
    const payload = JSON.stringify({
        cartTotal: 100.0,
        shippingFee: 20.0,
        voucherValue: 150.0 
    });

    const params = {
        headers: { 'Content-Type': 'application/json' },
    };

    const res = http.post(url, payload, params);

    // Kiểm tra kết quả trả về phải là 0.0 (đã áp dụng Poka-Yoke) 
    check(res, {
        'status is 200': (r) => r.status === 200,
        'final price is non-negative': (r) => JSON.parse(r.body).finalPrice >= 0,
    });

    sleep(1);
}
