<script lang="ts">
  let { messageContent, messageSenderName, messageTime, isOwnMessage, onDelete } = $props();
</script>

<div class="group mb-3 flex" class:justify-end={isOwnMessage} class:justify-start={!isOwnMessage}>
	<div
		class="relative flex flex-col"
		class:items-end={isOwnMessage}
		class:items-start={!isOwnMessage}
	>
		<span class="text-sm text-gray-400">{messageTime}</span>

		<span
			class="mt-1 inline-block max-w-[20rem] break-words rounded-lg px-4 py-3 text-left font-medium text-white"
			class:bg-gray-800={isOwnMessage}
			class:bg-[--bg-4]={!isOwnMessage}
		>
			{messageContent}
		</span>

		{#if isOwnMessage && onDelete}
			<div>
				<button
					onclick={onDelete}
					class="absolute left-0 top-0 hidden text-xs text-red-400 hover:underline group-hover:block"
				>
				<!-- Svg -->
					<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 -ml-8" viewBox="0 0 448 512">
						<path
							fill="#ff2929"
							d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"
						/>
					</svg>
				</button>
			</div>
		{/if}

		{#if !isOwnMessage}
			<div
				class="username mt-1 select-none text-sm text-gray-400 underline-offset-2 hover:underline"
			>
			<button class="mt-9" onclick={() => console.log('Clicked on message sender name: ', messageSenderName)}>{messageSenderName}</button>
		</div>
		{/if}
	</div>
</div>

<style>
	::selection {
		background-color: var(--bg-3);
		color: white;
	}

	.group:hover button {
		display: block;
	}

	button {
		position: absolute;
		top: 50%;
	}
</style>