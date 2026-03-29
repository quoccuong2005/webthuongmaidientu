import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import styles from './Cart.module.css';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className={`container ${styles.emptyCart}`}>
        <div className={styles.emptyIcon}>🛒</div>
        <h2>Giỏ hàng của bạn đang trống</h2>
        <p>Hãy tham khảo thêm các sản phẩm tuyệt vời của TechStore nhé!</p>
        <Link to="/" className="btn btn-primary" style={{marginTop: '2rem'}}>Tiếp tục mua sắm</Link>
      </div>
    );
  }

  return (
    <div className={`container ${styles.cartPage}`}>
      <h1 className={styles.pageTitle}>Giỏ hàng</h1>
      
      <div className={styles.layout}>
        <div className={styles.cartItems}>
          {cartItems.map(item => (
            <div key={item.productId} className={styles.cartItemCard}>
              <img src={item.image} alt={item.name} className={styles.itemImage} />
              <div className={styles.itemInfo}>
                 <Link to={`/product/${item.productId}`} className={styles.itemName}>{item.name}</Link>
                 <div className={styles.itemPrice}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</div>
              </div>
              <div className={styles.itemActions}>
                <div className={styles.quantityPicker}>
                  <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className={styles.qBtn}>-</button>
                  <input type="number" readOnly value={item.quantity} className={styles.qInput} />
                  <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className={styles.qBtn}>+</button>
                </div>
                <button 
                  onClick={() => removeFromCart(item.productId)} 
                  className={styles.removeBtn}
                  title="Xóa sản phẩm"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.summarySection}>
          <div className={styles.summaryCard}>
            <h2 className={styles.summaryTitle}>Tóm tắt đơn hàng</h2>
            
            <div className={styles.summaryRow}>
              <span>Tạm tính:</span>
              <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(getCartTotal())}</span>
            </div>
            <div className={styles.summaryRow}>
               <span>Phí vận chuyển (dự kiến):</span>
               <span>Tới bước thanh toán</span>
            </div>
            
            <div className={styles.totalRow}>
              <span>Tổng cộng:</span>
              <span className={styles.totalPrice}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(getCartTotal())}</span>
            </div>

            <button 
               className={`btn btn-primary ${styles.checkoutBtn}`} 
               onClick={() => navigate('/checkout')}
            >
              Tiến hành thanh toán <ArrowRight size={18} />
            </button>
            <Link to="/" className={styles.continueLink}>Tiếp tục mua sắm</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
