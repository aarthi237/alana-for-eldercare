package furhatos.app.wolframalpha.flow

import furhatos.nlu.common.*
import furhatos.flow.kotlin.*
import furhatos.gestures.Gestures
import org.json.JSONObject
import khttp.post
import org.json.JSONArray

val BASE_URL = "http://localhost:5005/webhooks/rest/webhook" // Endpoint for Wolfram Alpha's API with answers tailored for spoken interactions
//val APP_ID = "EQKLKA-5EGTXH74UG" // Test account, feel free to use it for testing.
val FAILED_RESPONSES = listOf("No result available", "Rasa did not understand your input")
val TIMEOUT = 4000 // 4 seconds

// Start state containing everything except the query to the API
val start : State = state(interaction) {

    onEntry {
        furhat.ask("Hi there!")
    }
    onResponse {
        val response = call(query(it.text)) as String
        furhat.say(response)
        goto(start1)
    }

}

val start1 : State = state(interaction) {

    onEntry {
        furhat.ask(" ")
    }
    onResponse {
        val response = call(query(it.text)) as String
        furhat.say(response)
        if(it.text != "Bye" && response != "OK Have a Nice day, Bye Bye") {
            goto(start2)
        }
    }
}

val start2 : State = state(interaction) {

    onEntry {
        furhat.ask(" ")
    }
    onResponse {
        val response = call(query(it.text)) as String
        furhat.say(response)
        if(it.text != "Bye" && response != "OK Have a Nice day, Bye Bye") {
            goto(start1)
        }
    }
}


// State to conduct the query to the API
fun query(question: String) = state {
    onEntry {
        val query = "$BASE_URL"

        /* Call to WolframAlpha API made in an anynomous substate (https://docs.furhat.io/flow/#calling-anonymous-states)
         to allow our timeout below to stop the call if it takes to long. Note that you explicitly has to cast the result to a String.
          */
        println(question)
        val rootObject= JSONObject()
        rootObject.put("sender","test123")
        rootObject.put("message",question)
        val response = call {
            //khttp.get(query).text
            post(url = BASE_URL, data = "{\"sender\":\"test1234\", \"message\": \"$question\"}").text
        } as String

        //println(response)

        val obj = JSONArray(response)
        //println(obj)
        var res = ""
        for (i in 0 until obj.length()) {
            val item = obj.getJSONObject(i)
            res += " ${furhat.voice.pause("2000ms")} " + item["text"]
//            furhat.say(item["text"])
//            furhat.say( "${furhat.voice.pause("1000ms")} ")
            println(item["text"])
        }
        // Reply to user depending on the returned response
        val reply = when {
            FAILED_RESPONSES.contains("test") -> {
                println("No answer from rasa")
                "Sorry bro, can't understand"
            }
            else -> res
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
