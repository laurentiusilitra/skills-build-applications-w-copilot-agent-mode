import { NavLink, Outlet } from 'react-router-dom';
import './App.css';

const navItems = [
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' }
];

function App() {
  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1 className="display-5 mb-2">OctoFit Tracker</h1>
        <p className="text-secondary mb-3">
          Multi-tier fitness tracker UI connected to the Node.js API.
        </p>
        <nav className="d-flex flex-wrap gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              className={({ isActive }) =>
                `btn ${isActive ? 'btn-dark' : 'btn-outline-dark'}`
              }
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
