import fetchRefresh from '$lib/helpers/fetch-refresh.js';

export const load = async({fetch: _fetch, parent}) => {
    console.log('loading data')
    const fetch = (path) => fetchRefresh(_fetch, path);
    const {user} = await parent();
    const stats = fetch(`api/strava/athletes/${user?.id}/stats`)
    const activities = fetch('api/strava/athlete/activities?before=1692263347&after=1672564147')

    const [statsRes, activitiesRes] = await Promise.all([stats, activities])

    return {
        stats: statsRes.ok ? statsRes.json() : undefined,
        activities: activitiesRes.ok ? activitiesRes.json() : undefined
    }
}