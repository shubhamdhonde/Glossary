var port = chrome.extension.connect({
    name: "Sample Communication"
});
port.postMessage("Hi BackGround");
port.onMessage.addListener(function(msg) {
    var a = document.getElementById('x').innerHTML;
    document.getElementById('x').innerHTML = msg+a;
});
