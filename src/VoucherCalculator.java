public class VoucherCalculator {
    public double calculateFinalPrice(double cartTotal, double shippingFee, double voucherValue) {
        double finalPrice = cartTotal + shippingFee - voucherValue;
        return Math.max(0, finalPrice); // Fix: Chặn tiền âm
    }
}
