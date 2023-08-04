import {SPOTIFY_BASE_URL} from '$env/static/private';
import { fail } from '@sveltejs/kit';
import {redirect} from '@sveltejs/kit';



export const actions = {
	followPlaylist: async ({ cookies, params, fetch }) => {
		const res = await fetch(`${SPOTIFY_BASE_URL}/playlists/${params.id}/followers`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${cookies.get('access_token')}`
			}
		});
		if (!res.ok) {
			return fail(res.status, { followError: res.statusText, followForm: true });
		}
	},
	unFollowPlaylist: async ({ cookies, params, fetch }) => {
		const res = await fetch(`${SPOTIFY_BASE_URL}/playlists/${params.id}/followers`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${cookies.get('access_token')}`
			}
		});
		if (!res.ok) {
			return fail(res.status, { followError: res.statusText, followForm: true });
		}
	},
	removeItem: async ({request, cookies, params, fetch }) => {
		const data = await request.formData();
		const track = data.get('track');	
		const playlist = params.id;

		const res = await fetch(`${SPOTIFY_BASE_URL}/playlists/${playlist}/tracks`, {
			method: 'DELETE',
			body: JSON.stringify({
				uris: [`spotify:track:${track}`]
			}),
			headers: {
				Authorization: `Bearer ${cookies.get('access_token')}`
			}
		});

		if (!res.ok) {
			throw redirect(303, `/playlist/${playlist}?error=${res.statusText}`);
		}else {
			throw redirect(303, `/playlist/${playlist}?success=Track removed successfully!`);
		}

	}
};