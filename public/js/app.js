//jshint esversion: 6

function redditRequest() {
  let videoGameArray = JSON.parse(this.responseText).data.children;
}




function requestHelper(link, listener) {
  let newReq = new XMLHttpRequest();
  newReq.addEventListener("load", listener);
  newReq.open("GET", link);
  newReq.send();
}