<script>
	import { onMount, createEventDispatcher } from 'svelte'
	import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
	import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons/faExclamationTriangle'

	import Icon from '$lib/icon.svelte'

	export let message
	export let contextualColor = 'success'
	export let index
	export let timeout = 3000
	const dispatch = createEventDispatcher()

	let testId = 'toast'
	let show = true
	let closeable = true

	onMount(() => {
		const ref = setTimeout(
			() => dispatch('timeout', { message, index }),
			timeout
		)

		return () => clearTimeout(ref)
	})

	function closeAlert() {
		show = false
	}
</script>

<div class="absolute w-1/2 z-20">
	<div
		class:hidden="{!show}"
		class="mt-4 flex justify-between transition-colors duration-150 rounded text-sm border-2 border-gray-300 shadow-lg"
	>
		<div
			class="p-4"
			class:bg-green-200="{contextualColor === 'success'}"
			class:dark:bg-green-200="{contextualColor === 'success'}"
			class:text-green-900="{contextualColor === 'success'}"
			class:dark:text-green-900="{contextualColor === 'success'}"
			class:bg-red-200="{contextualColor === 'danger'}"
			class:dark:bg-red-200="{contextualColor === 'danger'}"
			class:text-red-900="{contextualColor === 'danger'}"
			class:dark:text-red-900="{contextualColor === 'danger'}"
		>
			<Icon
				icon="{contextualColor === 'success'
					? faCheck
					: faExclamationTriangle}"
			/>
		</div>
		<div
			class="px-5 py-3"
			data-test="{testId}-{contextualColor}"
			{...$$restProps}
		>
			{message}
		</div>
		{#if closeable}
			<button
				aria-label="Close"
				class:hover:text-red-700="{contextualColor === 'danger'}"
				class:dark:hover:text-red-500="{contextualColor === 'danger'}"
				class="self-start text-3xl leading-4 bg-transparent border-0 pt-3 px-3 focus:outline-none"
				on:click|preventDefault="{closeAlert}"
				><span aria-hidden="true">&times</span></button
			>
		{/if}
	</div>
</div>
