import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, Heart, ArrowLeft } from 'lucide-react';
import { getProductByIdAPI, getCategoriesAPI, addReviewAPI } from '../data/api';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import styles from './ProductDetails.module.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  
  const [product, setProduct] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [reviewText, setReviewText] = useState('');
  const [ratingInput, setRatingInput] = useState(5);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const data = await getProductByIdAPI(id);
      if (data) {
        setProduct(data);
        const cats = await getCategoriesAPI();
        const cat = cats.find(c => c.id === data.categoryId);
        if (cat) setCategoryName(cat.name);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      navigate('/cart');
    }
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Vui lòng đăng nhập để đánh giá");
      return;
    }
    if (!reviewText.trim()) return;
    
    try {
      const updatedProduct = await addReviewAPI(product.id, {
        userId: user.id,
        userName: user.name,
        rating: ratingInput,
        comment: reviewText
      });
      setProduct(updatedProduct);
      setReviewText('');
    } catch (err) {
      alert("Có lỗi xảy ra khi gửi đánh giá");
    }
  };

  if (loading) return <div className="container" style={{padding: '5rem 0', textAlign: 'center'}}>Đang tải sản phẩm...</div>;
  if (!product) return <div className="container" style={{padding: '5rem 0', textAlign: 'center'}}>Không tìm thấy sản phẩm.</div>;

  return (
    <div className={`container ${styles.detailsPage}`}>
      <button className={styles.backBtn} onClick={() => navigate(-1)}>
        <ArrowLeft size={20} /> Quay lại
      </button>

      <div className={styles.productLayout}>
        <div className={styles.imageSection}>
          <img src={product.image} alt={product.name} className={styles.mainImage} />
        </div>

        <div className={styles.infoSection}>
          <div className={styles.breadcrumbs}>
            <span>Trang chủ</span> / <span>{categoryName}</span> / <span className={styles.currentCrumb}>{product.name}</span>
          </div>

          <h1 className={styles.title}>{product.name}</h1>
          
          <div className={styles.meta}>
            <div className={styles.rating}>
              <Star fill="currentColor" size={18} className={styles.starIcon} />
              <span>{product.rating.toFixed(1)}</span>
              <span className={styles.reviewCount}>({product.reviews?.length || 0} đánh giá)</span>
            </div>
            <span className={styles.separator}>|</span>
            <div className={styles.stock}>Tình trạng: <span className={product.stock > 0 ? styles.inStock : styles.outOfStock}>{product.stock > 0 ? `Còn ${product.stock} sản phẩm` : 'Hết hàng'}</span></div>
          </div>

          <div className={styles.priceContainer}>
            <span className={styles.price}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}</span>
            {product.originalPrice > product.price && (
              <span className={styles.originalPrice}>
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.originalPrice)}
              </span>
            )}
            {product.originalPrice > product.price && (
               <span className="badge badge-pending" style={{marginLeft: '1rem'}}>-{Math.round(100 - (product.price/product.originalPrice)*100)}%</span>
            )}
          </div>

          <div className={styles.description}>
            <p>{product.description}</p>
          </div>

          <div className={styles.actions}>
            <div className={styles.quantityPicker}>
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className={styles.qBtn}>-</button>
              <input type="number" min="1" max={product.stock} value={quantity} onChange={e => setQuantity(parseInt(e.target.value) || 1)} className={styles.qInput} />
              <button onClick={() => setQuantity(q => Math.min(product.stock, q + 1))} className={styles.qBtn}>+</button>
            </div>

            <button 
              className={`btn btn-primary ${styles.addToCartBig}`} 
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <ShoppingCart size={20} />
              Thêm vào giỏ hàng
            </button>

            <button className={`btn btn-outline ${styles.wishlistBtn}`}>
              <Heart size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className={styles.reviewsSection}>
        <h2 className={styles.sectionTitle}>Đánh giá sản phẩm</h2>
        
        <div className={styles.reviewsList}>
          {product.reviews && product.reviews.length > 0 ? (
            product.reviews.map(review => (
              <div key={review.id} className={styles.reviewCard}>
                <div className={styles.reviewHeader}>
                  <div className={styles.reviewerAvatar}>{review.userName.charAt(0)}</div>
                  <div className={styles.reviewerInfo}>
                    <h4>{review.userName}</h4>
                    <div className={styles.reviewRating}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} color={i < review.rating ? "var(--warning-color)" : "var(--text-muted)"} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className={styles.reviewComment}>{review.comment}</p>
              </div>
            ))
          ) : (
             <p className={styles.noReviews}>Chưa có đánh giá nào. Hãy là người đầu tiên!</p>
          )}
        </div>

        {/* Add Review Form */}
        <div className={styles.addReviewForm}>
           <h3>Thêm đánh giá của bạn</h3>
           {user ? (
             <form onSubmit={handleAddReview}>
               <div className={styles.ratingSelect}>
                 <span>Đánh giá: </span>
                 <select value={ratingInput} onChange={e => setRatingInput(Number(e.target.value))} className="input-field" style={{width: 'auto', padding: '0.5rem'}}>
                   <option value={5}>5 Sao (Tuyệt vời)</option>
                   <option value={4}>4 Sao (Tốt)</option>
                   <option value={3}>3 Sao (Bình thường)</option>
                   <option value={2}>2 Sao (Kém)</option>
                   <option value={1}>1 Sao (Tệ)</option>
                 </select>
               </div>
               <textarea 
                 className="input-field" 
                 rows="4" 
                 placeholder="Nhận xét của bạn về sản phẩm..."
                 value={reviewText}
                 onChange={e => setReviewText(e.target.value)}
                 style={{marginBottom: '1rem', resize: 'vertical'}}
               ></textarea>
               <button type="submit" className="btn btn-primary">Gửi đánh giá</button>
             </form>
           ) : (
             <p>Vui lòng <a href="/login" style={{color: 'var(--primary-color)', fontWeight: '600'}}>đăng nhập</a> để gửi đánh giá.</p>
           )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
