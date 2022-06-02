<script>
	import { createEventDispatcher } from 'svelte'
	import { faBan } from '@fortawesome/free-solid-svg-icons/faBan'
	import { faTrashAlt } from '@fortawesome/free-solid-svg-icons/faTrashAlt'

	import Button from '$lib/button.svelte'
	import Icon from '$lib/icon.svelte'
	import Modal from '$lib/modal.svelte'

	export let id = ''
	const dispatch = createEventDispatcher()
</script>

<Modal title="Confirm delete operation" on:close="{() => dispatch('close')}">
	<p class="w-[450px]"><slot name="confirm" /></p>
	<div slot="footer">
		<Button
			name="cancelBtn"
			contextualColor="secondary"
			classes="mr-4"
			on:click="{() => dispatch('close')}"
		>
			<Icon classes="mr-2" icon="{faBan}" />Cancel
		</Button>

		<Button
			name="confirmDeleteBtn"
			contextualColor="danger"
			on:click="{() => dispatch('delete', { id })}"
		>
			<Icon classes="mr-2" icon="{faTrashAlt}" />Delete
		</Button>
	</div>
</Modal>
