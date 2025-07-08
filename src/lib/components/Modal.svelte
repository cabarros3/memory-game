<script lang="ts">
  import { createEventDispatcher } from "svelte"; // verificar como modificar isso aqui
  import { fade, scale } from "svelte/transition";

  export let open = false;
  export let title: string = "";
  export let showCloseButton: boolean = true;

  const dispatch = createEventDispatcher();

  function handleClose() {
    dispatch("close");
  }
</script>

{#if open}
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" transition:fade>
    <div
      class="bg-white dark:bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 relative"
      transition:scale={{ duration: 200 }}
    >
      {#if showCloseButton}
        <button
        on:click={handleClose}
        class="absolute top-4 right-4 z-50 text-zinc-500 hover:text-zinc-900 cursor-pointer select-none"
        aria-label="Close modal"
        title="Close"
        >
            ✕
        </button>
      {/if}

      {#if title}
        <h2 class="text-xl font-bold mb-4">{title}</h2>
      {/if}

      <div class="mb-4">
        <slot />
      </div>

      <div class="flex justify-end gap-2">
        <slot name="footer" />
      </div>
    </div>
  </div>
{/if}
