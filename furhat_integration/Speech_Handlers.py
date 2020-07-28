import os
import socket
import time


class Speech_Handlers:
    def __init__(self):
        pass

    def asr(self):
        f = open("furhat.txt", "r")

        user_input = str(f.read())
        while not user_input:
            f = open("furhat.txt", "r")

            user_input = str(f.read())

        print(user_input)
        f = open("furhat.txt", "w")
        f.write("")
        f.close()
        return user_input

    def tts(self, utterance, wait=False):
        # f = open("furhat.txt", "w")
        # f.write(utterance)
        # f.close()
        print(utterance)

        f = open("resp.txt", "w")
        f.write(utterance)
        f.close()

        if wait:
            time.sleep(10)
        else:
            time.sleep(4)
