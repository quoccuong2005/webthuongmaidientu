import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { getProductsAPI } from '../data/api';
import { Home as IconHome, Car, Cat, Armchair, Guitar, Baby, Briefcase, Tv, Plus } from 'lucide-react';
import styles from './Home.module.css';

const categories = [
  { id: 1, name: 'Bất động sản', icon: IconHome, color: '#f59e0b' },
  { id: 2, name: 'Xe cộ', icon: Car, color: '#3b82f6' },
  { id: 3, name: 'Thú cưng', icon: Cat, color: '#ec4899' },
  { id: 4, name: 'Đồ gia dụng', icon: Armchair, color: '#8b5cf6' },
  { id: 5, name: 'Giải trí, Thể thao', icon: Guitar, color: '#10b981' },
  { id: 6, name: 'Mẹ và bé', icon: Baby, color: '#f43f5e' },
  { id: 7, name: 'Dịch vụ, Du lịch', icon: Briefcase, color: '#6366f1' },
  { id: 8, name: 'Việc làm', icon: Briefcase, color: '#f59e0b' },
  { id: 9, name: 'Đồ điện tử', icon: Tv, color: '#14b8a6' },
  { id: 10, name: 'Tất cả danh mục', icon: Plus, color: '#64748b' },
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Dành cho bạn');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const prods = await getProductsAPI();
      setProducts(prods);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className={`container ${styles.homeContainer}`}>

      {/* Categories Section */}
      <section className={styles.categorySection}>
        <div className={styles.categoryGrid}>
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div key={cat.id} className={styles.categoryItem}>
                <div className={styles.iconCircle} style={{ color: cat.color }}>
                  <Icon size={32} strokeWidth={1.5} />
                </div>
                <span className={styles.categoryName}>{cat.name}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Product Feed Section */}
      <section className={styles.productSection}>
        <div className={styles.tabsWrapper}>
          <div className={styles.tabsNav}>
            {['Dành cho bạn', 'Mới nhất', 'Video'].map((tab) => (
              <button
                key={tab}
                className={`${styles.tabBtn} ${activeTab === tab ? styles.tabBtnActive : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.feedContent}>
          {loading ? (
            <div className={styles.loading}>Đang tải sản phẩm...</div>
          ) : products.length > 0 ? (
            <div className={`grid grid-cols-4 ${styles.productGrid}`}>
              {/* Product list will render here using the new ProductCard styling */}
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>Chưa có sản phẩm nào.</p>
            </div>
          )}
        </div>
      </section>

    </div>
  );
};

export default Home;
