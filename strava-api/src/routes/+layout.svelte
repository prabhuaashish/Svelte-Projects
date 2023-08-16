<script>
    import "modern-normalize/modern-normalize.css";
    import "../styles/main.scss";
    import LogoutButton from "$lib/components/LogoutButton.svelte";

    export let data;
    $: user = data.user;
</script>

{#if user}
	<p>Hello {user.firstname}</p>
	<LogoutButton />
{/if}

<slot><!-- optional fallback --></slot>