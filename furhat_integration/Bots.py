import json
import sys
import random
from Bot_Requests import Bot_Requests
from Speech_Handlers import Speech_Handlers


class Bots:
    def __init__(self):
        self.bot_requests = Bot_Requests()
        self.speech = Speech_Handlers()

    def conversation_alana(self, initial_utterance="Hello"):
        """
        Start a conversation with Alana in a loop.
        """
        print("Say 'Stop' to exit\n")

        alana_init = self.bot_requests.request_alana(initial_utterance)
        self.speech.tts(alana_init)

        while True:
            utterance = self.speech.asr()

            if utterance == False or utterance.lower() == "stop":
                break

            bot_response = self.bot_requests.request_alana(utterance)
            self.speech.tts(bot_response)

    def conversation_rasa(self, initial_utterance="Hello"):
        """
        Start a conversation with Alana or Rasa bot in a loop.
        """
        print("Say 'Stop' to exit\n")

        rasa_init = self.bot_requests.request_rasa(initial_utterance)
        self.speech.tts(rasa_init)

        while True:
            utterance = self.speech.asr()

            if utterance == False or utterance.lower() == "stop":
                break

            bot_response = self.bot_requests.request_rasa(utterance)
            self.speech.tts(bot_response)
