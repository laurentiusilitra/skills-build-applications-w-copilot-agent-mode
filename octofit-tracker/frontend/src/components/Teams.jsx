import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeCollection } from './api';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/teams/`);
        const payload = await response.json();
        setTeams(normalizeCollection(payload, 'teams'));
      } catch (fetchError) {
        setError('Unable to load teams.');
      }
    };

    void fetchTeams();
  }, []);

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div>
      <h2>Teams</h2>
      <div className="row g-3">
        {teams.map((team) => (
          <div className="col-md-6" key={team._id ?? team.name}>
            <div className="card h-100">
              <div className="card-body">
                <h3 className="h5">{team.name}</h3>
                <p>{team.description}</p>
                <p className="mb-1"><strong>Total points:</strong> {team.totalPoints}</p>
                <p className="mb-0">
                  <strong>Members:</strong>{' '}
                  {(team.members ?? []).map((member) => member.name).join(', ') || 'None'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teams;
