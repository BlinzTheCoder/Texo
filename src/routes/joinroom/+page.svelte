<script lang="ts">
	// @ts-nocheck
	import { database } from '$lib/firebase.js';
	import Topbar from '$lib/components/Topbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { goto } from '$app/navigation';
	import { ref, get } from 'firebase/database';

	let roomNumber = $state<number>();
	let roomName = $state<string>();

	async function joinRoom() {
		if (!roomNumber || roomNumber.toString().length < 5 || roomNumber.toString().length > 10) {
			alert('Room number must be between 5 and 10 digits.');
			return;
		}

		const trimmedName = roomName?.trim();
		if (
			!trimmedName ||
			trimmedName.length < 5 ||
			trimmedName.length > 12 ||
			!/^[A-Za-z ]+$/.test(trimmedName)
		) {
			alert('Room name must be 5–12 characters and contain only letters and spaces.');
			return;
		}

		const roomId = roomNumber.toString();
		const roomRef = ref(database, `rooms/${roomId}`);

		const snapshot = await get(roomRef);
		if (!snapshot.exists()) {
			alert('Room does not exist.');
			return;
		}

		const roomData = snapshot.val();
		const storedRoomName = roomData.roomName?.trim().toLowerCase();
		const inputRoomName = trimmedName.toLowerCase();

		if (storedRoomName !== inputRoomName) {
			alert('Room name is invalid.');
			console.log(`Stored Room Name: ${storedRoomName}, Input Room Name: ${inputRoomName}`);
			return;
		}

		if (roomData.currentPeople >= roomData.maxPeople) {
			alert('Room is full. Please try another room.');
			console.log('Room is full');
			return;
		}

		goto(`/chatroom?r=${roomId}`);
	}
</script>

<main>
	<Topbar />
	<div class="flex flex-col items-center justify-center">
		<h1 class="mt-4 select-none text-4xl font-bold text-white underline-offset-4 hover:underline">
			Join a Room
		</h1>
		<p class="mt-4 text-2xl text-gray-400">
			Enter room details to enter a room, so you can chat with people or <a
				href="/joinrandomroom"
				class="underline">join a random room</a
			>
		</p>

		<div class="mt-10 flex h-[30rem] w-[55rem] flex-col items-center rounded-lg bg-[--bg-3]">
			<h1 class="mt-6 select-none text-4xl font-bold text-white underline-offset-4 hover:underline">
				Room Details
			</h1>
			<div class="mb-9 mt-4 h-[0.05rem] w-[55rem] select-none bg-[--bg-4] text-[--bg-3]">Line</div>

			<div class="input-holder">
				<p class="title-text">Room Number</p>
				<input
					placeholder="Enter a room number"
					class="input w-[25rem]"
					type="number"
					bind:value={roomNumber}
				/>
				<p class="extra-info absolute">The room number should be between 5 and 10 <br />numbers.</p>
			</div>
			<div class="input-holder mt-[4.0rem]">
				<p class="title-text">Room Name</p>
				<input
					placeholder="Enter a room name"
					class="input w-[25rem]"
					maxlength="12"
					minlength="5"
					type="text"
					title="Only alphanumeric characters and spaces are allowed."
					bind:value={roomName}
				/>
				<p class="extra-info absolute">The room name should be between 5 and 12 characters</p>
				<p class="extra-info absolute mt-6">
					The room name should not contan any symbols or <br /> numbers. Ex - @, !, ;
				</p>
			</div>
			<div class="input-holder mt-[5.5rem]">
				<button
					onclick={joinRoom}
					class="h-12 w-52 rounded-md bg-[--bg-6] px-4 py-2 font-semibold text-white transition-all delay-100 duration-200"
					>Join Room</button
				>
			</div>
		</div>
	</div>
	<Footer />
</main>

<style>
	main {
		height: 100vh;
		padding-bottom: 10rem;
		width: auto;
		background-color: var(--bg-1);
		background-image: radial-gradient(rgb(49, 49, 49) 1px, transparent 0);
		background-size: 40px 40px;
	}

	input::placeholder {
		user-select: none;
	}

	.extra-info {
		@apply text-gray-300;
		font-family: 'Poppins', sans-serif;
		font-weight: 600;
		font-style: normal;
	}

	button {
		@apply mt-5 hover:bg-[--bg-4] focus:bg-[--bg-4];
		font-family: 'Poppins', sans-serif;
		font-weight: 600;
		font-style: normal;
	}

	.input {
		@apply my-2 rounded-md bg-[--bg-3] px-4 py-2 text-white;
		font-family: 'Poppins', sans-serif;
		font-weight: 600;
		font-style: normal;
		border: none;
		outline: none;
		box-shadow: 2px 2px 2px rgb(27, 27, 27);
		@apply text-white ring-2 ring-[--bg-4];
	}

	.title-text {
		font-family: 'Poppins', sans-serif;
		font-weight: 600;
		font-style: normal;
		color: white;
		@apply text-lg;
	}
	input[type='number']::-webkit-outer-spin-button,
	input[type='number']::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	::selection {
		background-color: var(--bg-5);
		color: white;
	}
</style>
