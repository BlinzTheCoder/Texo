<script lang="ts">
  import { onMount } from 'svelte';
  import Topbar from '$lib/components/Topbar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import Message from '$lib/components/Message.svelte';
  import { database } from '$lib/firebase.js';
  import { remove, ref, set, onChildAdded, onChildRemoved, get } from 'firebase/database';
  import { goto } from '$app/navigation';

  let roomId: string | null = null;
  let message: string = '';
  let messageId: string;
  let userId: string;
  let userName: string | null;
  let loading = true;
  let hasLoadedFirstMessage = false;

  type MessageType = {
    senderName: string | null;
    senderId: string;
    sentTime: string; // ISO string
    sentTimeZone: string;
    content: string;
    messageId: string;
  };

  let chatMessages: MessageType[] = [];

  function loadUserInfo() {
    userId = localStorage.getItem('userId') || self.crypto.randomUUID();
    localStorage.setItem('userId', userId);

    userName = localStorage.getItem('userName');
    if (!userName) {
      userName = crypto.randomUUID().slice(0, 8);
      localStorage.setItem('userName', userName);
    }
  }

  onMount(() => {
    loadUserInfo();
    const params = new URLSearchParams(window.location.search);
    roomId = params.get('r');

    if (roomId) {
      const roomRef = ref(database, 'rooms/' + roomId);

      get(roomRef)
        .then((snapshot) => {
          if (!snapshot.exists()) {
            alert("Room doesn't exist");
            goto('/joinroom');
            return;
          }

          const messagesRef = ref(database, 'rooms/' + roomId + '/messages');

          const timeout = setTimeout(() => {
            loading = false;
            hasLoadedFirstMessage = true;
          }, 3000);

          onChildAdded(messagesRef, (snapshot) => {
            const newMessage = snapshot.val();
            chatMessages = [...chatMessages, newMessage];

            // Sort messages by sent time (including seconds)
            chatMessages = chatMessages.sort((msg1, msg2) => {
              const time1 = new Date(msg1.sentTime).getTime();
              const time2 = new Date(msg2.sentTime).getTime();
              return time1 - time2;
            });

            if (!hasLoadedFirstMessage) {
              hasLoadedFirstMessage = true;
              loading = false;
              clearTimeout(timeout);
            }
          });

          onChildRemoved(messagesRef, (snapshot) => {
            const deletedMessageId = snapshot.key;
            chatMessages = chatMessages.filter(msg => msg.messageId !== deletedMessageId);
          });
        })
        .catch((error) => {
          console.error('Error checking room existence:', error);
          alert("Room doesn't exist");
          goto('/joinroom');
        });
    } else {
      alert("Room doesn't exist");
      goto('/joinroom');
    }
  });

  function handleMessage(e: Event) {
    e.preventDefault();

    if (message.trim() === '' || !roomId || !userId) return;

    const messageData: MessageType = {
      senderName: userName,
      senderId: userId,
      sentTime: new Date().toISOString(), // Store full ISO string
      sentTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      content: message,
      messageId: crypto.randomUUID()
    };

    messageId = messageData.messageId;
    const messageRef = ref(database, `rooms/${roomId}/messages/${messageId}`);
    set(messageRef, messageData)
      .then(() => {
        message = '';
      })
      .catch((error) => {
        console.error('Error sending message:', error);
      });
  }

  function deleteMessage(messageId: string) {
    console.log('Deleting message with ID:', messageId);

    const messageRef = ref(database, `rooms/${roomId}/messages/${messageId}`);
    remove(messageRef)
      .then(() => {
        chatMessages = chatMessages.filter((msg) => msg.messageId !== messageId);
      })
      .catch((error) => {
        console.error('Error deleting message:', error);
      });
  }
</script>

<main>
  <Topbar />
  <div class="flex flex-col items-center justify-center">
    <h1 class="mt-4 select-none text-4xl font-bold text-white underline-offset-4 hover:underline">
      Chat Room
    </h1>
    <p class="mt-4 text-2xl text-gray-400">Chat with people about various topics and enjoy!</p>

    <div
      class="chat-box mt-5 flex h-[50rem] w-[50rem] flex-col overflow-y-scroll rounded-t-lg bg-[--bg-3] p-4"
    >
      {#if loading}
        <p class="text-xl text-gray-400">Loading Messages...</p>
      {:else if chatMessages.length === 0 && hasLoadedFirstMessage}
        <p class="text-xl text-gray-400">No messages yet. Be the first to say hi!</p>
      {:else}
        {#each chatMessages as msg}
          <div class="mb-2">
            <Message
              messageContent={msg.content}
              messageSenderName={msg.senderName}
              messageTime={msg.sentTime}
              isOwnMessage={msg.senderId === userId}
              onDelete={() => deleteMessage(msg.messageId)}
            />
          </div>
        {/each}
      {/if}
    </div>

    <form onsubmit={handleMessage} class="mt-4 flex w-[50rem] items-center justify-center">
      <input
        type="text"
        bind:value={message}
        maxlength="100"
        placeholder="Type your message here..."
        class="message mr-3 h-16 w-full bg-[--bg-3] p-4 text-lg text-white"
      />
      <button
        type="submit"
        class="text-1 h-16 rounded-md bg-gray-800 px-6 font-semibold text-white transition-all delay-75 duration-100 hover:bg-gray-900"
      >
        Send
      </button>
    </form>
  </div>
  <Footer />
</main>

<style>
  main {
    background-color: var(--bg-1);
    background-image: radial-gradient(rgb(49, 49, 49) 1px, transparent 0);
    background-size: 40px 40px;
    padding-bottom: 15rem;
    width: auto;
  }

  .chat-box {
    scroll-behavior: smooth;
  }

  .message {
    border-radius: 0.5rem;
    outline: none;
    border: 1px solid rgb(85, 85, 85);
    font-family: 'Poppins', sans-serif;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
  }

  .message:focus {
    outline: none;
  }

  input::placeholder {
    user-select: none;
  }

  ::selection {
    background-color: var(--bg-5);
    color: white;
  }
</style>
