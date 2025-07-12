import { useState, useContext } from 'react';
import API from '../Utils/axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState('login');
  const [code, setCode] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // 🚀 Function to redirect user based on their role
  const redirectToRoleDashboard = (role) => {
    switch (role) {
      case 'pilot':
        navigate('/dashboard/pilot');
        break;
      case 'teamlead':
        navigate('/dashboard/teamlead');
        break;
      case 'camphead':
        navigate('/dashboard/camphead');
        break;
      case 'ceo':
        navigate('/dashboard/ceo');
        break;
      default:
        navigate('/dashboard');
        break;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (step === 'login') {
        const res = await API.post('/auth/login', { email, password });

        if (res.data.step === 'verify') {
          setStep('verify');
        } else {
          localStorage.setItem('token', res.data.token);
          const mergedUser = { ...res.data.user, token: res.data.token };
          login(mergedUser);
          redirectToRoleDashboard(mergedUser.role);

        }
      } else if (step === 'verify') {
        const res = await API.post('/auth/verify-2fa', { email, code });

        localStorage.setItem('token', res.data.token);
        const mergedUser = { ...res.data.user, token: res.data.token };
        login(mergedUser);
        redirectToRoleDashboard(mergedUser.role);
      }

    } catch (err) {
      alert('Login failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {step === 'login' && (
        <>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            required
          />
        </>
      )}

      {step === 'verify' && (
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter 2FA Code"
          required
        />
      )}

      <button type="submit">{step === 'login' ? 'Login' : 'Verify Code'}</button>
    </form>
  );
};

export default Login;
