<script>
    import Button from '$lib/components/Button.svelte';
    import ItemPage from '$lib/components/ItemPage.svelte';
    import TrackList from '$lib/components/TrackList.svelte';
	import {Heart} from 'lucide-svelte';
	import { applyAction, enhance } from '$app/forms';
	import Modal from '$lib/components/Modal.svelte';
	import PlaylistForm from '$lib/components/PlaylistForm.svelte';
	import MicroModal from 'micromodal';
	import { invalidateAll } from '$app/navigation';

    export let data;
	export let form;

    let isLoading = false;
	let isLoadingFollow = false;

	$: color = data.color;
	$: playlist = data.playlist;
	$: tracks = data.playlist.tracks;
	$: isFollowing = data.isFollowing;

	let filteredTracks;

	$: {
		filteredTracks = [];
		tracks.items.forEach((item) => {
			if (item.track) filteredTracks = [...filteredTracks, item.track];
		});
	}

	const followersFormat = Intl.NumberFormat('en', { notation: 'compact' });

	const loadMoreTracks = async () => {
		if (!tracks.next) return;
		isLoading = true;
		const res = await fetch(tracks.next.replace('https://api.spotify.com/v1/', '/api/spotify/'));
		const resJSON = await res.json();
		if (res.ok) {
			tracks = { ...resJSON, items: [...tracks.items, ...resJSON.items] };
		} else {
			alert(resJSON.error.message || 'Could not load data!');
		}
		isLoading = false;
	};
</script>

<ItemPage
	title={playlist.name}
	image={playlist.images.length > 0 ? playlist.images[0].url : undefined}
	{color}
	type={playlist.type}
>
	<div slot="meta">
		<p class="playlist-description">{@html playlist.description}</p>
		<p class="meta">
			<span>{playlist.owner.display_name}</span>
			<span>{followersFormat.format(playlist.followers.total)} Followers</span>
			<span>{playlist.tracks.total} Tracks</span>
		</p>
	</div>

	<div class="playlist-actions">
		{#if data.user?.id === playlist.owner.id}
			<Button
				element="a"
				variant="outline"
				href="/playlist/{playlist.id}/edit"
				on:click={(e) => {
					e.preventDefault();
					MicroModal.show('edit-playlist-modal');
				}}>Edit Playlist
			</Button>
		{:else if isFollowing !== null}
			<form
				class="follow-form"
				method="POST"
				action={`?/${isFollowing ? 'unFollowPlaylist' : 'followPlaylist'}`}
				use:enhance={() => {
					isLoadingFollow = true;
					return ({ result }) => {
						isLoadingFollow = false;
						applyAction(result);
						if (result.type === 'success') {
							isFollowing = !isFollowing;
						}
						invalidateAll();
					};
				}}
			>
				<Button element="button" type="submit" variant="outline" disabled={isLoadingFollow}>
					<Heart aria-hidden focusable="false" fill={isFollowing ? 'var(--text-color)' : 'none'} />
					{isFollowing ? 'Unfollow' : 'Follow'}
					<span class="visually-hidden">{playlist.name} playlist</span>
				</Button>
				{#if form && 'followForm' in form && form?.followError}
					<p class="error">{form.followError}</p>
				{/if}
			</form>
		{/if}
	</div>

	{#if playlist.tracks.items.length > 0}
		<TrackList
		tracks={filteredTracks}
		isOwner={data.user?.id === playlist.owner.id}
		userPlaylists={data.userAllPlaylists?.filter((pl) => pl.owner.id === data.user?.id)}
		/>
		{#if tracks.next}
			<div class="load-more">
				<Button element="button" variant="outline" disabled={isLoading} on:click={loadMoreTracks}
					>Load More <span class="visually-hidden">Tracks</span></Button
				>
			</div>
		{/if}
	{:else}
		<div class="empty-playlist">
			<p>No items added to this playlist yet.</p>
			<Button element="a" href="/search">Search for Content</Button>
			<Button element="a" href="/playlists">View all Playlists</Button>
		</div>
	{/if}
</ItemPage>

<Modal id="edit-playlist-modal" title="Edit {playlist.name}">
	<PlaylistForm
		action="/playlist/{playlist.id}/edit"
		{playlist}
		form={form && 'editForm' in form ? form : null}
		on:success={() => {
			MicroModal.close('edit-playlist-modal');
			// invalidate(`/api/spotify/playlists/${playlist.id}`);
			invalidateAll();
		}}
	/>
</Modal>

<style lang="scss">
	.empty-playlist {
		text-align: center;
		margin-top: 40px;
		p {
			font-size: functions.toRem(22);
			font-weight: 600;
		}
		:global(a) {
			margin: 0 10px;
		}
	}
	.playlist-description {
		color: var(--light-gray);
		font-size: functions.toRem(18);
		margin-bottom: 0;
	}
	.meta {
		font-size: functions.toRem(13);
		margin-top: 10px;
		span {
			margin-right: 5px;
			&:first-child {
				font-weight: 600;
			}
		}
	}
	.load-more {
		padding: 15px;
		text-align: center;
	}
	.playlist-actions {
		display: flex;
		justify-content: flex-end;
		margin: 10px 0 30px;
		.follow-form {
			:global(.button) {
				display: flex;
				align-items: center;
				:global(svg) {
					margin-right: 10px;
					width: 22px;
					height: 22px;
				}
			}
			p.error {
				text-align: right;
				color: var(--error);
				font-size: functions.toRem(14);
			}
		}
	}
</style>