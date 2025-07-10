import { useState, useContext } from 'react';
import API from '../Utils/axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'pilot' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', form);
      login(res.data);
      navigate('/login'); // Redirect to login after successful registration
      alert('Registration successful! Please log in.');
    } catch (err) {
      alert('Registration failed: ' + err.response.data.message  || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input name="name" placeholder="Full Name" onChange={handleChange} required />
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <select name="role" onChange={handleChange}>
        <option value="pilot">Pilot</option>
        <option value="it">IT Staff</option>
        <option value="teamlead">Team Lead</option>
        <option value="camphead">Camp Head</option>
        <option value="ceo">CEO</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
