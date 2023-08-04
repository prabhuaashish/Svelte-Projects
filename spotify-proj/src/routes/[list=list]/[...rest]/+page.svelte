<script>
    import Card from '$lib/components/Card.svelte';
    import Pagination from '$lib/components/Pagination.svelte';

	export let data;
	$: itemsData = data.data;

	let isLoading = false;

	const onLoadMoreItems = async () => {
		if (itemsData && 'next' in itemsData && itemsData.next) {
			isLoading = true;
			const res = await fetch(
				itemsData.next.replace('https://api.spotify.com/v1/', '/api/spotify/')
			);
			if (res.ok) {
				const resJSON = await res.json();
				const newData = resJSON.albums || resJSON.playlists || resJSON.artists || resJSON;
				itemsData = { ...newData, items: [...itemsData.items, ...newData.items] };
			}
			isLoading = false;
		}
	};
</script>

<div class="content">
	<h1>{data.title}</h1>
	{#if itemsData?.items}
		<div class="grid-items">
			{#each itemsData.items as item}
				<div class="grid-item">
					<Card {item} />
				</div>
			{/each}
		</div>
		{#if 'next' in itemsData}
			<Pagination paginatedList={itemsData} on:loadmore={onLoadMoreItems} {isLoading} />
		{/if}
	{/if}
</div>

<style lang="scss">
	.grid-items {
		margin-bottom: 40px;
	}
	.content {
		padding-bottom: 60px;
	}
</style>