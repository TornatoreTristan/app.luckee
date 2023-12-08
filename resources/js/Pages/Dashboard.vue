<template>
  <div>
    <h1>Dashboard</h1>
    <div>
      <p>Bienvenue sur votre dashboard {{ user.email }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: Object,
  },
}
</script>
