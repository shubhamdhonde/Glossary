window.onload = function() {
  document.addEventListener("dblclick",select);
  function select() {
    var x = window.getSelection().toString();
    if(x != ""){
      chrome.runtime.sendMessage(x);      
    }
    else return;
  }
}
