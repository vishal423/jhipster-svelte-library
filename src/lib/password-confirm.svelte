<script>
	import { createEventDispatcher } from 'svelte'
	import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

	import Icon from './icon.svelte'
	import Password from './password.svelte'

	export let label = 'Password'
	export let name = 'password'
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

	const dispatch = createEventDispatcher()

	let confirmPassword
	let validPassword = false
	let validConfirmPassword = false

	$: confirmPasswordMismatch =
		validConfirmPassword && value !== confirmPassword

	function handlePassword(event) {
		value = event.target.value
		dispatch('input', { value })
	}

	function handlePasswordValidation(event) {
		validPassword = event.detail.valid
		dispatch('validate', { valid: isValid() })
	}

	function handleConfirmPasswordValidation(event) {
		validConfirmPassword = event.detail.valid
		dispatch('validate', { valid: isValid() })
	}
	function isValid() {
		return (
			validPassword && validConfirmPassword && value === confirmPassword
		)
	}
</script>

<Password
	name="{name}"
	label="{label}"
	value="{value}"
	validations="{validations}"
	on:input="{handlePassword}"
	on:validate="{handlePasswordValidation}"
/>

<Password
	label="Confirm {label}"
	value="{confirmPassword}"
	name="{name}Confirm"
	validations="{validations}"
	on:input="{event => (confirmPassword = event.target.value)}"
	on:validate="{handleConfirmPasswordValidation}"
	let:message
	let:dirty
	let:valid
>
	<div data-testid="{name}Confirm-error" class="flex items-center">
		{#if confirmPasswordMismatch}
			<Icon classes="mr-2" icon="{faExclamationCircle}" />
			Password and its confirmation do not match
		{:else if dirty && !valid}
			<Icon classes="mr-2" icon="{faExclamationCircle}" />
			{message}
		{:else}&nbsp;{/if}
	</div>
</Password>
