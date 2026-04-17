import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class VoucherCalculatorTest {
    @Test
    public void testVoucherExceedsTotal() {
        VoucherCalculator calc = new VoucherCalculator();
        double result = calc.calculateFinalPrice(100.0, 20.0, 150.0);
        assertEquals(0.0, result, "Gia cuoi cung khong duoc am!");
    }
}
