import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UsersSettings, UserLogin, SchedulePage } from './pages';
import { AuthProvider, ThemeProvider } from './contexts';
import { LayoutWeb } from './contexts/layout.context';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<UserLogin />} />
            <Route path="/" element={
              <LayoutWeb>
                <SchedulePage />
              </LayoutWeb>
            } />
            <Route path="/Users" element={
              <LayoutWeb>
                <UsersSettings />
              </LayoutWeb>
            } />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
