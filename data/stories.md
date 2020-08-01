## happy path
* greet
  - utter_greet
* mood_great
  - utter_ask_event_interest

## happy path
* greet
  - utter_greet
* mood_check
  - utter_mood_response
  - utter_ask_event_interest

## thank you
* thank
  - utter_welcome

## say goodbye
* goodbye
  - utter_goodbye

## any event
* events
  - action_event_details

## event location
* event_location_intent
  - action_event_details

## event type
* event_type_intent
  - action_event_details

## event cost
* event_cost_intent
  - action_event_details

## event confirm
* event_confirm
  - action_event_details

## event cancel
* event_cancel
  - action_event_details

## event number
* event_number_intent
  - action_event_details

## event date time
* event_datetime_intent
  - action_event_details

## event_mid_utterance
* mid_utterance
  - utter_ask_mid_utterance

    
## interactive_story_1
* greet
    - utter_greet
* mood_great
    - utter_ask_event_interest
* event_confirm{"event_yes": "yes please"}
    - slot{"event_yes": "yes please"}
    - action_event_details
* events{"event_name": "yoga"}
    - slot{"event_name": "yoga"}
    - action_event_details
* events{"event_type": "online", "event_cost": "free", "event_identifier": "event_identifier"}
    - slot{"event_cost": "free"}
    - slot{"event_type": "online"}
    - action_event_details
* event_datetime_intent{"event_date_time": "wednesday", "time_session": "morning"}
    - slot{"event_date_time": "wednesday"}
    - slot{"time_session": "morning"}
    - action_event_details
    - slot{"event_result": ["yoga event on 19 August in Bolton, Manchester at 10 hour and 30 minutes", "yoga event on 26 August in Dalkeith, Edinburgh at 10 hour and 0 minutes"]}
* event_number_intent{"num_identifier": "second"}
    - slot{"num_identifier": "second"}
    - action_event_details
    - reset_slots
* greet
    - utter_greet
* mood_great
    - utter_ask_event_interest
* event_confirm{"event_yes": "ok"}
    - slot{"event_yes": "ok"}
    - action_event_details
    - action_event_details
* events{"event_name": "coffee morning"}
    - slot{"event_name": "coffee morning"}
    - action_event_details
* event_type_intent{"event_type": "direct", "event_cost": "paid", "event_identifier": "event_identifier"}
    - slot{"event_cost": "paid"}
    - slot{"event_type": "direct"}
    - action_event_details
* event_location_intent{"event_location": "glasgow"}
    - slot{"event_location": "glasgow"}
    - action_event_details
    - utter_greet
* mood_great
    - utter_ask_event_interest
* event_confirm{"event_yes": "sure"}
    - slot{"event_yes": "sure"}
    - action_event_details
    - utter_ask_event_time
    - utter_ask_event_time
* event_datetime_intent{"event_date_time": "sunday", "time_session": "evening"}
    - slot{"event_date_time": "sunday"}
    - slot{"time_session": "evening"}
    - action_event_details
    - reset_slots
* events{"event_name": "standup comedy", "event_type": "direct", "event_cost": "free", "event_identifier": "event_identifier", "event_location": "edinburgh"}
    - slot{"event_cost": "free"}
    - slot{"event_location": "edinburgh"}
    - slot{"event_name": "standup comedy"}
    - slot{"event_type": "direct"}
    - action_event_details
    - utter_ask_event_time
* event_datetime_intent{"event_date_time": "sunday", "time_session": "evening"}
    - slot{"event_date_time": "sunday"}
    - slot{"time_session": "evening"}
    - action_event_details
    - reset_slots
* mid_utterance{"event_name": "tea", "event_cost": "free", "event_identifier": "event_identifier", "event_location": "glasgow"}
    - slot{"event_cost": "free"}
    - slot{"event_location": "glasgow"}
    - slot{"event_name": "tea"}
