## happy path
* greet
  - utter_greet
* mood_great
  - utter_happy

## sad path 1
* greet
  - utter_greet
* mood_unhappy
  - utter_cheer_up
  - utter_did_that_help
* affirm
  - utter_happy

## interactive_story_yoga
*  events{"event_name":"yoga"}
  - utter_yoga_informations

## interactive_story_music
*  events{"event_name":"music"}
  - utter_music_informations

## sad path 2
* greet
  - utter_greet
* mood_unhappy
  - utter_cheer_up
  - utter_did_that_help
* deny
  - utter_goodbye

## say goodbye
* goodbye
  - utter_goodbye

## bot challenge
* bot_challenge
  - utter_iamabot

## interactive_story_1
* events{"event_identifier": "event"}
    - utter_ask_event_name
* events{"event_identifier": "events"}
    - utter_ask_event_location
* events{"event_identifier": "events", "event_location": "Edinburgh"}
    - utter_ask_event_time
* date_time{"date_time": "Monday"}
    - utter_music_informations
* thank{"thank": "thank you"}
    - utter_goodbye

## interactive_story_1
* greet
    - utter_greet
* events{"event_name": "yoga", "event_identifier": "events"}
    - utter_ask_event_location
* events{"event_location": "edinburgh"}
    - utter_yoga_location_informations
* thank{"thank": "thank you"}
    - utter_goodbye


## interactive_story_1
* greet
    - utter_greet
* events{"event_identifier": "activities"}
    - utter_ask_event_location
* events{"event_location": "edinburgh"}
    - utter_yoga_event_category
* events{"event_identifier": "details"}
    - utter_lunch_information
* thank{"thank": "thank you"}
    - utter_goodbye

    

## interactive_story_1
* greet
    - utter_greet
* events{"event_identifier": "activities"}
    - utter_ask_event_location
* events{"event_location": "edinburgh"}
    - utter_yoga_event_category
* events{"event_identifier": "details"}
    - utter_lunch_information
* thank{"thank": "thank you"}
    - utter_goodbye

## interactive_story_1
* events{"event_identifier": "events"}
    - utter_ask_event_name
* events
    - utter_ask_event_location
* events{"event_location": "edinburgh"}
    - utter_lunch_information

## interactive_story_1
* events{"event_name": "yoga", "event_identifier": "events"}
    - utter_ask_event_location
* events{"event_location": "edinburgh"}
    - utter_yoga_informations

## interactive_story_1
* events{"event_name": "yoga"}
    - utter_ask_event_location
* events{"event_location": "edinburgh"}
    - utter_ask_event_pay_type
* events{"event_identifier": "event"}
    - utter_yoga_informations
* thank{"thank": "thank you"}
    - utter_goodbye

## interactive_story_1
* events{"event_identifier": "events"}
    - utter_ask_event_name
* events{"event_name": "yoga", "event_identifier": "activity"}
    - utter_ask_event_location
* events{"event_location": "edinburgh"}
    - utter_yoga_informations

## interactive_story_1
* events{"event_identifier": "events"}
    - utter_ask_event_name
* events{"event_name": "yoga", "event_identifier": "activity"}
    - utter_ask_event_pay_type
* events{"event_identifier": "event"}
    - utter_yoga_informations
* date[preferred_date]
    - utter_happy
* events
    - utter_ask_event_time
* date_time
    - utter_yoga_informations
