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

class ActionHelloWorld(Action):

    def name(self) -> Text:
        return "action_hello_world"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        dispatcher.utter_message(text="Hello World!")

        return []

class ActionEventDetails(Action):

    def name(self) -> Text:
        return "action_event_details"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        event_name_slot = tracker.get_slot("event_name")
        event_location_slot = tracker.get_slot("event_location")
        event_type_slot = tracker.get_slot("event_type")
        event_cost_slot = tracker.get_slot("event_cost")
        event_date_time_slot = tracker.get_slot("event_date_time")
        event_yes_slot = tracker.get_slot("event_yes")
        event_no_slot = tracker.get_slot("event_no")

        entities = tracker.latest_message['entities']
        print(*entities, sep = ", ")
        
        if not event_name_slot:
            dispatcher.utter_message("Which event you want to attend?")  
        elif not event_location_slot:
            dispatcher.utter_message("Could you please tell me which location you are looking for?")
        elif not event_type_slot:
            dispatcher.utter_message("Are you looking for online or direct event?")
        elif not event_cost_slot:
            dispatcher.utter_message("Are you looking for free or paid event?")
        elif not event_date_time_slot:
            dispatcher.utter_message("Can you tell me on which date and time you are looking for?")
        elif not event_yes_slot and not event_no_slot:
            dispatcher.utter_message("Shall I book a place for you")
        elif event_yes_slot:
            dispatcher.utter_message("OK I will list the {} event from {}". format(event_name_slot, event_location_slot))
            dispatcher.utter_message("Here are the results found for {} and {} based event on {} ". format(event_cost_slot, event_type_slot, event_date_time_slot))
            print("fetch from api")
            dispatcher.utter_message("There is a {} event on {} in {} around 4 pm at the lauriston hall, george street.". format(event_name_slot, event_date_time_slot, event_location_slot))
            dispatcher.utter_message("Ok I have booked for you")
            return [AllSlotsReset()]
        elif event_no_slot:
            dispatcher.utter_message("Would you like to look for some other events to participate")      
            return [AllSlotsReset()]
        return []