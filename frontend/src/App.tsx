import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UsersSettings, UserLogin, SchedulePage, UsersTasks } from './pages';
import { AuthProvider, ThemeProvider } from './contexts';
import { LayoutWeb } from './contexts/layout.context';
import { Toaster } from "sonner";
import { HubPage } from './pages/hub.page';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
              <Route path = "/" element={
                
                    <HubPage/>
                } />
              <Route path="/login" element={<UserLogin />} />
              <Route path="/Schedule" element={
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
