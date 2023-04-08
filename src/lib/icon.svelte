<script>
	export let classes = ''
	export let icon
</script>

<svg
	aria-hidden="true"
	class="w-4 h-4 overflow-visible inline-block fill-current {classes}"
	role="img"
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 {icon ? icon.icon[0] : 0} {icon ? icon.icon[1] : 0}"
>
	<path fill="currentColor" d={icon ? icon.icon[4] : undefined} />
</svg>
