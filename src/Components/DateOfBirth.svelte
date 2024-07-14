<script lang="ts">
  import { writable } from 'svelte/store';
  import type { Writable } from 'svelte/store';
  export let dob: Writable<{ day: string, month: string, year: string }>;
  export let errorMessage: Writable<string>; // Declare errorMessage prop

  const validateDob = () => {
    const { day, month, year } = $dob;
    if (day === '' || month === '' || year === '') {
      errorMessage.set('Invalid Date, please select a valid date');
    } else {
      errorMessage.set('');
    }
  };

  // Options for days, months, and years
  let days: string[] = [];
  let months: string[] = [];
  let years: string[] = [];

  // Populate days, months, and years
  const populateDays = () => {
    for (let i = 1; i <= 31; i++) {
      days.push(i.toString());
    }
  };

  const populateMonths = () => {
    months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  };

  const populateYears = () => {
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= currentYear - 100; i--) {
      years.push(i.toString());
    }
  };

  // Call functions to populate options
  populateDays();
  populateMonths();
  populateYears();
</script>

<div class="dob-field">
  
  <div class="dob-inputs">
    <select id="day" bind:value={$dob.day} on:change={validateDob}>
      <option value="">Day</option>
      {#each days as dayOption (dayOption)}
        <option value={dayOption}>{dayOption}</option>
      {/each}
    </select>
    <select id="month" bind:value={$dob.month} on:change={validateDob}>
      <option value="">Month</option>
      {#each months as monthOption (monthOption)}
        <option value={monthOption}>{monthOption}</option>
      {/each}
    </select>
    <select id="year" bind:value={$dob.year} on:change={validateDob}>
      <option value="">Year</option>
      {#each years as yearOption (yearOption)}
        <option value={yearOption}>{yearOption}</option>
      {/each}
    </select>
  </div>
  {#if $errorMessage}
    <div class="error-message dob-error">{$errorMessage}</div>
  {/if}
</div>

<style>
  /* Include your CSS styles here */
</style>
