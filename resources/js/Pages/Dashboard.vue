<template>
  <div>
    <h1>Dashboard</h1>
    <hr class="mb-4" />
    <div>
      <p>Bienvenue sur votre dashboard {{ user.first_name + ' ' + user.last_name }}</p>
    </div>
    <div>
      <div>
        <h4>Crédits</h4>
        <p>10</p>
      </div>
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
