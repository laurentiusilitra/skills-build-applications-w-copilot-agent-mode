import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeCollection } from './api';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/workouts/`);
        const payload = await response.json();
        setWorkouts(normalizeCollection(payload, 'workouts'));
      } catch (fetchError) {
        setError('Unable to load workouts.');
      }
    };

    void fetchWorkouts();
  }, []);

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div>
      <h2>Workouts</h2>
      <div className="row g-3">
        {workouts.map((workout) => (
          <div className="col-md-6" key={workout._id ?? workout.title}>
            <article className="card h-100">
              <div className="card-body">
                <h3 className="h5">{workout.title}</h3>
                <p className="mb-1"><strong>Difficulty:</strong> {workout.difficulty}</p>
                <p className="mb-1"><strong>Focus:</strong> {workout.focusArea}</p>
                <p className="mb-1"><strong>Duration:</strong> {workout.durationMinutes} min</p>
                <p className="mb-0">
                  <strong>Equipment:</strong>{' '}
                  {(workout.equipmentNeeded ?? []).join(', ') || 'Bodyweight'}
                </p>
              </div>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workouts;
