# TangJokeBot
Hello!
This is the Joke Chat Bot that I made as a coding challenge for an internship at Tang Capital. 

Before I talk about my coding process, something that the CS department at my school really emphasizes (at times more so than actually getting a program to work) is academic honesty and honest coding. And as someone very new to the Facebook Messenger API and Node.js, I did a bit/lot of research about how Facebook apps and node.js connect/respond to one another. This being said, I wanted to list the resources I used in order to finish this coding challenge as much of my code is heaviliy influenced by what I have read. The functions that I did fully write on my own were CSJoke, knockJoke, randomJoke, and parts of the app.post functionality.

My first step was to read Facebook's sample app and follow their QuickStart in creating an app. 
https://developers.facebook.com/docs/messenger-platform/guides/quick-start
https://github.com/fbsamples/messenger-platform-samples
https://developers.facebook.com/docs/messenger-platform/guides

I also had to do a lot of research to understand the facebook sample app:
https://developers.facebook.com/docs/graph-api/overview
https://nodejs.org/api/events.html
https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/
https://github.com/expressjs/body-parser#bodyparserjsonoptions

Then, I realized that I needed a webhook URL in order to run an app and did more research on what the webhooks callback URL was:
http://stackoverflow.com/questions/34761305/what-is-callback-url-in-facebook-webhook-page-subscription
https://sendgrid.com/blog/whats-webhook/
https://gist.github.com/michellini/a05f3068f29107caab88
https://developers.facebook.com/docs/messenger-platform/webhook-reference

I tried to use ngrok as suggested in the stackoverflow question but I quickly realized that if I wanted this app to run even without my computer running I would have to use something else. Then I came across Heroku and did more research on Heroku:
https://github.com/fbsamples/graph-api-webhooks-samples/tree/master/heroku
https://devcenter.heroku.com/articles/heroku-cli
https://devcenter.heroku.com/articles/facebook

Then after all of that, the actual coding of the app wasn't too difficult once I understood how to send reponses and read messages. 

I learned a lot through all of this research and coding, and really appreciated the code challenge. 
Thanks!

also to source my jokes: 
https://www.reddit.com/r/AskReddit/comments/1kvhmz/whats_the_best_programming_joke_that_you_know/
http://www.hongkiat.com/blog/programming-jokes/
