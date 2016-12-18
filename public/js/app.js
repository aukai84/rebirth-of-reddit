//jshint esversion: 6

function redditRequest() {
  let videoGameArray = JSON.parse(this.responseText).data.children;
  for(let i = 0; i < videoGameArray.length; i++){
    let videoGamePage = videoGameArray[i].data;
    console.log(videoGamePage);
    createCards(videoGamePage);
  }

}

const contentContainer = document.getElementById("content-container");

function createCards(page) {
  let cardDiv = document.createElement('div');
  cardDiv.className = "card-div";
  let cardImg = document.createElement('IMG');
  cardImg.src = page.thumbnail;
  let titleParagraph = document.createElement('p');
  let authorLink = document.createElement('a');
  authorLink.setAttribute("href", `https://www.reddit.com/user/${page.author}`);

  let cardLink = document.createElement('a');
  cardLink.setAttribute("href", page.url);
  cardLink.appendChild(cardImg);

  titleParagraph.innerHTML = page.title;
  authorLink.innerHTML = page.author;
  cardDiv.appendChild(cardLink);
  cardDiv.appendChild(titleParagraph);
  cardDiv.appendChild(authorLink);



  contentContainer.appendChild(cardDiv);


}

function createLink(page) {

}

requestHelper("https://www.reddit.com/r/gaming.json", redditRequest);

function requestHelper(link, listener) {
  let newReq = new XMLHttpRequest();
  newReq.addEventListener("load", listener);
  newReq.open("GET", link);
  newReq.send();
}