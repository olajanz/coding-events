<template>
  <div>
    <h2>Event</h2>
  </div>
</template>

<script>
import { getEvents } from "@/services/event-service.js";
export default {
  data() {
    return {
      events: {}
    };
  },

  async created() {
    try {
      const res = await getEvents();
      this.events = res.data;
    } catch (error) {
      console.error(error);
    }
  }
};
</script>

<style scoped></style>
