<script lang="ts">
	import { goto } from '$app/navigation';
	import { database } from '$lib/firebase.js';
	import { ref, get } from 'firebase/database';
	import Topbar from '$lib/components/Topbar.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let roomTopic: string = 'any';
	let roomMaxPeople: number = 5;

async function joinRandomRoom() {
	if (roomMaxPeople < 5 || roomMaxPeople > 20) {
		alert('The max number of chatters should be between 5 and 20 members.');
		return;
	}

	const roomsRef = ref(database, 'rooms');
	const snapshot = await get(roomsRef);

	if (!snapshot.exists()) {
		alert('No rooms available at the moment.');
		return;
	}

	const rooms = snapshot.val();
	const filteredRooms: any[] = [];

	for (let roomId in rooms) {
		const room = rooms[roomId];

		const currentPeople = room.currentPeople ?? 0;
		const maxPeople = room.maxPeople ?? 20;
		const topic = room.topic ?? 'any';

		const topicMatches = roomTopic === 'any' || topic === roomTopic;
		const maxPeopleFits = maxPeople <= roomMaxPeople;
		const hasSpace = currentPeople < maxPeople;

		if (topicMatches && maxPeopleFits && hasSpace) {
			filteredRooms.push({ id: roomId, ...room });
		}
	}

	if (filteredRooms.length === 0) {
		alert('No rooms match your filters right now. Try different options or create a new room.');
		return;
	}

	const randomRoom = filteredRooms[Math.floor(Math.random() * filteredRooms.length)];
	goto(`/chatroom?r=${randomRoom.id}`);
}

</script>

<main>
	<Topbar />
	<div class="flex flex-col items-center justify-center">
		<h1 class="mt-4 select-none text-4xl font-bold text-white underline-offset-4 hover:underline">
			Join a Random Room
		</h1>
		<p class="mt-4 text-2xl text-gray-400">Enter some basic details to join a random room</p>
		<div class="mt-10 flex h-[30rem] w-[55rem] flex-col items-center rounded-lg bg-[--bg-3]">
			<h1 class="mt-6 select-none text-4xl font-bold text-white underline-offset-4 hover:underline">
				Room Details
			</h1>
			<div class="mb-9 mt-4 h-[0.05rem] w-[55rem] select-none bg-[--bg-4] text-[--bg-3]">Line</div>
			<div class="input-holder">
				<p class="title-text">Max number of chatters</p>
				<input
					placeholder="Enter a number"
					class="input w-[25rem]"
					type="number"
					min="5"
					max="20"
					bind:value={roomMaxPeople}
				/>
				<p class="extra-info absolute">
					The max number of chatters should be between <br /> 5 and 20 members
				</p>
			</div>
			<div class="input-holder mt-16">
				<p class="title-text">Room Topic</p>
				<select id="roomTopic" class="input w-[25rem]" bind:value={roomTopic}>
					<option value="any">Any</option>
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
			<div class="input-holder mt-[3.9rem] flex justify-center">
				<button
					onclick={joinRandomRoom}
					class="h-12 w-52 rounded-md bg-[--bg-6] px-4 py-2 font-semibold text-white transition-all delay-100 duration-200"
					>Join Random Room</button
				>
			</div>
		</div>
	</div>
	<Footer />
</main>

<style>
	/* Styling */
	main {
		height: 100vh;
		padding-bottom: 10rem;
		width: auto;
		background-color: var(--bg-1);
		background-image: radial-gradient(rgb(49, 49, 49) 1px, transparent 0);
		background-size: 40px 40px;
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

	input::placeholder {
		user-select: none;
	}
</style>
