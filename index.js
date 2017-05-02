//create an express application
var express = require('express')

//parsing middleware
var bodyParser = require('body-parser')
var request = require('request')
var app = express()

var joke = 0

//this sets the port number
app.set('port', (process.env.PORT || 5000))

//parses urlencoded middlewares
//extended: false makes it so that the values in the key-value pairs can be strings/arrays
app.use(bodyParser.urlencoded({extended: false}))

//creates an application/json parser
app.use(bodyParser.json())

//sends 'Hello world'
app.get('/', function (req, res) {
    res.send('Hello world')
})

//for Facebook verification
app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === 'validate_me') {
        res.send(req.query['hub.challenge'])
    }
    res.send('Error, wrong token')
})

//receives messages from webhooks 
app.post('/webhook/', function (req, res) {
    messaging_events = req.body.entry[0].messaging
    //loops as long as there are events
    for (i = 0; i < messaging_events.length; i++) {
        //event are "emitters" where functions are the "listeners"
        event = req.body.entry[0].messaging[i]
        //sender is a sender id
        sender = event.sender.id
        //if there is a user response
        if (event.message && event.message.text) {

            //text is the text of the message
            text = event.message.text

            //takes into account the different responses
            if(text === "Start" || text === "Hello" || text === "Hi" || text === "start" || text === "hello" || text === "hi")
            {
                sendtoUser(sender, "What kind of joke do you want to hear?\na) A CS joke\nb) A knock-knock joke\nc) Random!")
            }
            //CS jokes
            else if(text === "a" || text === "a) A CS joke" || text === "CS joke")
            {
                CSJoke(sender, 0)
            }
            else if(text === "What?" || text === "Why?" || text === "what?" || text === "why?")
            {
                CSJoke(sender, 1)
            }

            //knock knock jokes 
            else if(text === "b" || text === "b) A knock-knock joke" || text === "A knock-knock joke")
            {
                sendtoUser(sender, "Knock Knock")
            }
            else if(text === "Whos there?" || text === "who's there?" || text === "whos there?")
            {
                knockJoke(sender, 0)
            }

            //responses for knock knock jokes
            else if(text === "Yah who?" || text === "yah who?") {knockJoke(sender, 6)}
            else if(text === "A broken pencil who?" || text === "a broken pencil who?") {knockJoke(sender, 7)}
            else if(text === "To who?" || text === "to who?") {knockJoke(sender, 8)}
            else if(text === "Doctor who?" || text === "doctor who?") {knockJoke(sender, 9)}
            else if(text === "(long pause) who?" || text === "who?") {knockJoke(sender, 10)}

            //random jokes
            else if(text === "c" || text === "c) Random!" || text === "Random!")
            {
                randomJoke(sender)
            }
            else if(text === "haha")
            {
                sendtoUser(sender, "thanks!")
            }
            //incorrect reponses
            else
            {
                sendtoUser(sender, "Please repond with Hello, Hi, or Start to choose a joke.\nAlso, when responding to knock knock jokes remember to end with a question mark!\nHave fun!")
            }
            
        }
    }
    res.sendStatus(200)
})

//page access token
var token = "EAAU8jb5mZApwBANA5NhZAKGKoN1ZAgOEkli9cyGmxio1Ub7hxiI02VuGso3olBbHBq8YxX7fmyLw5Ka1dZBh57FDeYFxSqLan6TE63XHRoyaZBbZCOAb8EwH5sOfURbrjMxGAcQTgCsLuJpKQklN7LSRlEl4O6xGVXwZByi1Rk7lwZDZD"

//sends to user a response
function sendtoUser(sender, text) {
    text = {text:text}
    //the message we want to send
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: text,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } 
        else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function CSJoke(sender, b){

    //different jokes
    joke1 = "What's the object-oriented way to become rich?"
    joke2 = "Why did the programmer quit his job?"
    joke3 = "What do you call a programmer from Finland?"
    joke4 = "What do you call 8 Hobbits?"
    joke5 = "What is a programmer?"

    //the punchlines
    punch1 = "inheritance"
    punch2 = "Because he didn't get arrays"
    punch3 = "Nerdic"
    punch4 = "A Hobbyte"
    punch5 = "A machine that turns coffee into code"

    if(b === 0){

        //create a random number aka send a random joke
        n = Math.floor(Math.random() * (Math.floor(5) - Math.ceil(1)) + Math.ceil(1))

        if(n === 1){
            joke = 1
            sendtoUser(sender, joke1)
        }
        if(n === 2){
            joke = 2
            sendtoUser(sender, joke2)
        }
        if(n === 3){
            joke = 3
            sendtoUser(sender, joke3)
        }
        if(n === 4){
            joke = 4
            sendtoUser(sender, joke4)
        }
        if(n === 5){
            joke = 5
            sendtoUser(sender, joke5)
        }
    }

    else{
        if(joke === 1){
            sendtoUser(sender, punch1)
        }
        if(joke === 2){
            sendtoUser(sender, punch2)
        }
        if(joke === 3){
            sendtoUser(sender, punch3)
        }
        if(joke === 4){
            sendtoUser(sender, punch4)
        }
        if(joke === 5){
            sendtoUser(sender, punch5)
        }
    }
}

function knockJoke(sender, t)
{
    k = Math.floor(Math.random() * (Math.floor(10) - Math.ceil(6)) + Math.ceil(6))

    //different knock knock jokes
    joke6 = "Yah"
    joke7 = "A broken pencil"
    joke8 = "To"
    joke9 = "Doctor"
    joke10 = "(long pause)"

    if(t === 0){
        if(k === 6)
        {
            joke = 6
            sendtoUser(sender, joke6)
        }
        if(k === 7)
        {
            joke = 7
            sendtoUser(sender, joke7)
        }
        if(k === 8)
        {
            joke = 8
            sendtoUser(sender, joke8)
        }
        if(k === 9)
        {
            joke = 9
            sendtoUser(sender, joke9)
        }
        if(k === 10)
        {
            joke = 10
            sendtoUser(sender, joke10)
        }
    }

    //more punchlines
    punch6 = "No thanks, I use Google"
    punch7 = "Never mind it's pointless"
    punch8 = "To whom"
    punch9 = "heh"
    punch10 = "Java"

    //different punchlines according to different knock knock jokes
    if(t === 6) {sendtoUser(sender, punch6)}
    if(t === 7) {sendtoUser(sender, punch7)}
    if(t === 8) {sendtoUser(sender, punch8)}
    if(t === 9) {sendtoUser(sender, punch9)}
    if(t === 10) {sendtoUser(sender, punch10)}

}

function randomJoke(sender)
{
    //random one-liners
    jokea = "UNIX is very user friendly. It's just very particular about who its friends are."
    jokeb = "['hip', 'hip']"
    jokec = "To understand what recursion is, one must first understand recursion."
    joked = "There are 10 types of people in the world. Those who understand tertiary, those who don't, and those who thought this was a binary joke."
    jokee = "I would tell you a UDP joke, but you might not get it"
    jokef = "There's no place like 127.0.0.1"

    //randomizer
    r = Math.floor(Math.random() * (Math.floor(6) - Math.ceil(1)) + Math.ceil(1))

    //actually sends the jokes
    if(r === 1){sendtoUser(sender, jokea)}
    if(r === 2){sendtoUser(sender, jokeb)}
    if(r === 3){sendtoUser(sender, jokec)}
    if(r === 4){sendtoUser(sender, joked)}
    if(r === 5){sendtoUser(sender, jokee)}
    if(r === 6){sendtoUser(sender, jokef)}
}

//send to server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})

