# XMeme

## Description

XMeme is a simple MEN (MongoDb, Express, NodeJS) app where users can post memes by providing their name, a caption for the meme and the URL for the meme image as input. Last 100 posted memes could also be retrived by seen the user.

## Setup

0. Give execution to scrips `chmod +x install.sh server_run.sh sleep.sh`
1. Run install.sh `sudo ./install.sh`
2. Run server_run.sh `sudo ./server_run.sh`
3. Run sleep.sh `sudo ./sleep.sh`

Note: The app uses Handlebars as rendering engine and no separate framework for frontend.

## API Documentation

0. Endpoint to send a meme to the backend  
   HTTP Method - POST  
   Endpoint - /memes  
   Json Body contains these inputs - name, url, caption  
   The backend allocates a unique id for the meme and return it as a json response.  
  
1. Endpoint to fetch the latest 100 memes created from the backend  
   HTTP Method - GET  
   Endpoint - /memes  
   Error: If there are no memes available, an empty array shall be returned.  
  
2. Endpoint to specify a particular id (identifying the meme) to fetch a single Meme.  
   HTTP Method - GET  
   Endpoint - /memes/<id>  
   Error: If a meme with that Id doesn’t exist, a 404 HTTP response code should be returned.  
     

