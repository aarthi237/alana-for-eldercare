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


class ActionUtterDefault(Action):
    def name(self) -> Text:
        return "action_utter_default"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:

        dispatcher.utter_message(text="Sorry i dont understand")

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
        event_date_time_slot = tracker.get_slot("event_date_time")
        event_result = tracker.get_slot("event_result")
        event_yes_slot = tracker.get_slot("event_yes")
        event_no_slot = tracker.get_slot("event_no")
        event_number = tracker.get_slot("num_identifier")
        event_session_slot = tracker.get_slot("time_session")

        if (
            event_result
            and len(event_result) == 1
            and event_yes_slot
            and not event_no_slot
        ):
            if event_yes_slot:
                dispatcher.utter_message("OK i will note down")
                return [AllSlotsReset()]
            elif event_no_slot:
                dispatcher.utter_message("Would you be interested in any other events")
                return [AllSlotsReset()]
            else:
                dispatcher.utter_message("OK i will book the event for you. ")
                dispatcher.utter_message(
                    "would you like to set notification for your booked event"
                )
            return []

        if event_result and len(event_result) > 0 and event_no_slot:
            dispatcher.utter_message("OK Are you looking for any other event?")
            return [AllSlotsReset()]

        if event_result and len(event_result) > 1 and event_number:
            if event_yes_slot:
                dispatcher.utter_message("OK i will note down")
                return [AllSlotsReset()]
            elif event_no_slot:
                dispatcher.utter_message("Would you be interested in any other events")
                return [AllSlotsReset()]
            else:
                dispatcher.utter_message(
                    "OK i will book the {} event for you".format(event_number)
                )
                dispatcher.utter_message(
                    "would you like to set notification for your booked event"
                )
            return []

        if event_no_slot:
            dispatcher.utter_message(
                "OK. if you are looking for any social event in future please let me know. I will help you to search event"
            )
            dispatcher.utter_message("Have a Nice day, Bye Bye")
            return [AllSlotsReset()]

        event_params = {
            "event_name": event_name_slot,
            "location_name": event_location_slot,
            "type": event_type_slot,
            "pay_type": event_cost_slot,
            "event_datetime": event_date_time_slot,
            "event_session": event_session_slot,
        }
        entities = tracker.latest_message["entities"]
        print(*entities, sep=", ")

        if not event_name_slot:
            dispatcher.utter_message(
                "Awesome Which event you wish to attend? for example yoga, music, coffee morning"
            )
        elif not event_type_slot:
            dispatcher.utter_message("OK Are you looking for online or direct event?")
        elif not event_location_slot and event_type_slot == "direct":
            dispatcher.utter_message(
                "Could you please tell me which city you are looking for? for example edinburgh, glasgow, livingston"
            )
        elif not event_cost_slot:
            dispatcher.utter_message("OK Are you looking for free or paid event?")
        elif not event_date_time_slot and not event_session_slot:
            dispatcher.utter_message(
                "OK Can you tell me on which day you are looking for?"
            )
        elif not event_result:
            dispatcher.utter_message(
                "OK I will search the {} event for you".format(event_name_slot)
            )
            response = requests.get(
                "http://localhost:3000/events", params=event_params
            ).json()
            print(response["result"])
            if response["result"] == True:
                i = 1
                dispatcher.utter_message(
                    "Here are the results found for {} and {} based event on {} ".format(
                        event_cost_slot, event_type_slot, event_date_time_slot
                    )
                )
                for data in response["event_res_text"]:
                    print(i, " ", data)
                    message = "{}) {}".format(i, data)
                    dispatcher.utter_message(message)
                    i = i + 1
                if (len(response["event_res_text"])) > 1:
                    dispatcher.utter_message(
                        "Could you please tell me the option to book the events. for example first, second or third"
                    )
                else:
                    dispatcher.utter_message("Do you want to book the event")
                return [SlotSet("event_result", response["event_res_text"])]
            else:
                dispatcher.utter_message(
                    "Sorry there are no events for your search criteria"
                )
                dispatcher.utter_message(
                    "would you like to search for a different event"
                )
                return [AllSlotsReset()]
        return [SlotSet("event_yes", None), SlotSet("event_no", None)]

