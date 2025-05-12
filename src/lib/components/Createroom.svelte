<script lang="ts">
	function createRoom() {
		window.location.href = '/createroom';
	}
</script>

<button
	onclick={createRoom}
	class="text-1 my-2 rounded-md px-4 py-2 transition-all delay-100 duration-100 hover:bg-[--bg-4] focus:bg-[--bg-4]"
	><p>+ &nbsp; Create Room</p>
</button>

<style>
	button {
		font-family: 'Poppins', sans-serif;
		font-weight: 600;
		font-style: normal;
	}
</style>
