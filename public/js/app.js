//jshint esversion: 6

function redditRequest() {
  let videoGameArray = JSON.parse(this.responseText).data.children;
}


requestHelper("https://www.reddit.com/r/gaming.json", redditRequest);

function requestHelper(link, listener) {
  let newReq = new XMLHttpRequest();
  newReq.addEventListener("load", listener);
  newReq.open("GET", link);
  newReq.send();
}