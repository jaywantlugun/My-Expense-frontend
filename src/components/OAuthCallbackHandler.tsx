// components/OAuthCallbackHandler.tsx
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUserInfo } from '../store/auth/actions';
import { useNavigate } from 'react-router';

const OAuthCallbackHandler = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserInfo(dispatch); // Dispatch the async action
      navigate('/dashboard');
    };
    fetchData();
  }, [dispatch, navigate]);

  return <div>Completing login...</div>;
};

export default OAuthCallbackHandler;
