<script lang="ts">
  import { writable } from 'svelte/store';
  import DateOfBirth from '../Components/DateOfBirth.svelte';
  import Gender from '../Components/Gender.svelte';
  import type { DateOfBirth as DOB, SignupErrors } from '../types';
  import '../app.css';

  // Stores for form data and error messages
  let dob = writable<DOB>({ day: '', month: '', year: '' });
  let gender = writable<string>('');
  let errorMessageDob = writable<string>('');
  let errorMessageGender = writable<string>('');
  let firstName = '';
  let surname = '';
  let contact = '';
  let password = '';
  let errors: SignupErrors = { contact: '', dob: '', gender: '' };

  // Handle form submission
  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    errors = { contact: '', dob: '', gender: '' };

    // Front-end validation
    if (!firstName) {
      errors.contact = 'Enter Mobile number or email address';
    }

    if (!surname) {
      errors.dob = 'Please select your date of birth';
    }

    if (!contact) {
      errors.gender = 'Please select your gender';
    }

    // Check if errors exist before sending data to back-end
    if (!errors.contact && !errors.dob && !errors.gender) {
      const response = await fetch('/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, surname, contact, password, gender, dob })
      });

      const result = await response.json();
      if (!response.ok) {
        errors = { ...errors, ...result.errors };
      }
    }
  };
</script>

<main class="signup-container">
  <div class="header">
    <h2>Sign Up</h2>
    <span class="close-btn">&times;</span>
  </div>
  <form on:submit={handleSubmit} id="signup-form">
    <div class="name-fields">
      <input type="text" bind:value={firstName} placeholder="First Name" required>
      <input type="text" bind:value={surname} placeholder="Surname" required>
    </div>
    <input type="text" bind:value={contact} placeholder="Enter Mobile number or email address">
    {#if errors.contact}
      <div class="error-message">{errors.contact}</div>
    {/if}
    <input type="password" bind:value={password} placeholder="Password must be at least 4 chars long">
    <DateOfBirth bind:dob={dob} bind:errorMessage={errorMessageDob} />
    {#if errors.dob}
      <div class="error-message">{errors.dob}</div>
    {/if}
    <Gender bind:gender={gender} bind:errorMessage={errorMessageGender} />
    {#if errors.gender}
      <div class="error-message">{errors.gender}</div>
    {/if}
    <p class="terms">By clicking Sign Up, you agree to our User Agreement, Privacy Policy, and Cookie Policy.</p>
    <div class="form-buttons">
      <button type="submit" class="signup-btn">Sign Up</button>
      <button type="button" class="cancel-btn">Cancel</button>
    </div>
  </form>
</main>

<style>
  /* Include your CSS styles here */
  .error-message {
    color: red;
    font-size: 0.8rem;
    margin-top: 0.2rem;
  }
</style>
