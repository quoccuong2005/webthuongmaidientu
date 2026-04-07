import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { createOrderAPI } from '../data/api';
import styles from './Checkout.module.css';

const Checkout = () => {
  const { user } = useAuth();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    note: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const shippingFee = 30000; // Fake fixed shipping fee for Viettel Post
  const totalPayment = getCartTotal() + shippingFee;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      setError('Vui lòng điền đầy đủ thông tin giao hàng');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const orderData = {
        userId: user.id,
        items: cartItems,
        totalAmount: getCartTotal(),
        shippingFee,
        totalPayment,
        paymentMethod,
        paymentStatus: paymentMethod === 'vnpay' ? 'paid_mock' : 'unpaid',
        shippingMethod: 'viettel_post',
        customerInfo: formData
      };

      // Giả lập redirect qua VNPay nếu chọn VNPay
      if (paymentMethod === 'vnpay') {
        await new Promise(r => setTimeout(r, 1500));
        alert('Đang chuyển hướng sang cổng thanh toán VNPay (Giả lập)... Giao dịch thành công!');
      }

      await createOrderAPI(orderData);
      clearCart();
      alert('Đặt hàng thành công! Mã đơn hàng của bạn đã được ghi nhận.');
      navigate('/');

    } catch {
      setError('Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className={`container ${styles.checkoutPage}`}>
      <h1 className={styles.pageTitle}>Thanh toán</h1>

      <form onSubmit={handleCheckout} className={styles.layout}>
        <div className={styles.leftCol}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Thông tin giao hàng</h2>
            {error && <div className={styles.errorAlert}>{error}</div>}

            <div className={styles.formGroup}>
              <label>Họ và tên người nhận</label>
              <input type="text" name="name" className="input-field" value={formData.name} onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
              <label>Số điện thoại</label>
              <input type="tel" name="phone" className="input-field" value={formData.phone} onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
              <label>Địa chỉ nhận hàng chi tiết</label>
              <textarea name="address" className="input-field" rows="3" value={formData.address} onChange={handleChange} required></textarea>
            </div>
            <div className={styles.formGroup}>
              <label>Ghi chú đơn hàng (Tùy chọn)</label>
              <textarea name="note" className="input-field" rows="2" value={formData.note} onChange={handleChange}></textarea>
            </div>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Phương thức thanh toán</h2>
            <div className={styles.paymentMethods}>
              <label className={`${styles.paymentOption} ${paymentMethod === 'cod' ? styles.active : ''}`}>
                <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
                <div className={styles.payContent}>
                  <strong>Thanh toán khi nhận hàng (COD)</strong>
                  <p>Phí thu hộ tùy thuộc vào bên vận chuyển (Viettel Post).</p>
                </div>
              </label>

              <label className={`${styles.paymentOption} ${paymentMethod === 'vnpay' ? styles.active : ''}`}>
                <input type="radio" name="payment" value="vnpay" checked={paymentMethod === 'vnpay'} onChange={() => setPaymentMethod('vnpay')} />
                <div className={styles.payContent}>
                  <strong>Thanh toán qua VNPay</strong>
                  <p>Quét mã QR hoặc dùng thẻ ATM/Visa/MasterCard.</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className={styles.rightCol}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Đơn hàng của bạn ({cartItems.length} sản phẩm)</h2>
            <div className={styles.orderItems}>
              {cartItems.map(item => (
                <div key={item.productId} className={styles.orderItem}>
                  <img src={item.image} alt={item.name} className={styles.itemImage} />
                  <div className={styles.itemDetails}>
                    <h4>{item.name}</h4>
                    <p>SL: {item.quantity}</p>
                  </div>
                  <div className={styles.itemPrice}>
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.summaryTotals}>
              <div className={styles.summaryRow}>
                <span>Tạm tính</span>
                <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(getCartTotal())}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Phí giao hàng (Viettel Post)</span>
                <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(shippingFee)}</span>
              </div>
              <div className={styles.totalRow}>
                <span>Tổng thanh toán</span>
                <span className={styles.finalPrice}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPayment)}</span>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.125rem', marginTop: '1.5rem' }} disabled={loading}>
              {loading ? 'Đang xử lý...' : 'Xác nhận đặt hàng'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
