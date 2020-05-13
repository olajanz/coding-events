import { mount } from "@vue/test-utils";
import EventCard from "@/components/EventCard.vue";
import { getEvents } from "@/services/event-service.js";

jest.mock("@/services/event-service.js");

const exampleEvents = new Promise(reject => {
  reject([
    {
      id: 1,
      title: "Challenge Session",
      details: "Please bring beer!",
      date: "04/07/2020 20:00",
      location: "https://zoom.us/j/861156*454"
    },
    {
      id: 2,
      title: "Study Group",
      details: "Please bring your laptop!",
      date: "06/19/2020 16:00",
      location: "Albertina"
    },
    {
      id: 3,
      title: "Pair Programming Session",
      details: "Please bring pizza!",
      date: "05/06/2020 15:15",
      location: "https://zoom.us/j/861156*454"
    }
  ]);
});

describe("EventCard", () => {
  test("it should be able to mount the component", () => {
    const wrapper = mount(EventCard);
    expect(wrapper).toBeDefined();
  });

  test("it should call getEvents when created", () => {
    getEvents.mockReset();
    mount(EventCard);

    expect(getEvents).toHaveBeenCalled();
  });

  test("it should set the data property events to the recived events when created", () => {
    getEvents.mockReset();
    getEvents.mockReturnValue(exampleEvents);
    const wrapper = mount(EventCard);

    expect(wrapper.vm.events).toEqual(exampleEvents);
  });
});
