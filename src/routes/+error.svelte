<script>
	import { page } from '$app/stores';
	import Topbar from '$lib/components/Topbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<main>
	<Topbar />
	{#if $page.error?.message === 'Not Found'}
		<div class="flex flex-col items-center text-white">
			<p
				style="font-family: 'Poppins', sans-serif;"
				class="mt-8 cursor-default text-7xl font-bold hover:underline"
			>
				Error {$page.status}
			</p>
			<p style="font-family: 'Quicksand', sans-serif;" class="mt-4 text-4xl font-bold">
				Page not found
			</p>
			<p style="font-family: 'Poppins', sans-serif;" class="mt-12 text-xl font-medium">
				The page you are looking for doesn't exist.
			</p>
			<p style="font-family: 'Poppins', sans-serif;" class="mt-4 text-xl font-medium">
				Check the Page URL or try again later
			</p>
		</div>

		<div class="group flex flex-col items-center text-2xl text-white">
			<a href="/" class="mt-4" style="font-family: 'Poppins', sans-serif;">Go Home</a>
			<div class="duration-450 mt-1 h-1 w-0 bg-white transition-all group-hover:w-28"></div>
		</div>
	{/if}
</main>

<style>
	::selection {
		background-color: var(--bg-4);
		color: white;
	}

	main {
		width: 100vw;
		height: 100vh;
		background: #4cb8b6;
		overflow: hidden;
		background-color: var(--bg-1);
		background-image: radial-gradient(rgb(49, 49, 49) 1px, transparent 0);
		background-size: 40px 40px;
	}
</style>
