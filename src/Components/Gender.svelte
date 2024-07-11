<script lang="ts">
  import type { Writable } from 'svelte/store';
  export let gender: Writable<string>;
  export let errorMessage: Writable<string>; // Declare errorMessage prop

  const validateGender = () => {
    if (!$gender) {
      errorMessage.set('Please choose a gender');
    } else {
      errorMessage.set('');
    }
  };
</script>

<div class="gender-field">
  <p>Please choose a gender. You can change who can see this later.</p>
  <div class="gender-options" on:change={validateGender}>
    <label>
      Female
      <input type="radio" name="gender" bind:group={$gender} value="Female">
    </label>
    <label>
      Male
      <input type="radio" name="gender" bind:group={$gender} value="Male">
    </label>
    <label>
      Custom
      <input type="radio" name="gender" bind:group={$gender} value="Custom">
    </label>
  </div>
  {#if $errorMessage}
    <div class="error-message">{$errorMessage}</div>
  {/if}
</div>

<style>
  /* Include your CSS styles here */
</style>
