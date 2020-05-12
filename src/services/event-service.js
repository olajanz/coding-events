import axios from "axios";

export function createEvent(event) {
  return axios.post("http://localhost:3000/events", event);
}

export function getEvent() {
  return axios.get("http://localhost:3000/events");
}
