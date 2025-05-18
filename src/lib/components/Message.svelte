<script lang="ts">
  import { onMount } from 'svelte';

  // Accessing props using $props
  let { messageContent, messageSenderName, messageTime, isOwnMessage, onDelete } = $props();

  let localTime: string | undefined = $state();

  onMount(() => {
    const date = new Date(messageTime);
    if (!isNaN(date.getTime())) {
      localTime = date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
    } else {
      localTime = 'Invalid time';
    }
  });
</script>

<div class="group mb-3 flex" class:justify-end={isOwnMessage} class:justify-start={!isOwnMessage}>
  <div class="flex flex-col" class:items-end={isOwnMessage} class:items-start={!isOwnMessage}>
    <!-- Timestamp -->
    <span class="text-sm text-gray-400">{localTime}</span>

    <!-- Bubble + delete wrapper -->
    <div class="relative mt-1 inline-block max-w-[20rem]" class:pl-8={isOwnMessage}>
      <!-- Delete button: only for own messages, only on hover -->
      {#if isOwnMessage}
        <button
          onclick={onDelete}
          class="absolute left-0 top-1/2 -translate-y-1/2 hidden group-hover:block p-1 text-red-400 hover:underline"
        >
          <!-- Delete Icon (SVG) -->
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 448 512">
            <path
              fill="currentColor"
              d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"
            />
          </svg>
        </button>
      {/if}

      <!-- Message bubble -->
      <span
        class="block w-full break-words rounded-lg px-4 py-3 font-medium text-white"
        class:bg-gray-800={isOwnMessage}
        class:bg-[--bg-4]={!isOwnMessage}
      >
        {messageContent}
      </span>
    </div>

    <!-- Sender name: only for others, always visible -->
    {#if !isOwnMessage && messageSenderName}
      <div class="mt-1 text-sm text-gray-400">
        <button
          onclick={() => console.log('Clicked on:', messageSenderName)}
          class="underline-offset-2 hover:underline whitespace-nowrap overflow-hidden text-ellipsis"
        >
          {messageSenderName}
        </button>
      </div>
    {/if}
  </div>
</div>

<style>
  ::selection {
    background-color: var(--bg-3);
    color: white;
  }
</style>
