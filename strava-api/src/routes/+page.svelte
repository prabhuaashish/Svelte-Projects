
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
		// 		items: data.stats
		// 	});
		// }
	}
// Date and Time function
	function formatDate(dateTimeString) {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        };
        
        return new Date(dateTimeString).toLocaleString(undefined, options);
    }
// Pace function
	function calculatePaceFromSpeed(averageSpeed) {
        const paceInMinutesPerKm = 60 / (averageSpeed * 3.6);

        const minutes = Math.floor(paceInMinutesPerKm);
        const seconds = Math.round((paceInMinutesPerKm - minutes) * 60);

        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
// Time function
	function formatElapsedTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
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
					<h5>Distance: {(item.distance / 1000).toFixed(2)} km</h5>
					<p>Time: {formatElapsedTime(item.elapsed_time)}</p>
					<p>Calories Burned: {item.kilojoules.toFixed(1)}</p>
					<p>Pace: {calculatePaceFromSpeed(item.average_speed)}</p>
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