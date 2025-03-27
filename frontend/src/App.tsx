import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UsersSettings, UserLogin, SchedulePage, UsersTasks } from './pages';
import { AuthProvider, ThemeProvider } from './contexts';
import { LayoutWeb } from './contexts/layout.context';
import { Toaster } from "sonner";

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
            
              <Route path="/usertasks" element={
                  <LayoutWeb>
                    <UsersTasks/>
                  </LayoutWeb>
                } />
            </Routes>
          </Router>
        <Toaster
          position="bottom-right"
          dir='rtl'
          theme='light'
          richColors={true}
          
        />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
