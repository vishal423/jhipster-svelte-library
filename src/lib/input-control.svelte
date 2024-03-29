<script>
	import { afterUpdate, createEventDispatcher } from 'svelte'
	import { faExclamationCircle, faTimes } from '@fortawesome/free-solid-svg-icons'

	import Icon from './icon.svelte'
	import Button from './button.svelte'
	import { createValidator, validate } from '$lib/utils/validator'
	import BinaryRecord from '$lib/page/binary-record.svelte'

	export let value = ''
	export let type = 'text'
	export let name
	export let label
	export let validations = []
	export let id

	let ref
	let dirty = false
	let valid = false
	let message
	let focused = false
	const dispatch = createEventDispatcher()
	const idVal = id ? id : name + Date.now()

	$: focusedOrContainsValue =
		value !== '' || focused || type === 'file' || type === 'datetime-local' || type === 'date'
	$: pristine = !focused && !dirty
	$: pristineOrValid = pristine || valid
	$: focusedAndValidOrPristine = focused && (!dirty || valid)
	$: dirtyAndInvalid = dirty && !valid
	$: isRequired = validations.find(validation => validation.type === 'required') !== undefined

	function handleValidationResponse(event) {
		dirty = true
		valid = event.detail.valid
		message = event.detail.message
		dispatch('validate', { valid, message })
	}

	afterUpdate(async () => {
		const validationResponse = await createValidator(validations)(value)
		valid = validationResponse.valid
		message = validationResponse.message
		dispatch('validate', { valid: valid, message: message })
	})
</script>

<div class="mt-4 relative {type === 'textarea' ? 'sm:h-auto' : 'h-12'}">
	<label
		class="absolute left-0 px-1 ml-2 transition-all duration-200
			pointer-events-none z-10"
		class:-mt-2={focusedOrContainsValue}
		class:bg-white={focusedOrContainsValue}
		class:dark:bg-gray-800={focusedOrContainsValue}
		class:top-0={focusedOrContainsValue}
		class:pt-3={!focusedOrContainsValue}
		class:pt-0={focusedOrContainsValue}
		class:text-xs={focusedOrContainsValue}
		class:text-gray-700={!focused}
		class:dark:text-gray-400={!focused}
		class:text-primary-700={focusedAndValidOrPristine}
		class:dark:text-primary-500={focusedAndValidOrPristine}
		class:text-red-600={dirtyAndInvalid && focused}
		class:dark:text-red-500={dirtyAndInvalid && focused}
		for={idVal}
		>{label}<span class="ml-px">{isRequired ? '*' : ''}</span>
	</label>
	{#if type === 'textarea'}
		<textarea
			rows="2"
			class="px-3 py-3 w-full min-h-[50px] h-12 shadow-none bg-white dark:bg-gray-800 outline-none focus:ring-0 rounded z-10"
			class:border={!focused}
			class:border-2={focused}
			class:border-gray-400={pristineOrValid}
			class:dark:border-gray-700={pristineOrValid}
			class:border-primary-600={focusedAndValidOrPristine}
			class:dark:border-primary-500={focusedAndValidOrPristine}
			class:border-red-600={dirtyAndInvalid}
			class:dark:border-red-500={dirtyAndInvalid}
			{name}
			id={idVal}
			{value}
			on:input
			on:focus={() => (focused = true)}
			on:blur={() => (focused = false)}
			use:validate={validations}
			on:validation={handleValidationResponse}
			{...$$restProps}
		/>
	{:else if type === 'file'}
		<input
			class:hidden={value}
			bind:this={ref}
			class="px-3 py-3 w-full shadow-none bg-white dark:bg-gray-800 outline-none focus:ring-0 rounded z-10"
			class:border={!focused}
			class:border-2={focused}
			class:border-gray-400={pristineOrValid}
			class:dark:border-gray-700={pristineOrValid}
			class:border-primary-600={focusedAndValidOrPristine}
			class:dark:border-primary-500={focusedAndValidOrPristine}
			class:border-red-600={dirtyAndInvalid}
			class:dark:border-red-500={dirtyAndInvalid}
			{type}
			{name}
			id={idVal}
			on:change
			on:focus={() => (focused = true)}
			on:blur={() => (focused = false)}
			use:validate={validations}
			on:validation={handleValidationResponse}
			{...$$restProps}
		/>
		{#if value}
			<div
				data-testid="{name}View"
				class="absolute left-0 py-3 pl-3 text-xl w-full shadow-none bg-white dark:bg-gray-800 border-gray-400 dark:border-gray-700 border rounded z-1"
			>
				<BinaryRecord field={value} fieldContentType="image/png" {name} />
			</div>
		{/if}
		{#if ref && (ref.value || value)}
			<Button
				name="{name}ClearBtn"
				contextualColor="none"
				classes="dark:text-white text-gray-800 dark:hover:bg-gray-700 hover:bg-gray-300 absolute right-0 pl-2 pr-0 pt-0 pb-1 mr-1 rounded-full"
				on:click={() => {
					ref.value = ''
					ref.dispatchEvent(new Event('change'))
				}}
			>
				<Icon classes="mr-2" icon={faTimes} />
			</Button>
		{/if}
	{:else}
		<input
			class="px-3 py-3 w-full shadow-none bg-white dark:bg-gray-800 outline-none focus:ring-0 rounded z-10"
			class:border={!focused}
			class:border-2={focused}
			class:border-gray-400={pristineOrValid}
			class:dark:border-gray-700={pristineOrValid}
			class:border-primary-600={focusedAndValidOrPristine}
			class:dark:border-primary-500={focusedAndValidOrPristine}
			class:border-red-600={dirtyAndInvalid}
			class:dark:border-red-500={dirtyAndInvalid}
			{type}
			{name}
			id={idVal}
			{value}
			on:input
			on:change
			on:focus={() => (focused = true)}
			on:blur={() => (focused = false)}
			use:validate={validations}
			on:validation={handleValidationResponse}
			{...$$restProps}
		/>
	{/if}
</div>
<div class="flex flex-col mt-1 pr-3 text-xs text-red-600 dark:text-red-500">
	<slot {message} {dirty} {valid}>
		{#if dirty && !valid}
			<div data-testid="{name}-error" class="flex items-center">
				<Icon classes="mr-2" icon={faExclamationCircle} />
				{message}
			</div>
		{:else}&nbsp;{/if}
	</slot>
</div>

<style>
	input:-webkit-autofill,
	input:-webkit-autofill:hover,
	input:-webkit-autofill:focus,
	input:-webkit-autofill:active {
		-webkit-box-shadow: 0 0 0 30px white inset !important;
	}
	input {
		filter: none;
	}
</style>
