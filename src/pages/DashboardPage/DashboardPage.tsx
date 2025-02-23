// components/Dashboard.tsx
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchUserInfo } from '../../store/auth/actions';
import { selectCurrentUser } from '../../store/auth/selectors';

const Dashboard = () => {
  // Access the user data from the Redux store
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserInfo(dispatch); // Dispatch the async action
    };
    fetchData();
  }, [dispatch]);

  return (
    <div>
      <h1>Dashboard</h1>
      {user ? (
        <div>
          <h2>Welcome, {user.name || user.email}!</h2>
          <h3>User Details:</h3>
          <pre>{JSON.stringify(user, null, 2)}</pre>{' '}
          {/* Pretty-print user data */}
        </div>
      ) : (
        <p>No user data available. Please log in.</p>
      )}
    </div>
  );
};

export default Dashboard;
