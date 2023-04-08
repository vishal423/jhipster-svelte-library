<script>
	import SelectControl from '$lib/select-control.svelte'
	import { Page, Form } from '$lib/page'
	import selectJson from './_select.json'

	export let post = {
		blog: null,
		tags: [],
	}
	export let blogs = selectJson.blogs
	export let tags = selectJson.tags

	let validBlog = false
	let validTag = false

	function updateBlog(event) {
		post.blog = event.detail.value
	}
	function updateTag(event) {
		post.tags = event.detail.value
	}
</script>

<svelte:head>
	<title>SelectControl</title>
	<meta name="Description" content="SelectControl svelte component" />
</svelte:head>

<Page width="full">
	<div class="text-left flex flex-row justify-between items-center" slot="header">
		<span>SelectControl</span>
	</div>
	<Form testId="demo">
		<div><span>Select example</span></div>
		<SelectControl
			name="blog"
			label="Blog"
			value={post.blog ? [post.blog] : []}
			options={{
				nameField: 'name',
				idField: 'id',
				data: blogs.map(blog => ({
					value: blog,
				})),
			}}
			on:validate={event => {
				validBlog = event.detail.valid
			}}
			validations={[]}
			on:select={event => updateBlog(event)}
		/>
		<div><span>Control state is {validBlog}</span></div>

		<br />

		<div><span>Multi select example</span></div>

		<SelectControl
			name="tags"
			label="Tags"
			value={post.tags}
			multiple="true"
			options={{
				nameField: 'name',
				idField: 'id',
				data: tags.map(tag => ({
					value: tag,
				})),
			}}
			on:validate={event => {
				validTag = event.detail.valid
			}}
			validations={[]}
			on:select={event => updateTag(event)}
		/>
		<div><span>Control state is {validTag}</span></div>
	</Form>
</Page>
