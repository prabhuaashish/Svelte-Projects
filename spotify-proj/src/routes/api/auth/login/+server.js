// Import the required dependencies
import  { redirect } from '@sveltejs/kit';
import pkce from 'pkce-gen';

// Replace the following imports with the actual values you need
import { SPOTIFY_APP_CLIENT_ID, BASE_URL } from '$env/static/private';

// Function to generate a random string of a given length
const generateRandomString = (length) => {
  let randomString = '';
  const possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    randomString += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
  }
  return randomString;
};

// Generate state and challenge using the imported pkce module
const state = generateRandomString(16);
const challenge = pkce.create(); // Since pkce-gen is imported as default, use pkce.default()

const scope =
  'ugc-image-upload user-modify-playback-state user-read-playback-state user-read-currently-playing user-follow-modify user-follow-read user-read-recently-played user-read-playback-position user-top-read playlist-read-collaborative playlist-modify-public playlist-read-private playlist-modify-private app-remote-control streaming user-read-email user-read-private user-library-modify user-library-read';

export const GET = ({ cookies }) => {
  cookies.set('spotify_auth_state', state);
  cookies.set('spotify_auth_challenge_verifier', challenge.code_verifier);
  // Build the URL with query parameters
  const queryParams = new URLSearchParams({
    response_type: 'code',
    client_id: SPOTIFY_APP_CLIENT_ID,
    scope,
    redirect_uri: `${BASE_URL}/api/auth/callback`,
    state,
    code_challenge_method: 'S256',
    code_challenge: challenge.code_challenge,
  });

  const url = `https://accounts.spotify.com/authorize?${queryParams}`;

  // Throw a redirect response
  throw redirect(307, url);
};
