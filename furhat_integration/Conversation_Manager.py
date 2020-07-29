import requests
from Bots import Bots
from Speech_Handlers import Speech_Handlers


class Conversation_Manager:
    def __init__(self):
        self.bots = Bots()
        self.speech = Speech_Handlers()

    def redirect(self, utterance):
        """
        Check if utterance is complete or incomplete and re-direct it.
        """
        # This handles error in case of timeout in the ASR when utterance is emtpy.
        if utterance == False:
            self.speech.tts("Sorry I didn't hear you. Bye!")
            return
        # self.bots.conversation_alana(utterance)
        self.bots.conversation_rasa(utterance)
