import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Search, User, ShoppingBag, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import styles from './MainLayout.module.css';

const MainLayout = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={`container ${styles.headerContent}`}>
          <Link to="/" className={styles.brand}>
            ELECTRA
          </Link>

          <nav className={styles.navMenu}>
            <Link to="/" className={styles.navLink}>PRODUCTS</Link>
            <Link to="/" className={styles.navLink}>LAPTOPS</Link>
            <Link to="/" className={styles.navLink}>PHONES</Link>
            <Link to="/" className={styles.navLink}>AUDIO</Link>
            <Link to="/" className={styles.navLink}>ACCESSORIES</Link>
            <Link to="/" className={styles.navLink}>SUPPORT</Link>
          </nav>

          <div className={styles.actions}>
            <button className={styles.actionBtn} aria-label="Search">
              <Search size={18} />
              <span className={styles.actionText}>SEARCH</span>
            </button>

            {user ? (
              <div className={styles.userMenu}>
                <Link to="/profile" className={styles.actionBtn}>
                   <User size={18} />
                   <span className={styles.actionText}>ACCOUNT</span>
                </Link>
                {['admin', 'staff'].includes(user.role) && (
                  <Link to={`/${user.role}`} className={styles.dashboardLink}>DASHBOARD</Link>
                )}
                <button onClick={handleLogout} className={styles.actionBtn} title="Đăng xuất">
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <Link to="/login" className={styles.actionBtn}>
                <User size={18} />
                <span className={styles.actionText}>ACCOUNT</span>
              </Link>
            )}

            <Link to="/cart" className={styles.actionBtn}>
              <ShoppingBag size={18} />
              <span className={styles.actionText}>BAG</span>
              {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
            </Link>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <div className={`container ${styles.footerGrid}`}>
          <div className={styles.footerCol}>
            <h4>Discover</h4>
            <ul>
              <li><Link to="/">Shop</Link></li>
              <li><Link to="/">Phones</Link></li>
              <li><Link to="/">Contact us</Link></li>
            </ul>
          </div>
          <div className={styles.footerCol}>
            <h4>Electra Store</h4>
            <ul>
              <li><Link to="/">Electra Store</Link></li>
              <li><Link to="/">Phones</Link></li>
              <li><Link to="/">Returns</Link></li>
            </ul>
          </div>
          <div className={styles.footerCol}>
            <h4>Account</h4>
            <ul>
              <li><Link to="/">About</Link></li>
              <li><Link to="/">Careers</Link></li>
              <li><Link to="/">Contact us</Link></li>
            </ul>
          </div>
          <div className={styles.footerCol}>
            <h4>Support</h4>
            <ul>
              <li><Link to="/">Accessories</Link></li>
              <li><Link to="/">Payment options</Link></li>
              <li><Link to="/">Terms</Link></li>
            </ul>
          </div>
        </div>
        
        <div className={`container ${styles.footerBottom}`}>
          <div className={styles.copyright}>
            <p>&copy; 2024 Electra - All rights reserved.</p>
          </div>
          <div className={styles.paymentIcons}>
            <span className={styles.payIcon}>VISA</span>
            <span className={styles.payIcon}>Pay</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
