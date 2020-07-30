package furhatos.app.wolframalpha.flow

import furhatos.nlu.common.*
import furhatos.flow.kotlin.*
import furhatos.gestures.Gestures

val BASE_URL = "http://localhost:5005/webhooks/rest/webhook" // Endpoint for Wolfram Alpha's API with answers tailored for spoken interactions
//val APP_ID = "EQKLKA-5EGTXH74UG" // Test account, feel free to use it for testing.
val FAILED_RESPONSES = listOf("No result available", "Rasa did not understand your input")
val TIMEOUT = 4000 // 4 seconds

// Start state containing everything except the query to the API
val start : State = state(interaction) {

    //onEntry {
    //    furhat.ask("Hi there!")
    //}

    onResponse {
        // Query done in query state below, with its result saved here since we're doing a call
        val response = call(query(it.text)) as String
        furhat.say(response)
    }
}

// State to conduct the query to the API
fun query(question: String) = state {
    onEntry {
        //val query = "$BASE_URL?i=$question&appid=$APP_ID"

        /* Call to WolframAlpha API made in an anynomous substate (https://docs.furhat.io/flow/#calling-anonymous-states)
         to allow our timeout below to stop the call if it takes to long. Note that you explicitly has to cast the result to a String.
          */
        val response = call {
            //khttp.get(query).text
            khttp.post(
                url = $BASE_URL,
                data = mapOf("sender" to "test123", "message" to $question))
        } as String

        // Reply to user depending on the returned response
        val reply = when {
            FAILED_RESPONSES.contains(response) -> {
                println("No answer from rasa")
                "Sorry bro, can't understand"
            }
            else -> response
        }
        // Return the response
        terminate(reply)
    }

    onTime(TIMEOUT) {
        println("Issues connecting to Rasa")
        // If timeout is reached, we return nothing
        terminate("I'm having issues connecting to my brain. Try again later!")
    }
}
