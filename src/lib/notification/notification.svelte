<script>
	import { fly } from 'svelte/transition'

	import notificationService from './notification-service'
	import Toast from './toast.svelte'

	function remove(event) {
		const { message, index } = event.detail
		notificationService.remove(message, index)
	}
</script>

<div class="relative flex justify-center" transition:fly={{ y: -10 }}>
	{#each $notificationService as notification, index (notification)}
		<Toast
			message={notification.message}
			contextualColor={notification.type}
			{index}
			on:timeout={remove}
		/>
	{/each}
</div>
