
<script>
	import { ChevronDown } from "lucide-svelte";

	export let data;

    $:console.log(data)

	let sections = [];

	$: {
		if (data.activities) {
			sections.push({
				title: 'Activities',
				path: '/sections/activities',
				items: data.activities
			});
		}
		// if (data.stats) {
		// 	sections.push({
		// 		title: 'Stats',
		// 		path: '/sections/stats',
		// 		items: data.stats.items
		// 	});
		// }
	}
</script>
<div>
    <!-- {data.user.firstname} -->
</div>
{#each sections as section}
	<section class="content-row">
		<div class="content-row-header">
			<div class="left">
				<h2 class="section-title">{section.title}</h2>
			</div>
			<div class="right">
				<ChevronDown size={26} />
			</div>
		</div>
		<div class="grid-items">
			{#each section.items as item}
				<div class="grid-item" style="background-color: black;">
					<h3>{item.name}</h3>
					<h5>Distance : {item.distance}</h5>
				</div>
			{/each}
		</div>
	</section>
{/each}

<style lang="scss">
	.content-row {
		padding: 5rem;
		.content-row-header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 20px;
			.section-title {
				font-size: functions.toRem(22);
				font-weight: 600;
				margin: 0;
			}
		}
	}
</style>