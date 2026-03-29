import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from './Auth.module.css';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '', address: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password || !formData.name) {
      setError('Vui lòng nhập Tên, Email và Mật khẩu');
      return;
    }
    
    try {
      setError('');
      setLoading(true);
      await register(formData);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Đăng ký thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authBox}>
        <div className={styles.header}>
          <h2>Đăng Ký</h2>
          <p>Tạo tài khoản TechStore</p>
        </div>
        
        {error && <div className={styles.errorAlert}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="name">Họ và tên *</label>
            <input 
              type="text" 
              id="name"
              className="input-field" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="Nguyễn Văn A"
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">Email *</label>
            <input 
              type="email" 
              id="email"
              className="input-field" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="email@example.com"
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Mật khẩu *</label>
            <input 
              type="password" 
              id="password"
              className="input-field" 
              value={formData.password} 
              onChange={handleChange} 
              placeholder="******"
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="phone">Số điện thoại</label>
            <input 
              type="tel" 
              id="phone"
              className="input-field" 
              value={formData.phone} 
              onChange={handleChange} 
              placeholder="0912..."
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading} style={{width: '100%', marginTop: '1rem'}}>
            {loading ? 'Đang xử lý...' : 'Đăng ký'}
          </button>
        </form>

        <p className={styles.footerText}>
          Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
