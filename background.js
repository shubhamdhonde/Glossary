function tryRemovingSuff(word,flag) {
  var remLemmaRqst = new XMLHttpRequest();
  remLemmaRqst.onreadystatechange = remLemma;
  link = "https://od-api.oxforddictionaries.com:443/api/v1/inflections/en/" + word;
  remLemmaRqst.open("GET",link,true);
  remLemmaRqst.setRequestHeader("Accept", "application/json");
  remLemmaRqst.setRequestHeader("app_id", INSERT_YOUR_OXFORD_DICTIONARY_API_ID_HERE);
  remLemmaRqst.setRequestHeader("app_key", INSERT_YOUR_OXFORD_DICTIONARY_API_KEY_HERE);
  remLemmaRqst.send();
  function remLemma() {
    if(remLemmaRqst.readyState == 4){
      if(remLemmaRqst.status == 200){
        var responseBody = JSON.parse(remLemmaRqst.responseText);
        var realWord = responseBody.results[0].lexicalEntries[0].inflectionOf[0].text;
        makeRequest(realWord,flag);
      }
      else{
        alert("Sorry word not found!!");
      }
    }
  }
}
function makeRequest(word,flag) {
  link = "https://od-api.oxforddictionaries.com:443/api/v1/entries/en/" + word;
  var rqst = new XMLHttpRequest();
  rqst.onreadystatechange = iChanged;
  rqst.open('GET',link,true);
  rqst.setRequestHeader("Accept", "application/json");
  rqst.setRequestHeader("app_id", INSERT_YOUR_OXFORD_DICTIONARY_API_ID_HERE);
  rqst.setRequestHeader("app_key", INSERT_YOUR_OXFORD_DICTIONARY_API_KEY_HERE);
  rqst.send();
  function iChanged() {
    if(rqst.readyState == 4){
        if(rqst.status == 200){
          var responseBody = JSON.parse(rqst.responseText);
          alert(responseBody.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]);
          chrome.extension.onConnect.addListener(function(port) {
          console.log("Connected .....");
          port.onMessage.addListener(function(msg) {
          console.log("message recieved " + msg);
          port.postMessage("<li>" +"<div style = 'color:green'><b>"+word+"</b></div>"+"<div style = 'color:black'>"+ responseBody.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]+"</div>"+"</li>");
            });
          });
        }
        else{
          if(flag == 0) {
            flag = 1;
            tryRemovingSuff(word,flag);
          }
        }
    }
  }
}
chrome.runtime.onMessage.addListener(function(word,message,sendResponse){
postRequest = word;
var flag = 0;
makeRequest(postRequest,flag);
});
