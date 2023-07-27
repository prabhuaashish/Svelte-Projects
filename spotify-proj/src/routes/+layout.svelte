<script>
    import 'modern-normalize/modern-normalize.css';
    import '../styles/main.scss';
    export let data;
</script>


<!-- Display the user's display name if available -->
{#if data.user?.display_name}
  <p>{data.user.display_name}</p>
{:else}
  <!-- Handle the case where the user's display name is not available -->
  <p>Username is not available</p>
{/if}

<!-- Render the component's children using the <slot /> element -->
<slot />