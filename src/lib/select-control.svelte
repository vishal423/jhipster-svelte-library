<script>
	import { afterUpdate, createEventDispatcher } from 'svelte'
	import { faExclamationCircle, faCaretDown } from '@fortawesome/free-solid-svg-icons'

	import Icon from './icon.svelte'
	import CheckboxControl from './checkbox-control.svelte'

	export let name = ''
	export let value = []
	export let label = ''
	export let options = {}
	export let validations = []
	export let multiple = false

	const dispatch = createEventDispatcher()
	const randomSuffix = Date.now()

	let focused = false
	let isOpen = false
	let displayName = []

	let dirty = false
	let valid = false
	let message
	let selectOptions

	$: displayName =
		value && value.length
			? options && options.nameField
				? value.map(value => value[options.nameField])
				: value
			: []
	$: focusedOrContainsValue = (value && value.length !== 0) || focused
	$: pristine = !focused && !dirty
	$: pristineOrValid = pristine || valid
	$: focusedAndValidOrPristine = focused && (!dirty || valid)
	$: dirtyAndInvalid = dirty && !valid
	$: isRequired = validations.find(validation => validation.type === 'required') !== undefined

	function selectOption(event) {
		let valueToDispatch
		dirty = true
		const eventValue =
			typeof options.data[0]['value'] === 'object'
				? JSON.parse(event.target.value)
				: event.target.value
		if (event.target.checked) {
			if (multiple) {
				valueToDispatch = [...value, eventValue]
			} else {
				valueToDispatch = [eventValue]
			}
		} else {
			if (multiple) {
				valueToDispatch = value.filter(val =>
					typeof val === 'object'
						? val[options.idField] !== eventValue[options.idField]
						: val !== eventValue
				)
			} else {
				valueToDispatch = []
			}
		}
		validateRequired()
		dispatch('select', {
			value: multiple
				? valueToDispatch
				: valueToDispatch.length > 0
				? valueToDispatch[0]
				: null,
		})

		event.target.focus()
	}

	afterUpdate(() => validateRequired())

	function validateRequired() {
		if (isRequired && value && !value.length) {
			valid = false
			message = validations.find(validation => validation.type === 'required').message
		} else {
			valid = true
		}
		dispatch('validate', { valid, message })
	}

	function toggleOptions(event) {
		isOpen = !isOpen
	}

	function navigateToFirstOption(event) {
		switch (event.keyCode) {
			case 40:
				if (!isOpen) {
					isOpen = true
				}
				if (selectOptions.firstChild) {
					selectOptions.firstChild.querySelector('input').focus()
				} else {
					isOpen = false
				}
				break
			case 27:
			case 9:
				isOpen = false
				break
		}
	}

	function handleEscKey(event) {
		switch (event.keyCode) {
			case 27:
			case 9:
				isOpen = false
				break
		}
	}

	function navigateOptions(event) {
		const parent = event.target.closest('div')
		switch (event.keyCode) {
			case 38:
				if (parent.previousSibling) {
					parent.previousSibling.querySelector('input').focus()
				} else {
					parent.parentNode.lastChild.querySelector('input').focus()
				}
				break
			case 40:
				if (parent.nextSibling) {
					parent.nextSibling.querySelector('input').focus()
				} else {
					parent.parentNode.firstChild.querySelector('input').focus()
				}
				break
			case 32:
			case 13:
				event.target.click()
				break
			case 27:
			case 9:
				isOpen = false
				break
		}
	}
</script>

