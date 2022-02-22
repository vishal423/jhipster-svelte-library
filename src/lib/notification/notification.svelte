<script>
	import { fly } from 'svelte/transition';

	import notification from './notification-store';
	import Toast from './toast.svelte';
</script>

<div class="relative flex justify-center" transition:fly={{ y: -10 }}>
	{#each $notification as notification, index (notification)}
		<Toast message={notification.message} contextualColor={notification.type} {index} />
	{/each}
</div>
