import requests
import random
import json
from pprint import pprint
import string

class Bot_Requests:
    def __init__(self):
        self.randomStr = self.get_random_string(5)

    def get_random_string(self, length):
        letters = string.ascii_lowercase
        return "".join(random.choice(letters) for i in range(length))

    def request_alana(self, utterance):
        """
        Requests for get an answer from Alana
        """

        data = {
            "user_id": "test-user",
            "question": utterance,
            "session_id": "987654321",
            "projectId": "CA2020",
            "overrides": {
                "BOT_LIST": [
                    {"event-bot": "http://1ef18415d25f.ngrok.io/webhooks/rest/webhook"},
                    "coherence_bot",
                    "news_bot_v2",
                    "wiki_bot_mongo",
                ],
                "PRIORITY_BOTS": [
                    "event-bot",
                    ["news_bot_v2", "wiki_bot_mongo"],
                    "coherence_bot",
                ],
            },
        }

        r = requests.post(url="http://52.56.181.83:5000", json=data)
        response = r.json()

        return response["result"]

    def request_rasa(self, utterance):
        """
        Request for an answer from Rasa
        """

        url = "http://localhost:5005/webhooks/rest/webhook"
        data = {"sender": self.randomStr, "message": utterance}
        json_data = json.dumps(data)

        res = requests.post(url, data=json_data).json()
        pprint(res)
        responseText = ""
        # try:
        if len(res) > 0:
            for data in res:
                print(data)
                responseText += "   {}".format(data["text"])
        # except:
        #     responseText = "Sorry"
        return responseText
