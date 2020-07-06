# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/core/actions/#custom-actions/


# This is a simple example for a custom action which utters "Hello World!"

from typing import Any, Text, Dict, List

from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.events import SlotSet, AllSlotsReset
import requests


class ActionHelloWorld(Action):
    def name(self) -> Text:
        return "action_hello_world"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:

        dispatcher.utter_message(text="Hello World!")

        return []


class ActionEventDetails(Action):
    def name(self) -> Text:
        return "action_event_details"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        event_name_slot = tracker.get_slot("event_name")
        event_location_slot = tracker.get_slot("event_location")
        event_type_slot = tracker.get_slot("event_type")
        event_cost_slot = tracker.get_slot("event_cost")

        event_params = {
            "event_name": event_name_slot,
            "event_location": event_location_slot,
            "event_type": event_type_slot,
            "event_cost": event_cost_slot,
        }
        # entities = tracker.latest_message["entities"]
        # print(*entities, sep=", ")

        if not event_name_slot:
            dispatcher.utter_message("Which event you want to attend")
        elif not event_location_slot:
            dispatcher.utter_message("Which location")
        elif not event_type_slot:
            dispatcher.utter_message("Are you looking for online or direct event")
        elif not event_cost_slot:
            dispatcher.utter_message("Are you looking for free or paid event")
        else:
            dispatcher.utter_message(
                "OK I will list the {} event from {}".format(
                    event_name_slot, event_location_slot
                )
            )
            dispatcher.utter_message(
                "I will look for {} and {} based event".format(
                    event_cost_slot, event_type_slot
                )
            )

            response = requests.get(
                "http://localhost:3000/events", params=event_params
            ).json()

            if len(response["event_res_text"]) > 0:
                for data in response["event_res_text"]:
                    print(data)
                    dispatcher.utter_message(data)
                return [AllSlotsReset()]
        return []
