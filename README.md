[![Build Status](https://travis-ci.org/egee-irl/egee-bot.svg?branch=master)](https://travis-ci.org/egee-irl/androgee)
# Androgee
Androgee is a super-simple Discord bot written in [NodeJS](https://nodejs.org/en/), tested with [Jasmine](https://jasmine.github.io/), and uses [DiscordJS](https://discord.js.org/).

# Purpose
Androgee was designed as a pure ES6 JavaScript replacement for BooBot in the Egee.io Discord server. The scope of Androgee was later paired down to be a very simple self-hosted Discord bot.

Androgee's current feature set includes:

* Announcing when a member has _joined_ the server
* Announcing when a member has _left_ the server
* Announcing when a member has been banned
* Announcing when a ban has been lifted
* Showing cat pics and gifs (using ``~catpic`` and ``~catgif``)

# Architecture 
Egee-bot is written using [ES6](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla) JavaScript, and the [DiscordJS](https://github.com/hydrabolt/discord.js/) Node module. As such, egee-bot requires NodeJS 6.0+ and must be self-hosted. 

By default all messages and responses Androgee provides are directed to a Guild's [default](https://discord.js.org/#/docs/main/stable/class/Guild?scrollTo=defaultChannel) channel. A hashtable is [provided](https://github.com/egee-irl/androgee/blob/master/data/testdata.js) (but not necessarily required) for Androgee to look up room ID's, as well as responses to specific queries, and other server rules that you may define in the code.

# Building & Testing
The only requirement to build Androgee is NodeJS 6.*. Simply clone this repository and build it using ``npm install``. You can run the built-in tests for Androgee by running ``jasmine`` from the repo directory (assuming you have the Jasmin npm package installed!).

Running Androgee on your Discord server is as simple as ``npm start discord_token`` - make sure you provide your discord token as a launch argument.

# Installing
Androgee can be installed on Linux operating systems supporting the _Snap_ package management system. Simply go to the Releases section of this repository and download the latest ``androgee_*.snap`` file and install it using ``--dangerous --devmode`` arguments.

Once the Androgee Snap is installed, you can run him by using ``snap androgee.bot discord_token``. Make sure you provide your discord token as a launch argument.

# License
Androgee is licensed under MIT so that the core functionality of the bot remains open source and free for everyone but any code you write (including server and room IDs for example) for your own Discord servers doesn't have to be.
