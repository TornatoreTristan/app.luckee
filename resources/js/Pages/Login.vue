<template>
  <div class="flex justify-center items-center flex-col">
    <h1>Connexion à votre compte</h1>
    <div class="block-auth">
      <form @submit.prevent="handleSubmit">
        <div class="input-auth">
          <label for="email">Votre email</label>
          <input type="email" name="email" id="email" />
        </div>
        <div class="input-auth">
          <label for="password">Votre mot de passe</label>
          <input type="password" name="password" id="password" />
        </div>
        <button class="btn" type="submit">Se connecter</button>
      </form>
    </div>
  </div>
</template>

<script setup>
const handleSubmit = async () => {
  console.log('hello')
  const formData = new FormData()
  formData.append('email', email.value)
  formData.append('password', password.value)

  try {
    const response = await fetch('/login', {
      method: 'POST',
      body: formData,
    })
    const data = await response.json()

    if (response.ok) {
      window.location.href = '/dashboard'
    }
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}
</script>
