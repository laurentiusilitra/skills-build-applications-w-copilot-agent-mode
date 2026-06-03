import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeCollection } from './api';

const Leaderboard = () => {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/leaderboard/`);
        const payload = await response.json();
        setEntries(normalizeCollection(payload, 'leaderboard'));
      } catch (fetchError) {
        setError('Unable to load leaderboard.');
      }
    };

    void fetchLeaderboard();
  }, []);

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div>
      <h2>Leaderboard</h2>
      <ol className="list-group list-group-numbered">
        {entries.map((entry) => (
          <li className="list-group-item d-flex justify-content-between" key={entry._id}>
            <span>
              {entry.userId?.name ?? 'Unknown'}
              {' - '}
              {entry.teamId?.name ?? 'No team'}
            </span>
            <strong>{entry.points} pts</strong>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Leaderboard;
