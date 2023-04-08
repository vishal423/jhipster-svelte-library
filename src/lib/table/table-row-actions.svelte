<script>
	import { createEventDispatcher } from 'svelte'
	import { faEye, faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

	import Button from '$lib/button.svelte'
	import Icon from '$lib/icon.svelte'

	export let id
	export let visible = false
	export let disableStateChangeActions = false
	export let renderStateChangeActions = true

	const dispatch = createEventDispatcher()
</script>

<div
	class="flex flex-row justify-center items-center leading-none"
	class:hidden={!visible}
	data-testid="rowactions"
>
	<Button
		name="viewBtn"
		contextualColor="light"
		size="small"
		classes="sm:my-0 {visible ? '' : 'hidden'}"
		title="View"
		aria-label="view"
		on:click={() =>
			dispatch('view', {
				id,
			})}
	>
		<Icon icon={faEye} />
	</Button>
	{#if renderStateChangeActions}
		<Button
			name="editBtn"
			contextualColor="light"
			disabled={disableStateChangeActions}
			size="small"
			classes="sm:my-0 {visible ? '' : 'hidden'}"
			title="Edit"
			aria-label="edit"
			on:click={() =>
				dispatch('update', {
					id,
				})}
		>
			<Icon icon={faPencilAlt} />
		</Button>
		<Button
			name="deleteBtn"
			contextualColor="light"
			disabled={disableStateChangeActions}
			size="small"
			classes="sm:my-0 {visible ? '' : 'hidden'}"
			title="Delete"
			aria-label="delete"
			on:click={() =>
				dispatch('delete', {
					id,
				})}
		>
			<Icon icon={faTrashAlt} />
		</Button>
	{/if}
	<slot />
</div>
