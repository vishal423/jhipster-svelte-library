<script>
	import '../tailwind.css'
</script>

<div
	class="flex flex-col text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-900 antialiased min-h-screen font-sans"
>
	<header>
		<div class="p-8 w-full bg-gray-100 flex flex-col items-center">
			<img class="w-1/3" src="logo-jhipster-long.svg" alt="JHipster" />
		</div>
	</header>
	<main class="flex-grow">
		<slot />
	</main>
</div>
