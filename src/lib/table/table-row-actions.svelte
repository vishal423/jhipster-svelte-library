<script>
	import { createEventDispatcher } from 'svelte'
	import { faEye } from '@fortawesome/free-solid-svg-icons/faEye'
	import { faPencilAlt } from '@fortawesome/free-solid-svg-icons/faPencilAlt'
	import { faTrashAlt } from '@fortawesome/free-solid-svg-icons/faTrashAlt'

	import Button from '$lib/button.svelte'
	import Icon from '$lib/icon.svelte'

	export let id
	export let visible = false

	const dispatch = createEventDispatcher()
</script>

<div
	class="flex flex-row justify-center items-center leading-none"
	class:hidden="{!visible}"
	data-testid="rowactions"
>
	<Button
		name="viewBtn"
		contextualColor="light"
		size="small"
		classes="sm:my-0 {visible ? '' : 'hidden'}"
		title="View"
		aria-label="view"
		on:click="{() =>
			dispatch('view', {
				id,
			})}"
	>
		<Icon icon="{faEye}" />
	</Button>
	<Button
		name="editBtn"
		contextualColor="light"
		size="small"
		classes="sm:my-0 {visible ? '' : 'hidden'}"
		title="Edit"
		aria-label="edit"
		on:click="{() =>
			dispatch('update', {
				id,
			})}"
	>
		<Icon icon="{faPencilAlt}" />
	</Button>
	<Button
		name="deleteBtn"
		contextualColor="light"
		size="small"
		classes="sm:my-0 {visible ? '' : 'hidden'}"
		title="Delete"
		aria-label="delete"
		on:click="{() =>
			dispatch('delete', {
				id,
			})}"
	>
		<Icon icon="{faTrashAlt}" />
	</Button>
</div>
