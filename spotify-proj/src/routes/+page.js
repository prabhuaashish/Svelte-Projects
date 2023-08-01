import fetchRefresh from '$lib/helpers/fetch-refresh.js';

export const load = async({fetch: _fetch, parent}) => {
    const fetch = (path) => fetchRefresh(_fetch, path);
    const {user} = await parent()
    const newReleases = fetch('/api/spotify/browse/new-releases?limit=6');
	const featuredPlaylists = fetch('/api/spotify/browse/featured-playlists?limit=6');
    const userPlaylists = fetch(`/api/spotify/users/${user?.id}/playlists?limit=6`);

    const catsRes = await fetch('/api/spotify/browse/categories');
    const catsResJSON = catsRes.ok ? await catsRes.json() : undefined;

    const randomCats = catsResJSON ? catsResJSON.categories.items.sort(() => 0.5 - Math.random()).slice(0, 3) : [];

    const randomCatsPromises = randomCats.map(cat => fetch(`/api/spotify/browse/categories/${cat.id}/playlists?limit=6`));

    const [newReleasesRes, featuredPlaylistsRes, userPlaylistsRes, ...randomCatsRes ] = await Promise.all([newReleases, featuredPlaylists, userPlaylists, ...randomCatsPromises]);

    return {
        newReleases: newReleasesRes.ok ? newReleasesRes.json() : undefined,
        featuredPlaylists: featuredPlaylistsRes.ok ? featuredPlaylistsRes.json() : undefined,
        userPlaylists: userPlaylistsRes.ok ? userPlaylistsRes.json() : undefined,
        homeCategories: randomCats,
        categoriesPlaylists: Promise.all(randomCatsRes.map(res => res.ok ? res.json() : undefined))
    }



}