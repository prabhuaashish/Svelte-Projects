<script>
    import { invalidateAll } from '$app/navigation';
  	import Button from './Button.svelte';


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
    <Button element="button" type="submit">Logout</Button>
</form>