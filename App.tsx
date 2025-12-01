import React, { useState, useEffect } from 'react';
import { LoginForm } from './components/LoginForm';
import { SignupForm } from './components/SignupForm';
import { Dashboard } from './components/Dashboard';
import { User } from './types';
import { supabase } from './services/supabaseClient';

type AuthView = 'login' | 'signup';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [authView, setAuthView] = useState<AuthView>('login');
  const [initializing, setInitializing] = useState(true);
  const [authMessage, setAuthMessage] = useState<string | null>(null);

  // Helper to map Supabase user to our App User type
  const mapSupabaseUser = (sbUser: any): User => {
    const metadata = sbUser.user_metadata || {};
    return {
      username: sbUser.email || '', 
      name: metadata.full_name || sbUser.email?.split('@')[0] || 'User',
      avatarUrl: metadata.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(metadata.full_name || 'User')}&background=random`
    };
  };

  useEffect(() => {
    // 1. Check for errors in the URL hash (e.g. expired magic links)
    const hash = window.location.hash;
    if (hash && hash.includes('error=')) {
      const params = new URLSearchParams(hash.substring(1)); // Remove the '#'
      const errorDescription = params.get('error_description');
      if (errorDescription) {
        setAuthMessage(errorDescription.replace(/\+/g, ' '));
        // Clean up the URL
        window.history.replaceState(null, '', window.location.pathname);
      }
    }

    // 2. Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(mapSupabaseUser(session.user));
      }
      setInitializing(false);
    });

    // 3. Listen for changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(mapSupabaseUser(session.user));
        setAuthMessage(null); // Clear errors on success
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setAuthView('login');
  };

  if (initializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="antialiased text-gray-900">
      {user ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <>
          {authView === 'login' ? (
            <LoginForm 
              onLogin={handleLogin} 
              onSwitchToSignup={() => setAuthView('signup')}
              initialError={authMessage}
            />
          ) : (
            <SignupForm 
              onLogin={handleLogin} 
              onSwitchToLogin={() => setAuthView('login')} 
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;