<template>
  <div>
    <h1>Create an Event</h1>
    <form @submit.prevent="submit">
      <input
        v-model="event.title"
        type="text"
        name="title"
        placeholder="Add a Title"
      />

      <input
        v-model="event.details"
        type="text"
        name="details"
        placeholder="Add some details"
      />

      <input
        v-model="event.location"
        type="text"
        name="location"
        placeholder="Add a location"
      />

      <input
        v-model="event.date"
        type="date"
        name="date"
        placeholder="Date: mm/dd/yyyy"
      />
      <input type="submit" value="Create" />
    </form>
  </div>
</template>

<script>
import { createEvent } from "@/services/event-service.js";

export default {
  data() {
    return {
      event: {
        title: "",
        details: "",
        location: "",
        date: "",
      },
    };
  },
  methods: {
    async submit() {
      try {
        await createEvent(this.event);
        this.$router.push({ name: "dashboard" });
      } catch (error) {
        alert("Couldn't create an entry, check your input");
      }
    },
  },
};
</script>

<style scoped>
form {
  display: grid;
  gap: 2em;
  max-width: 500px;
  margin: 0 auto;
}
</style>
