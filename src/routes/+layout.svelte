<script lang="ts">
	import '../app.css';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import Footer from '$lib/components/Footer.svelte';
	let { children } = $props();
</script>

{@render children()}
