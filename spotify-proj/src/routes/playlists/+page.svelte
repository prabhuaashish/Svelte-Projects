<script>
    import Button from "$lib/components/Button.svelte";
    import Card from "$lib/components/Card.svelte"
	import Modal from "$lib/components/Modal.svelte";
	import MicroModal from 'micromodal'
	import PlaylistForm from "$lib/components/PlaylistForm.svelte";

    export let data;
	export let form;

    $: playlists = data.userPlaylists;

</script>

<div class="content">
	{#if playlists.items.length > 0}
		<div class="title">
			<h1>{data.title}</h1>
			<Button
				element="a"
				href="/playlists/new"
				on:click={(e) => {
					e.preventDefault();
					MicroModal.show('add-playlist-modal');
				}}> 
			+ Add New
			</Button>
		</div>
		<div class="grid-items">
			{#each playlists.items as item}
				<Card {item} />
			{/each}
		</div>
	{:else}
		<div class="empty">
			<p>No Playlists Yet!</p>
			<Button element="a" href="/playlists/new">+ Add New</Button>
		</div>
	{/if}
</div>

<Modal id = "add-playlist-modal" title = "Add a new Playlist">
	<PlaylistForm {form} userID = {data.user?.id} action="/playlists/new" />
</Modal>

<style lang="scss">
	.content {
		padding-bottom: 60px;
		.title {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		.grid-items {
			margin-bottom: 40px;
		}
		.empty {
			text-align: center;
			margin-top: 40px;
			p {
				font-size: functions.toRem(22);
				font-weight: 600;
			}
		}
	}
</style>

