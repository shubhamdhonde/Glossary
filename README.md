# Glossary
Glossary is a Google Chrome extension which behaves as a dictionary and prompts meaning of double clicked word on loaded web page. Not only it prompts the meaning of double clicked word but also stores it on popup.

Setting up the Api and deploying extension of Google Chrome:-

1.	Download all the files and store them in a folder.

2.	Get the oxford api id and key and insert their values in background.js file in the mentioned locations.

3.	Enable developer mode of Google Chrome and in the load unpacked, open the folder where all the downloaded files are stored.

What the Application does?

When you select a word whose meaning you want to find out on the loaded page the word encoded as an url link is sent to api via XMLHttpRequest along with the headers containing api_id and api_key. The received response is stored as a JSON object and from this object synonym of that word is extracted and prompted and stored in user history.