<div class="mt-4 relative h-12">
	<label
		class="absolute left-0 px-1 ml-2 z-10 transition-all duration-200 rounded pointer-events-none"
		class:z-30={isOpen}
		class:-mt-2={focusedOrContainsValue || isOpen}
		class:bg-white={focusedOrContainsValue || isOpen}
		class:dark:bg-gray-800={focusedOrContainsValue || isOpen}
		class:top-0={focusedOrContainsValue || isOpen}
		class:pt-3={!focusedOrContainsValue && !isOpen}
		class:pt-0={focusedOrContainsValue || isOpen}
		class:text-xs={focusedOrContainsValue || isOpen}
		class:text-gray-700={!focused}
		class:dark:text-gray-200={!focused}
		class:text-primary-700={focusedAndValidOrPristine}
		class:dark:text-primary-500={focusedAndValidOrPristine}
		class:text-red-600={dirtyAndInvalid && (focused || isOpen)}
		class:dark:text-red-500={dirtyAndInvalid && (focused || isOpen)}
		for={name + randomSuffix}
		>{label}<span class="ml-px">{isRequired ? '*' : ''}</span>
	</label>
	<div
		class="w-full relative flex flex-row justify-center items-center rounded bg-white dark:bg-gray-800"
		class:border={!focused && !isOpen}
		class:border-2={focused || isOpen}
		class:border-gray-400={pristineOrValid}
		class:dark:border-gray-700={pristineOrValid}
		class:border-primary-600={focusedAndValidOrPristine || (isOpen && !dirtyAndInvalid)}
		class:dark:border-primary-500={focusedAndValidOrPristine || (isOpen && !dirtyAndInvalid)}
		class:border-red-600={dirtyAndInvalid}
		class:dark:border-red-500={dirtyAndInvalid}
		class:z-20={isOpen}
		class:rounded-bl-none={isOpen}
		class:rounded-br-none={isOpen}
	>
		<input
			class="px-3 py-3 w-full shadow-none dark:bg-gray-800 outline-none focus:ring-0 overflow-ellipsis whitespace-nowrap overflow-hidden rounded"
			class:z-20={isOpen}
			type="text"
			{name}
			readonly
			id={name + randomSuffix}
			value={displayName && displayName.length ? displayName.join(', ') : null}
			autocomplete="off"
			on:input={event => toggleOptions(event)}
			on:keydown={event => navigateToFirstOption(event)}
			on:focus={event => ((focused = true), toggleOptions(event))}
			on:blur={() => (focused = false)}
			{...$$restProps}
		/>
		<button
			type="button"
			aria-label="Expand select options"
			tabindex="-1"
			class:z-20={isOpen}
			class="focus:outline-none focus:ring-0"
			on:keydown={event => navigateToFirstOption(event)}
			on:click|preventDefault={() => toggleOptions()}
		>
			<Icon classes={isOpen ? 'opacity-100' : 'opacity-70'} icon={faCaretDown} />
		</button>
	</div>
	{#if isOpen}
		<button
			data-testid="{name}-bg"
			tabindex="-1"
			on:click|preventDefault={() => (isOpen = false)}
			class="fixed block inset-0 w-full h-full z-100 bg-gray-200 dark:bg-gray-700 opacity-50 cursor-default"
			on:keydown|preventDefault={event => handleEscKey(event)}
		/>
	{/if}
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<div
		role="search"
		bind:this={selectOptions}
		on:keydown|preventDefault={event => navigateOptions(event)}
		data-testid="{name}-options"
		class:hidden={!isOpen}
		class="absolute left-0 w-full max-h-60 overflow-auto py-2 bg-white dark:bg-gray-800 border-b-2 rounded shadow-md border-2 z-30 border-t-0 rounded-tl-none rounded-tr-none"
		class:border-primary-600={focusedAndValidOrPristine || !dirtyAndInvalid}
		class:border-red-600={dirtyAndInvalid}
	>
		{#each options.data as option (typeof option.value === 'object' ? option.value[options.idField] : option.value)}
			<div
				class="block px-3 py-1 rounded-none font-normal hover:text-white dark:hover:text-gray-800 text-gray-800 dark:text-gray-200 hover:bg-primary-600 dark:hover:bg-primary-500"
			>
				<CheckboxControl
					tabindex="-1"
					checked={value &&
						(typeof option.value === 'object'
							? value.find(
									val => val[options.idField] === option.value[options.idField]
							  ) !== undefined
							: value.includes(option.value))}
					value={typeof option.value === 'object'
						? JSON.stringify(option.value)
						: option.value}
					on:change={event => selectOption(event)}
					>{typeof option.value === 'object'
						? option.value[options.nameField]
						: option.name}</CheckboxControl
				>
			</div>
		{/each}
	</div>
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
