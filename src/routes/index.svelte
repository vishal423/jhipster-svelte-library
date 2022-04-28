<script context="module">
	export const prerender = true
</script>

<script>
	import { page } from '$app/stores'
</script>

<nav>
	<ul>
		<li class:active="{$page.url.pathname === '/'}">
			<a sveltekit:prefetch href="/">Home</a>
		</li>
		<li class:active="{$page.url.pathname === '/select'}">
			<a sveltekit:prefetch href="/select">Select</a>
		</li>
	</ul>
</nav>
