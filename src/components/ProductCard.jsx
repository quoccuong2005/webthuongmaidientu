import { Link } from 'react-router-dom';
import { Heart, User } from 'lucide-react';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  // Format price in VND
  const formattedPrice = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(product.price);

  return (
    <div className={styles.productCard}>
      <Link to={`/product/${product.id}`} className={styles.cardLink}>
        <div className={styles.imageWrapper}>
          <img src={product.image} alt={product.name} className={styles.image} />
          {/* Optional Promoted Badge */}
          {product.id === 'p1' && <span className={styles.badge}>Tin tiêu biểu</span>}
          {/* Heart icon top right */}
          <button
            className={styles.heartBtn}
            onClick={(e) => { e.preventDefault(); /* block link navigation */ }}
            aria-label="Lưu tin"
          >
            <Heart size={16} />
          </button>
        </div>

        <div className={styles.content}>
          <h3 className={styles.title} title={product.name}>{product.name}</h3>

          <div className={styles.priceContainer}>
            <span className={styles.price}>{formattedPrice}</span>
          </div>

          <div className={styles.footer}>
            <div className={styles.userInfo}>
              <div className={styles.avatarPlaceholder}>
                <User size={10} color="#fff" />
              </div>
            </div>
            <div className={styles.metaInfo}>
              <span>hôm qua</span>
              <span>·</span>
              <span>Hà Nội</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
