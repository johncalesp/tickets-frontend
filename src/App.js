import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Landing, Login, Profile } from './pages';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
