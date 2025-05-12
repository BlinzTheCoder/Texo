<script lang="ts">
	// @ts-nocheck
	import Topbar from '$lib/components/Topbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { database } from '$lib/firebase.js';
	import { ref, set, onValue } from 'firebase/database';
	import { get } from 'svelte/store';

	let roomNumber = $state();
	let maxPeople = $state();
	let roomName = $state();
	let messages = $state([]);
	let roomDetailsCorrect = $state([false, false, false]);

	async function createRoom() {
		if ([...roomDetailsCorrect].every((val) => val === true)) {
			console.log('Room details are correct!');
			await set(ref(database, 'rooms/' + roomNumber), {
				roomNumber: roomNumber,
				roomName: roomName.toLowerCase(),
				maxPeople: maxPeople,
				messages: messages,
				roomTopic: document.getElementById('roomTopic').value
			});
			window.location.href = '/chatroom' + '?r=' + roomNumber;
		} else {
			console.log('Some details are invalid');
		}
	}

	function checkRoomNumber() {
		const length = roomNumber?.toString().length;
		roomDetailsCorrect[0] = length >= 5 && length <= 10;
	}

	function checkMaxPeople() {
		roomDetailsCorrect[1] = maxPeople >= 5 && maxPeople <= 20;
	}

	function checkRoomName() {
		const valid = /^[A-Za-z ]+$/.test(roomName) && roomName.length >= 5 && roomName.length <= 12;
		roomDetailsCorrect[2] = valid;
	}
</script>

<main>
	<Topbar />
	<div class="flex flex-col items-center justify-center">
		<h1 class="mt-4 select-none text-4xl font-bold text-white underline-offset-4 hover:underline">
			Create a Room
		</h1>
		<p class="mt-4 text-2xl text-gray-400">
			Enter room details to create a room, so that people can
			<a class="underline underline-offset-2" href="/joinroom">join a room</a>
		</p>

		<div class="mt-10 flex h-[50rem] w-[55rem] flex-col items-center rounded-lg bg-[--bg-3]">
			<h1 class="mt-6 select-none text-4xl font-bold text-white underline-offset-4 hover:underline">
				Room Details
			</h1>
			<div class="mb-9 mt-4 h-[0.05rem] w-[55rem] select-none bg-[--bg-4] text-[--bg-3]">Line</div>

			<div class="input-holder">
				<p class="title-text">Room Number</p>
				<input
					placeholder="Enter a room number"
					class="input w-[25rem]"
					oninput={checkRoomNumber}
					type="number"
					bind:value={roomNumber}
				/>
				<p class="extra-info absolute">The room number should be between 5 and 10 <br />numbers</p>
			</div>

			<div class="input-holder mt-[4.0rem]">
				<p class="title-text">Room Name</p>
				<input
					placeholder="Enter a room name"
					class="input w-[25rem]"
					maxlength="12"
					minlength="5"
					type="text"
					oninput={checkRoomName}
					title="Only letters and spaces allowed"
					bind:value={roomName}
				/>
				<p class="extra-info absolute">The room name should be between 5 and 12 characters</p>
				<p class="extra-info absolute mt-6">
					The room name should not contain any symbols or <br /> numbers. Ex - @, !, ;
				</p>
			</div>

			<div class="mt-[6rem]">
				<p class="title-text">Max Number of Chatters</p>
				<input
					placeholder="Enter max number of chatters"
					class="input w-[25rem]"
					type="number"
					oninput={checkMaxPeople}
					bind:value={maxPeople}
				/>
				<p class="extra-info absolute">
					The number of max chatters should be between <br /> 5 and 20 members
				</p>
			</div>

			<div class="input-holder mt-16">
				<p class="title-text">Room Topic</p>
				<select id="roomTopic" class="input w-[25rem]">
					<option value="any" selected>Any</option>
					<option value="sports">Sports</option>
					<option value="movies">Movies</option>
					<option value="music">Music</option>
					<option value="games">Games</option>
					<option value="technology">Technology</option>
					<option value="food">Food</option>
					<option value="travel">Travel</option>
					<option value="fashion">Fashion</option>
					<option value="art">Art</option>
					<option value="health">Health</option>
				</select>
				<p class="extra-info">Select a room topic</p>
			</div>

			<div class="input-holder mt-[3.5rem]">
				<button
					onclick={createRoom}
					class="h-12 w-52 rounded-md bg-[--bg-6] px-4 py-2 font-semibold text-white transition-all delay-100 duration-200"
				>
					Create Room
				</button>
			</div>
		</div>
	</div>
	<Footer />
</main>

<style>
	main {
		height: 120vh;
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
