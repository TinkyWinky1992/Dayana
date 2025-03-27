import  {useEffect} from 'react';
import { useAuth } from '../contexts';
import { useNavigate } from 'react-router-dom';
import { UsersTable } from '../components';
import { UsersTaskProvider } from '../hooks';

export const UsersSettings = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
  }, [user, navigate]);

  return (
    <div className="flex-1 w-full h-full overflow-hidden">
      <div className="h-full w-full overflow-auto px-4 py-4">
        <UsersTaskProvider>
          <UsersTable/>
        </UsersTaskProvider>
      </div>
    </div>
  );
}
