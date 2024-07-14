<script lang="ts">
  import DateOfBirth from '../Components/DateOfBirth.svelte';
  import Gender from '../Components/Gender.svelte';
  import { writable, get } from 'svelte/store';
  import '../app.css';

  let formData = {
    firstName: '',
    lastName: '',
    emailOrMobile: '',
    password: '',
    dateOfBirth: writable({ day: '', month: '', year: '' }),
    gender: writable('')
  };

  let contactError = writable('');
  let dobError = writable('');
  let genderError = writable('');
  function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidMobileNumber(mobileNumber: string): boolean {
  const mobileNumberRegex = /^[0-9]{10}$/; // Example: 10 digits only

  return mobileNumberRegex.test(mobileNumber);
}

  function isValidDate(day: number, month: number, year: number): boolean {
    const date = new Date(year, month, day);
    return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day;
  }

  function validateForm() {
  let currentErrors: { [key: string]: string } = {};

  if (!formData.emailOrMobile) {
    contactError.set('Email or Mobile Number is required.');
  } else if (!isValidEmail(formData.emailOrMobile) && !isValidMobileNumber(formData.emailOrMobile)) {
    contactError.set('Please enter a valid Email or Mobile Number.');
  } else {
    contactError.set('');
  }

  formData.dateOfBirth.update(dob => {
    const { day, month, year } = dob;
    if (!day || !month || !year) {
      currentErrors.dateOfBirth = 'Date of Birth is required.';
    } else {
      const monthIndex = new Date(`${month} 1`).getMonth();
      const dayNumber = parseInt(day, 10);
      const monthNumber = monthIndex;
      const yearNumber = parseInt(year, 10);

      if (!isValidDate(dayNumber, monthNumber, yearNumber)) {
        currentErrors.dateOfBirth = 'Invalid Date of Birth.';
      }
    }
    return dob;
  });

  if (!get(formData.gender)) {
    genderError.set('Gender is required.');
  } else {
    genderError.set('');
  }

  if (Object.keys(currentErrors).length === 0) {
    dobError.set('');
  } else {
    dobError.set(currentErrors.dateOfBirth || '');
  }

  return Object.keys(currentErrors).length === 0;
}

  async function handleSubmit(event: Event) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

  const formDataToSend = {
  firstName: formData.firstName,
  lastName: formData.lastName,
  emailOrMobile: formData.emailOrMobile, // Already a string from input type=text
  password: formData.password,
  dateOfBirth: get(formData.dateOfBirth),
  gender: get(formData.gender)
};


try {
 
  const response = await fetch("http://localhost:5000/api/user/signup", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formDataToSend)
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const result = await response.json();
  console.log(result);
} catch (error) {
  console.error('Error:', error);
}
  }
</script>

<main class="signup-container">
  <div class="header">
    <h2>Sign Up</h2>
    <span class="close-btn">&times;</span>
  </div>

  <form id="signup-form" on:submit={handleSubmit}>
    <div class="name-fields">
      <input placeholder="First Name" type="text" bind:value={formData.firstName} />
      <input type="text" placeholder="Surname" bind:value={formData.lastName} />
    </div>

    <input placeholder="Enter Mobile number or email address" type="text" bind:value={formData.emailOrMobile} />
    {#if $contactError}
    <p class="error">{$contactError}</p>
  {/if}
    <input placeholder="Password must be at least 4 chars long" type="password" bind:value={formData.password} />

    

    <DateOfBirth dob={formData.dateOfBirth} errorMessage={dobError} />
    <Gender gender={formData.gender} errorMessage={genderError} />
    <p class="terms">By clicking Sign Up, you agree to our User Agreement, Privacy Policy, and Cookie Policy.</p>
    <div class="form-buttons">
      <button type="submit" class="signup-btn">Sign Up</button>
      <button type="button" class="cancel-btn">Cancel</button>
    </div>
  </form>
</main>

<style>
  .error {
    color: red;
  }
</style>
