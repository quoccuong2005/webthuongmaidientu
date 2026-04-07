import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Search, Heart, Bell, MessageSquare, ChevronDown, MapPin, Camera } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import styles from './MainLayout.module.css';

const MainLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={`container ${styles.headerContainer}`}>

          {/* Top Navigation Row */}
          <div className={styles.topNav}>
            {/* Left Section */}
            <div className={styles.navLeft}>
              <Link to="/" className={styles.logo}>
                {/* Mock Logo using Text */}
                <span className={styles.logoText}>chợ<span className={styles.logoSpan}>Tốt</span></span>
              </Link>
              <button className={styles.navLinkButton}>
                Dành cho người bán <ChevronDown size={16} />
              </button>
            </div>

            {/* Center Section (Nav Links) */}
            <nav className={styles.navCenter}>
              <Link to="/" className={styles.navLinkActive}>Chợ Tốt</Link>
              <Link to="/" className={styles.navLink}>Xe cộ</Link>
              <Link to="/" className={styles.navLink}>Bất động sản</Link>
              <Link to="/" className={styles.navLink}>Việc làm</Link>
            </nav>

            {/* Right Section (Actions) */}
            <div className={styles.navRight}>
              <button className={styles.iconBtn} title="Tin đăng đã lưu">
                <Heart size={20} />
              </button>
              <button className={styles.iconBtn} title="Thông báo">
                <Bell size={20} />
              </button>
              <button className={styles.iconBtnText}>
                <MessageSquare size={20} />
                <span>Liên hệ</span>
              </button>

              {user ? (
                <div className={styles.userMenu}>
                  <Link to="/profile" className={styles.iconBtnText}>
                    <span>{user.name || 'Tài khoản'}</span>
                  </Link>
                  <button onClick={handleLogout} className={styles.iconBtnText} title="Đăng xuất">
                    <span>Đăng xuất</span>
                  </button>
                </div>
              ) : (
                <Link to="/login" className={styles.iconBtnText}>
                  <span>Đăng nhập</span>
                </Link>
              )}

              <Link to="/post" className={styles.postBtn}>
                <Camera size={18} />
                <span>Đăng tin</span>
              </Link>
            </div>
          </div>

          {/* Hero Text */}
          <h1 className={styles.heroText}>Giá tốt, gần bạn, chốt nhanh!</h1>

          {/* Search Bar Container */}
          <div className={styles.searchBarWrapper}>
            <div className={styles.searchBar}>
              <button className={styles.categoryBtn}>
                Danh mục <ChevronDown size={16} />
              </button>

              <div className={styles.searchInputWrapper}>
                <Search size={18} className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Tìm sản phẩm..."
                  className={styles.searchInput}
                />
              </div>

              <button className={styles.locationBtn}>
                <MapPin size={18} color="#f59e0b" />
                <span>Chọn khu vực</span>
                <ChevronDown size={16} />
              </button>

              <button className={styles.searchBtn}>
                Tìm kiếm
              </button>
            </div>
          </div>

        </div>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <div className={`container ${styles.footerGrid}`}>
          <div className={styles.footerCol}>
            <h4>Về Chợ Tốt</h4>
            <ul>
              <li><Link to="/">Giới thiệu</Link></li>
              <li><Link to="/">Quy chế hoạt động</Link></li>
              <li><Link to="/">Chính sách bảo mật</Link></li>
            </ul>
          </div>
          <div className={styles.footerCol}>
            <h4>Hỗ trợ khách hàng</h4>
            <ul>
              <li><Link to="/">Trung tâm trợ giúp</Link></li>
              <li><Link to="/">An toàn mua bán</Link></li>
              <li><Link to="/">Liên hệ hỗ trợ</Link></li>
            </ul>
          </div>
          <div className={styles.footerCol}>
            <h4>Liên kết</h4>
            <ul>
              <li><Link to="/">Facebook</Link></li>
              <li><Link to="/">Youtube</Link></li>
              <li><Link to="/">TikTok</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
