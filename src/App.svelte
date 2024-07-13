<script>
    import { onMount } from 'svelte';
    import toast, { Toaster } from 'react-hot-toast';
  
    onMount(() => {
      toast.success('App loaded!');
    });
  </script>
  
  <main>
    <slot></slot>
    <Toaster />
  </main>
  
  <style>
    /* Your app styles */
  </style>
  