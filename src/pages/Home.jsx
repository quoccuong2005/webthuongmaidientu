import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getProductsAPI } from '../data/api';
import styles from './Home.module.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <div className={`container ${styles.home}`}>
      <section className={styles.hero}>
        <div className={styles.heroLayout}>
          <div className={styles.heroImageContainer}>
            {/* Using MacBook from mock data or a placeholder that represents the hero */}
            <img 
               src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1200" 
               alt="MacBook Pro" 
               className={styles.heroImage} 
            />
          </div>
          <div className={styles.heroContent}>
            <p className={styles.heroSubtitle}>The new MacBook Pro.<br/>Power. Performance. Innovation.</p>
            <h1 className={styles.heroTitle}>MacBook Pro M3 Pro</h1>
            <p className={styles.heroPrice}>$2,499</p>
            <Link to="/product/p2" className={`btn btn-primary ${styles.heroBtn}`}>SHOP NOW</Link>
          </div>
        </div>
      </section>

      <section className={styles.productSection}>
        {loading ? (
          <div className={styles.loading}>Loading products...</div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-4">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p>No products available.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
