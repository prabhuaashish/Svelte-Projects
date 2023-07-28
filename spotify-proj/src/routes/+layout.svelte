<script>
  import 'modern-normalize/modern-normalize.css';
  import '../styles/main.scss';
  import LogoutButton from '$lib/components/LogoutButton.svelte';
  // Define the 'data' prop
  export let data;
  let user = data.user;
</script>

<!-- Display the user's display name if available -->
{#if user}
  <p>Hello {user.display_name}</p>
  <LogoutButton/>
{/if}

<!-- Render the component's children using the <slot /> element -->
<slot />
