import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const SubmitReport = () => {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: { lat: null, lng: null },
    image: null,
  });

  const [detecting, setDetecting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const detectLocation = () => {
    setDetecting(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setForm((prev) => ({
            ...prev,
            location: {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            },
          }));
          setDetecting(false);
        },
        (err) => {
          alert('Failed to get location');
          setDetecting(false);
        }
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', form.title);
    data.append('description', form.description);
    data.append('lat', form.location.lat);
    data.append('lng', form.location.lng);
    if (form.image) data.append('image', form.image);

    try {
      await axios.post('http://localhost:5000/api/reports', data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Report submitted');
    } catch (err) {
      alert('Failed to submit report');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>📝 Submit Surveillance Report</h3>

      <input name="title" placeholder="Title" onChange={handleChange} required />

      <textarea name="description" placeholder="Details" onChange={handleChange} />

      <button type="button" onClick={detectLocation} disabled={detecting}>
        {detecting ? 'Detecting...' : '📍 Detect Location'}
      </button>

      {form.location.lat && (
        <p>Detected: Lat {form.location.lat}, Lng {form.location.lng}</p>
      )}

      <input type="file" accept="image/*" onChange={handleImageChange} />

      <button type="submit">Submit Report</button>
    </form>
  );
};

export default SubmitReport;
