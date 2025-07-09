import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const RoleRedirect = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      switch (user.role) {
        case 'pilot': navigate('/dashboard/pilot'); break;
        case 'it': navigate('/dashboard/it'); break;
        case 'teamlead': navigate('/dashboard/teamlead'); break;
        case 'camphead': navigate('/dashboard/camphead'); break;
        case 'ceo': navigate('/dashboard/ceo'); break;
        default: navigate('/login');
      }
    }
  }, [user]);

  return null;
};

export default RoleRedirect;
