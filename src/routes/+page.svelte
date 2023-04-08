<script>
	import { page } from '$app/stores'
</script>

<nav>
	<ul>
		<li class:active={$page.url.pathname === '/'}>
			<a data-sveltekit-preload-data href="/">Home</a>
		</li>
		<li class:active={$page.url.pathname === '/select'}>
			<a data-sveltekit-preload-data href="/select">Select</a>
		</li>
		<li class:active={$page.url.pathname === '/input'}>
			<a data-sveltekit-preload-data href="/input">Input</a>
		</li>
	</ul>
</nav>
