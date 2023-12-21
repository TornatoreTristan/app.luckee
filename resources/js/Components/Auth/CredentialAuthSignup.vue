<template>
  <form @submit.prevent="handleSubmit">
    <div class="input-auth">
      <label for="email">Votre email</label>
      <input type="email" name="email" id="email" />
    </div>
    <div class="input-auth">
      <label for="firstname">Votre prénom</label>
      <input type="text" name="firstname" id="firstname" />
    </div>
    <div class="input-auth">
      <label for="lastname">Votre nom</label>
      <input type="text" name="lastname" id="lastname" />
    </div>
    <div class="input-auth">
      <label for="password">Votre mot de passe</label>
      <input type="password" name="password" id="password" />
    </div>
    <button class="btn" type="submit">S'inscrire</button>
  </form>
</template>

<script setup>
const handleSubmit = async () => {
  const formData = new FormData()
  formData.append('email', email.value)
  formData.append('firstName', firstname.value)
  formData.append('lastName', lastname.value)
  formData.append('password', password.value)

  try {
    const response = await fetch('/signup', {
      method: 'POST',
      body: formData,
    })
    const data = await response.json()

    if (response.ok) {
      window.location.href = '/'
    }
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}
</script>
