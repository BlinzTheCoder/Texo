<script lang="ts">
	import Topbar from '$lib/components/Topbar.svelte';
	import { onMount } from 'svelte';
	let userName: any;

	onMount(() => {
		if (!localStorage.getItem('userName')) {
			localStorage.setItem('userName', crypto.randomUUID());
		} else {
			userName = localStorage.getItem('userName');
		}
	});

	function updateUserName() {
		localStorage.setItem('userName', userName);
		console.log('User name updated to:', userName);
	}
</script>

<main>
	<Topbar />
	<div class="flex flex-col items-center justify-center">
		<h1 class="mt-4 select-none text-4xl font-bold text-white underline-offset-4 hover:underline">
			Settings
		</h1>
		<p class="mt-4 text-2xl text-gray-400">Change your settings here.</p>

		<div class="mt-10 flex h-[50rem] w-[55rem] flex-col items-center rounded-lg bg-[--bg-3]">
			<div class="input-holder mt-10">
				<p class="title-text">User Name</p>
				<input
					placeholder="Enter a name"
					class="input w-[28rem]"
					oninput={updateUserName}
					maxlength="18"
					type="text"
					bind:value={userName}
				/>
				<p class="extra-info mt-2">This name will show on all your messages</p>
				<p class="text-1 mt-20 text-3xl text-white">More Settings Coming Soon. (Maybe)</p>
			</div>
		</div>
	</div>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-bottom: 2rem;
		background-color: var(--bg-1);
		background-image: radial-gradient(rgb(49, 49, 49) 1px, transparent 0);
		background-size: 40px 40px;
	}

	.input {
    font-family: 'Poppins', sans-serif;
		font-weight: 600;
		font-style: normal;
		border: none;
		outline: none;
		box-shadow: 2px 2px 2px rgb(27, 27, 27);
		@apply text-white ring-2 ring-[--bg-4] my-2 rounded-md bg-[--bg-3] px-4 py-2;
	}

	.title-text {
		font-family: 'Poppins', sans-serif;
		font-weight: 600;
		color: white;
		@apply text-lg;
	}

	input::placeholder {
		user-select: none;
	}

	.extra-info {
		@apply text-gray-300;
		font-family: 'Poppins', sans-serif;
		font-weight: 600;
	}

  ::selection {
    background-color: var(--bg-1);
  }

	.input-holder {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
