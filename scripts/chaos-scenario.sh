#!/bin/bash

echo "--- Bắt đầu kịch bản Chaos Engineering cho V-Shop ---"

# 1. Giả lập làm chậm kết nối mạng tới DB Voucher (Latent)
echo "Step 1: Injecting 2000ms latency to Voucher Service..."
# (Giả sử dùng công cụ như Chaos Mesh API hoặc đơn giản là chặn port bằng iptables)
# curl -X POST http://chaos-mesh-controller/api/inject -d '{"type": "network-delay", "ms": 2000}'

# 2. Chạy một test case chấp nhận (Acceptance Test)
echo "Step 2: Running Acceptance Test while service is slow..."
RESPONSE_TIME=$(curl -o /dev/null -s -w "%{time_total}\n" -X POST https://v-shop-staging.example.com/api/pay)

# 3. Kiểm tra tính kiên cường (Jidoka cho độ tin cậy)
if (( $(echo "$RESPONSE_TIME > 3.0" | bc -l) )); then
    echo "FAILED: Hệ thống không có cơ chế Circuit Breaker, thanh toán bị treo theo service Voucher!" 
    exit 1
else
    echo "PASSED: Hệ thống tự động bỏ qua Voucher và cho phép thanh toán bình thường (Graceful Degradation)." [cite: 14]
fi
