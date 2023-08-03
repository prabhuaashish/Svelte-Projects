<script>
    import PlaylistForm from '$lib/components/PlaylistForm.svelte';

	export let data;
	export let form;
</script>

<h2>Add a New Playlist</h2>
<PlaylistForm userID = {data.user.id} {form} />

