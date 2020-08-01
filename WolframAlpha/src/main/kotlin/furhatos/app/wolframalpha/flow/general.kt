package furhatos.app.wolframalpha.flow

import furhatos.flow.kotlin.*
import furhatos.flow.kotlin.voice.PollyVoice
import furhatos.flow.kotlin.voice.Voice
import furhatos.util.*

val defaultVoice = PollyVoice("Matthew")

val idle: State = state {
    init {
        println("idleinit")
        furhat.setTexture("male")
        furhat.voice = Voice(name = "Salli-Neural",gender = Gender.MALE, language = Language.ENGLISH_US, pitch = "high", rate = 0.8)
        if (users.count > 0) {
            furhat.attend(users.random)
            goto(start)
        }
    }

    onEntry {
        println("idleentry")
        furhat.attendNobody()
    }

    onUserEnter {
        println("idleonenter")
        furhat.attend(it)
        goto(start)
    }
}

val interaction: State = state {
    onUserLeave(instant = true) {
        println("int-onUserLeave")
        if (users.count > 0) {
            if (it == users.current) {
                furhat.attend(users.other)
                goto(start)
            } else {
                furhat.glance(it)
            }
        } else {
            println("int-goidle")
            goto(idle)
        }
    }

    onUserEnter(instant = true) {
        println("int-onUserEnter")
        furhat.glance(it)
    }

}