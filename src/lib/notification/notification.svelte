<script>
	import { fly } from 'svelte/transition'

	import { notification } from './notification-store'
	import Toast from './toast.svelte'

	function remove(event) {
		const { message, index } = event.detail
		notification.remove(message, index)
	}
</script>

<div class="relative flex justify-center" transition:fly="{{ y: -10 }}">
	{#each $notification as notification, index (notification)}
		<Toast
			message="{notification.message}"
			contextualColor="{notification.type}"
			index="{index}"
			on:timeout="{remove}"
		/>
	{/each}
</div>
