<script>
	export let testId = 'alert'
	export let show = false
	export let contextualColor = 'success'
	export let closeable = true

	function closeAlert() {
		show = false
	}
</script>

<div
	role="alert"
	class:hidden="{!show}"
	class:bg-green-200="{contextualColor === 'success'}"
	class:dark:bg-green-200="{contextualColor === 'success'}"
	class:text-green-900="{contextualColor === 'success'}"
	class:dark:text-green-900="{contextualColor === 'success'}"
	class:bg-red-200="{contextualColor === 'danger'}"
	class:dark:bg-red-200="{contextualColor === 'danger'}"
	class:text-red-900="{contextualColor === 'danger'}"
	class:dark:text-red-900="{contextualColor === 'danger'}"
	class:bg-yellow-100="{contextualColor === 'warning'}"
	class:dark:bg-yellow-200="{contextualColor === 'warning'}"
	class:text-yellow-900="{contextualColor === 'warning'}"
	class:dark:text-yellow-900="{contextualColor === 'warning'}"
	class="px-5 py-3 mt-4 flex justify-between transition-colors duration-150 rounded text-sm"
>
	<div data-testid="{testId}-{contextualColor}" {...$$restProps}>
		<slot />
	</div>
	{#if closeable}
		<button
			aria-label="Close"
			class:hover:text-red-700="{contextualColor === 'danger'}"
			class:dark:hover:text-red-500="{contextualColor === 'danger'}"
			class="self-start text-xl leading-4 bg-transparent border-0
				focus:outline-none"
			on:click|preventDefault="{closeAlert}"
			><span aria-hidden="true">&times</span></button
		>
	{/if}
</div>
