<template>
  <div>
    <h1>Register</h1>
    <div>
      <form @submit.prevent="handleSubmit">
        <div>
          <label for="email">Votre email</label>
          <input type="email" name="email" id="email" />
        </div>
        <div>
          <label for="firstname">Votre prénom</label>
          <input type="text" name="firstname" id="firstname" />
        </div>
        <div>
          <label for="lastname">Votre nom</label>
          <input type="text" name="lastname" id="lastname" />
        </div>
        <div>
          <label for="password">Votre mot de passe</label>
          <input type="password" name="password" id="password" />
        </div>
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  </div>
</template>

<script setup>
const handleSubmit = async () => {
  const formData = new FormData()
  formData.append('email', email.value)
  formData.append('firstname', firstname.value)
  formData.append('lastname', lastname.value)
  formData.append('password', password.value)

  try {
    const response = await fetch('/signup', {
      method: 'POST',
      body: formData,
    })
    const data = await response.json()

    if (data.response === 'ok') {
      router.push('/dashboard')
    }
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}
</script>
