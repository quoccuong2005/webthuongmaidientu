import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from './Auth.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      // Determine redirection based on role
      const users = JSON.parse(localStorage.getItem('ec_current_user') || '{}');
      if (users.role === 'admin') navigate('/admin');
      else if (users.role === 'staff') navigate('/staff');
      else navigate('/');
    } catch (err) {
      setError(err.message || 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authBox}>
        <div className={styles.header}>
          <h2>Đăng Nhập</h2>
          <p>Truy cập vào TechStore</p>
        </div>
        
        {error && <div className={styles.errorAlert}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email"
              className="input-field" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="admin@demo.com"
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Mật khẩu</label>
            <input 
              type="password" 
              id="password"
              className="input-field" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="123"
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading} style={{width: '100%', marginTop: '1rem'}}>
            {loading ? 'Đang xử lý...' : 'Đăng nhập'}
          </button>
        </form>

        <p className={styles.footerText}>
          Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
        </p>
        <p className={styles.demoText}>
          Tài khoản Demo:<br/>
          Admin: admin@demo.com / 123<br/>
          Staff: staff@demo.com / 123<br/>
          Khách: customer@demo.com / 123
        </p>
      </div>
    </div>
  );
};

export default Login;
