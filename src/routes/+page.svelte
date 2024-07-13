<script lang="ts">
  import { writable } from 'svelte/store';
  import type { Writable } from 'svelte/store';
  import '../app.css'
  // Stores for error messages and form data
  let errorMessageDob: Writable<string> = writable('');
  let errorMessageGender: Writable<string> = writable('');
  let firstName: string = '';
  let surname: string = '';
  let contact: string = '';
  let password: string = '';
  let gender: Writable<string> = writable('');
  let dob: Writable<{ day: string, month: string, year: string }> = writable({ day: '', month: '', year: '' });

  // Function to validate Date of Birth
  const validateDob = () => {
    const { day, month, year } = $dob;
    if (day === '' || month === '' || year === '') {
      errorMessageDob.set('Invalid Date, please select a valid date');
    } else {
      errorMessageDob.set('');
    }
  };

  // Function to validate Gender
  const validateGender = () => {
    if (!$gender || $gender === '') {
      errorMessageGender.set('Please choose a gender');
    } else {
      errorMessageGender.set('');
    }
  };

  // Options for days, months, and years
  let days: string[] = [];
  let months: string[] = [];
  let years: string[] = [];

  // Function to populate days
  const populateDays = () => {
    for (let i = 1; i <= 31; i++) {
      days.push(i.toString());
    }
  };

  // Function to populate months
  const populateMonths = () => {
    months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  };

  // Function to populate years
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

  // Function to handle form submission
  const handleSubmit = async (event: Event) => {
    event.preventDefault();

    try {
      const formData = {
        firstName,
        surname,
        contact,
        password,
        gender: $gender,
        dob: $dob
      };
      const apiUrl = import.meta.env.VITE_API_URL as string;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      alert('Signup successful!');
    } catch (error) {
      alert('Signup failed! Please try again.');
    }
  };
</script>

<main class="signup-container">
  <div class="header">
    <h2>Sign Up</h2>
    <span class="close-btn">&times;</span>
  </div>
  <form id="signup-form" on:submit|preventDefault={handleSubmit}>
    <div class="name-fields">
      <input type="text" placeholder="First Name" bind:value={firstName} required>
      <input type="text" placeholder="Surname" bind:value={surname} required>
    </div>
    <input type="text" placeholder="Enter Mobile number or email address" bind:value={contact}>
    <input type="password" placeholder="Password must be at least 4 chars long" bind:value={password}>
    
    <!-- Date of Birth Field -->
    <div class="dob-field">
      <label>Date of Birth</label>
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
      {#if $errorMessageDob}
        <div class="error-message dob-error">{$errorMessageDob}</div>
      {/if}
    </div>

    <!-- Gender Field -->
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
      {#if $errorMessageGender}
        <div class="error-message">{$errorMessageGender}</div>
      {/if}
    </div>

    <p class="terms">By clicking Sign Up, you agree to our User Agreement, Privacy Policy, and Cookie Policy.</p>
    <div class="form-buttons">
      <button type="submit" class="signup-btn">Sign Up</button>
      <button type="button" class="cancel-btn">Cancel</button>
    </div>
  </form>
</main>

<style>
  /* Add your CSS styles here */
</style>
