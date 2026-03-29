import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <div className={styles.productCard}>
      <Link to={`/product/${product.id}`} className={styles.imageLink}>
        <img src={product.image} alt={product.name} className={styles.image} />
      </Link>
      
      <div className={styles.content}>
        <Link to={`/product/${product.id}`}>
          <h3 className={styles.title}>{product.name}</h3>
        </Link>
        
        <div className={styles.priceContainer}>
          <span className={styles.price}>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(product.price / 25000)}</span>
          {/* Using a rough conversion to USD for aesthetic match to the image */}
        </div>
      </div>
      
      <div className={styles.actionArea}>
         <button 
           onClick={handleAddToCart}
           className={`btn btn-primary ${styles.addToCartBtn}`}
           disabled={product.stock === 0}
         >
           {product.stock === 0 ? 'OUT OF STOCK' : 'ADD TO BAG'}
         </button>
      </div>
    </div>
  );
};

export default ProductCard;
