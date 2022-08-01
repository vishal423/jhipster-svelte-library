<script>
	export let testId = ''
	export let classes = ''
</script>

<form
	data-testid="{testId}Form"
	class="mt-4 flex flex-col {classes}"
	{...$$restProps}
>
	<slot />
</form>
