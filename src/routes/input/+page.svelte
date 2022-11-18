<script>
	import InputControl from '$lib/input-control.svelte'
	import { Page, Form } from '$lib/page'

	export let login = {
		name: '',
		password: '',
	}

	let validName = false
	let validPassword = false

	function updateName(event) {
		login.name = event.target.value
	}
	function updatePassword(event) {
		login.password = event.target.value
	}
</script>

<svelte:head>
	<title>InputControl</title>
	<meta name="Description" content="InputControl svelte component" />
</svelte:head>

<Page width="full">
	<div
		class="text-left flex flex-row justify-between items-center"
		slot="header"
	>
		<span>InputControl</span>
	</div>
	<Form testId="demo">
		<div><span>Input example</span></div>
		<InputControl
			id="username"
			label="Username"
			name="username"
			value="{login.name}"
			on:input="{event => updateName(event)}"
			required
			validations="{[
				{ type: 'required', message: 'Username is mandatory' },
			]}"
			on:validate="{event => (validName = event.detail.valid)}"
		/>
		<div><span>Control state is {validName}</span></div>

		<br />

		<div><span>Password type example</span></div>

		<InputControl
			id="password"
			type="password"
			label="Password"
			name="password"
			value="{login.password}"
			on:input="{event => updatePassword(event)}"
			required
			validations="{[
				{ type: 'required', message: 'Password is mandatory' },
			]}"
			on:validate="{event => (validPassword = event.detail.valid)}"
		/>
		<div><span>Control state is {validPassword}</span></div>
	</Form>
</Page>
