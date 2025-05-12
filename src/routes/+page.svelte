<script lang="ts">
	import Topbar from '$lib/components/Topbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Joinroom from '$lib/components/Joinroom.svelte';
	import Createroom from '$lib/components/Createroom.svelte';
	import Joinrandomroom from '$lib/components/Joinrandomroom.svelte';
	import Message from '$lib/components/Message.svelte';

	// Simulated conversation data
	const userId = 'user1'; // Assume 'user1' is BlinzTheCoder
	const messages = [
		{
			content: 'Hey BlinzTheCoder 2, how are you?',
			senderName: 'BlinzTheCoder',
			sentTime: '10:00 AM',
			senderId: 'user1',
			messageId: 1
		},
		{
			content: 'I am good, thanks! What about you?',
			senderName: 'BlinzTheCoder 2',
			sentTime: '10:01 AM',
			senderId: 'user2',
			messageId: 2
		},
		{
			content: 'I am doing great! Just working on some new projects.',
			senderName: 'BlinzTheCoder',
			sentTime: '10:02 AM',
			senderId: 'user1',
			messageId: 3
		},
		{
			content: 'That sounds awesome! I am also learning some new stuff.',
			senderName: 'BlinzTheCoder 2',
			sentTime: '10:03 AM',
			senderId: 'user2',
			messageId: 4
		},
		{
			content: 'What are you learning?',
			senderName: 'BlinzTheCoder',
			sentTime: '10:04 AM',
			senderId: 'user1',
			messageId: 5
		},
		{
			content: 'I am learning Svelte and TypeScript.',
			senderName: 'BlinzTheCoder 2',
			sentTime: '10:05 AM',
			senderId: 'user2',
			messageId: 6
		},
		{
			content: 'That\'s great! I love Svelte.',
			senderName: 'BlinzTheCoder',
			sentTime: '10:06 AM',
			senderId: 'user1',
			messageId: 7
		},
		{
			content: 'Me too! It makes building UIs so much easier.',
			senderName: 'BlinzTheCoder 2',
			sentTime: '10:07 AM',
			senderId: 'user2',
			messageId: 8
		}
	];

	// Simulating a message delete function
	function deleteMessage(messageId: number) {
		const index = messages.findIndex((msg) => msg.messageId === messageId);
		if (index !== -1) {
			messages.splice(index, 1);
		}
	}
</script>

<main>
	<Topbar />
	<div class="flex flex-col items-center justify-center">
		<h1 class="mt-8 select-none text-4xl font-bold text-white underline-offset-4 hover:underline">
			Welcome to Texo
		</h1>
		<p class="mt-4 text-2xl text-gray-400">
			Seems like you are not in a room. Join or create your own room to chat with others!
		</p>

		<span class="select-none text-white">
			<Createroom />
			<Joinroom />
		</span>

		<div class="-mt-2 select-none text-white">
			<Joinrandomroom />
		</div>

		<div class="text-display mt-8 h-[50rem] w-[50rem] rounded-lg bg-[--bg-3] ring-black">
			<div class="my-2 mx-4 sample-text">
				{#each messages as msg}
					<Message
						messageContent={msg.content}
						messageSenderName={msg.senderName}
						messageTime={msg.sentTime}
						isOwnMessage={msg.senderId === userId}
						onDelete={() => deleteMessage(msg.messageId)}
					/>
				{/each}
			</div>
		</div>
		<div class="flex flex-col items-center -mb-4 mt-6 text-white text-2xl">
			<p class="text-1">Texo makes meeting with new people easy</p>
			<p class="text-gray-400">Meet with people randomly across the world</p>
		</div>
	</div>
	<Footer />
</main>

<style>
	main {
		height: auto;
		padding-bottom: 10rem;
		width: auto;
		background-color: var(--bg-1);
		background-image: radial-gradient(rgb(49, 49, 49) 1px, transparent 0);
		background-size: 40px 40px;
	}

	::selection {
		background-color: var(--bg-4);
		color: white;
	}

	.text-display {
		box-shadow: 5px 5px 5px rgb(15, 15, 15);
	}

	.text-display {
		overflow-y: scroll;
		height: 40rem;
	}
</style>
