import { useState, useContext } from 'react';
import API from '../../Utils/axios';
import { AuthContext } from '../../context/AuthContext';

const UploadTrend = () => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleFileChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result); // Base64 encoded image
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/api/trends', { title, description, imageUrl });
      alert('Trend uploaded successfully!');
      setTitle('');
      setDescription('');
      setImageUrl('');
    } catch (err) {
      alert('Failed to upload: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: 'auto' }}>
      <h2>📤 Upload Surveillance Trend</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ marginBottom: 10 }}
      />

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{ display: 'block', width: '100%', padding: 8, marginBottom: 10 }}
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        rows={4}
        style={{ display: 'block', width: '100%', padding: 8, marginBottom: 10 }}
      />

      <input
        placeholder="Image URL (optional)"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        style={{ display: 'block', width: '100%', padding: 8, marginBottom: 10 }}
      />

      <button type="submit" style={{ padding: '8px 16px' }}>Upload</button>
    </form>
  );
};

export default UploadTrend;
