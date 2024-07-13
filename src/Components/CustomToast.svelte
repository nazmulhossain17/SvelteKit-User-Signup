<!-- CustomToast.svelte -->
<script lang="ts">
  import { writable } from 'svelte/store';

  // Define types for toast messages
  interface ToastMessage {
    id: number;
    message: string;
    type: 'info' | 'success' | 'error';
    duration: number;
  }

  // Toast store to manage toast messages
  const toastStore = writable<ToastMessage[]>([]);

  // Function to add a new toast message
  export function showToast(message: string, type: 'info' | 'success' | 'error', duration = 4000) {
    toastStore.update(currentToasts => [
      ...currentToasts,
      { id: Date.now(), message, type, duration },
    ]);
  }

  // Function to remove a toast message
  function removeToast(id: number) {
    toastStore.update(currentToasts => currentToasts.filter(toast => toast.id !== id));
  }

  // Auto-remove toast after duration
  let autoRemoveTimeout: NodeJS.Timeout;
  toastStore.subscribe(toasts => {
    if (toasts.length > 0) {
      const { duration, id } = toasts[toasts.length - 1];
      clearTimeout(autoRemoveTimeout);
      autoRemoveTimeout = setTimeout(() => removeToast(id), duration);
    }
  });
</script>

{#each $toastStore as toast (toast.id)}
  <div class="toast" class:toast-{toast.type}>
    <span>{toast.message}</span>
    <button class="close-btn" on:click={() => removeToast(toast.id)}>&times;</button>
  </div>
{/each}

<style>
  /* Toast styles */
  .toast {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 10px 20px;
    border-radius: 5px;
    color: #fff;
    z-index: 1000;
    max-width: 300px;
    background-color: #333;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  .toast-info {
    background-color: #007bff;
  }

  .toast-success {
    background-color: #28a745;
  }

  .toast-error {
    background-color: #dc3545;
  }

  .close-btn {
    cursor: pointer;
    background: none;
    border: none;
    color: inherit;
    padding: 0;
    font-size: 1rem;
  }
</style>
