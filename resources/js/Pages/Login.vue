<template>
  <div>
    <h1>Loggin</h1>
    <div>
      <form @submit.prevent="handleSubmit">
        <div>
          <label for="email">Votre email</label>
          <input type="email" name="email" id="email" />
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
      router.push('/dashboard')
    }
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}
</script>
