<script>
	import { byteSize, openFile } from '$lib/utils/data-util'

	export let field
	export let name
	export let fieldType = 'blob'
	export let fieldContentType
</script>

{#if field}
	<div
		role="button"
		tabindex="0"
		class="cursor-pointer text-primary-500 inline-block"
		on:click|preventDefault={openFile(field, fieldContentType)}
		on:keyup={e => e.key === 'Enter' && openFile(field, fieldContentType)}
	>
		{#if fieldType === 'image'}
			<img src={'data:' + fieldContentType + ';base64,' + field} class="max-h-8" alt={name} />
		{:else}
			View
		{/if}
	</div>
	<span class="text-sm">{fieldContentType}</span>,
	<span class="text-sm whitespace-nowrap"> {byteSize(field)}</span>
{/if}
