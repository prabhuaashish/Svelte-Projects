import { redirect } from '@sveltejs/kit';

// Define the load function
export const load = ({ data, url }) => {
  const { user } = data || {};
  
  // Handle redirection based on the user's login status and current URL
  if (user && url.pathname === '/login') {
    throw redirect(307, '/');
  }
  if (!user && url.pathname !== '/login') {
    throw redirect(307, '/login');
  }

  return {
    user
  };
};