<script>
	import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

	import InputControl from './input-control.svelte'
	import Icon from './icon.svelte'

	export let name = 'password'
	export let label = 'Password'
	export let value = ''
	export let validations = [
		{ type: 'required', message: 'Password is mandatory' },
		{
			type: 'minlength',
			minlength: 4,
			message: 'Password is required to be at least 4 characters long',
		},
		{
			type: 'maxlength',
			maxlength: 50,
			message: 'Password cannot be longer than 50 characters',
		},
	]
</script>

<InputControl
	type="password"
	label="{label}"
	value="{value}"
	name="{name}"
	validations="{validations}"
	on:input
	on:validate
	let:message
	let:dirty
	let:valid
	{...$$restProps}
>
	<slot message="{message}" dirty="{dirty}" valid="{valid}">
		{#if dirty && !valid}
			<div data-testid="{name}-error" class="flex items-center">
				<Icon classes="mr-2" icon="{faExclamationCircle}" />
				{message}
			</div>
		{:else}&nbsp;{/if}
	</slot>
</InputControl>
