import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeCollection } from './api';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/users/`);
        const payload = await response.json();
        setUsers(normalizeCollection(payload, 'users'));
      } catch (fetchError) {
        setError('Unable to load users.');
      }
    };

    void fetchUsers();
  }, []);

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div>
      <h2>Users</h2>
      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Fitness Level</th>
              <th>Team</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id ?? user.email}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.fitnessLevel ?? 'n/a'}</td>
                <td>{user.teamName ?? 'Unassigned'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
