<template>
  <div>
    <h2>{{ event.title }}</h2>
    <h3>{{ date }}</h3>
    <p>{{ event.location }}</p>
    <p>{{ event.details }}</p>
  </div>
</template>

<script>
export default {
  props: ["event"],
  computed: {
    date() {
      let cardDate = new Date(this.event.date);
      return cardDate.toDateString();
    },
  },
};
</script>

<style scoped></style>
