<script>
	export let testId = ''
	export let classes = ''
</script>

<div class="overflow-x-auto">
	<table
		data-testid="{testId}Table"
		class="table-auto w-full mt-4 text-left {classes}"
		{...$$restProps}
	>
		<slot name="head" />
		<slot />
	</table>
</div>
