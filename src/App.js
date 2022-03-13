import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Landing, Login, Profile, Dashboard, PageTickets } from './pages';
import { PrivateRoute, NavBar } from './components';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/main"
          element={
            <PrivateRoute>
              <NavBar />
            </PrivateRoute>
          }
        >
          <Route
            path="profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="tickets"
            element={
              <PrivateRoute>
                <PageTickets />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
