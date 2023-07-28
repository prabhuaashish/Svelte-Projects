<script>
    import { invalidateAll } from 'svelte';


    async function handleLogout(event) {
    event.preventDefault();
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        accept: 'application/json',
      },
    });

    if (response.ok) {
      invalidateAll();
    }
  }

</script>

<form method="POST" action="/api/auth/logout" on:submit|preventDefault={handleLogout}>
    <button type="submit">Logout</button>
</form>