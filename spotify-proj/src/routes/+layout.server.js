import { SPOTIFY_BASE_URL } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

// Define the load function
 export const load = async ({ cookies, fetch, url }) => {
  const accessToken = cookies.get('access_token');
  const refreshToken = cookies.get('refresh_token');
  if (!accessToken) {
    return {
      user: null,
    };
  }

  const profileRes = await fetch(`${SPOTIFY_BASE_URL}/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  
  if (profileRes.ok) {
    const profile = await profileRes.json();
    let userAllPlaylists = []
    const usePlaylistsRes = await fetch ('/api/spotify/me/playlists?limit=50')
    if(usePlaylistsRes.ok){
        const userPlaylistsResJSON = await usePlaylistsRes.json();
        userAllPlaylists = userPlaylistsResJSON.items
    }
    return {
      user: profile,
      userAllPlaylists
    };
  } 
  
  if(profileRes.status === 401 && refreshToken){
    
        //refresh the token and try again
       const refreshRes = await fetch('api/auth/refresh')
       if(refreshRes.ok){
           throw redirect(307, url.pathname);
       }
       return{
        user: null,
       }
    }else {
        return {
         user: null
        };
    }
};