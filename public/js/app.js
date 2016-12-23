//jshint esversion: 6

function redditRequest() {
  let videoGameArray = JSON.parse(this.responseText).data.children;

  for(let i = 0; i < videoGameArray.length; i++){
    let videoGamePage = videoGameArray[i].data;
    console.log(videoGamePage);
    createCards(videoGamePage);
  }
}
function createDisplayElement(page, card) {
  let url = page.preview.images[0].source.url;
  if(url.match(/\.(jpg)/g)){
  let cardImg = document.createElement('div');
  cardImg.className = "card-image";
  cardImg.style.backgroundImage = `url(${page.preview.images[0].source.url})`;
  let cardImgLink = document.createElement('a');
  cardImgLink.className = "card-image-link";
  cardImgLink.setAttribute("href", page.url);
  cardImgLink.appendChild(cardImg);
  card.appendChild(cardImgLink);
  // } else if(url.match(/\.(gif)/g)){
  //   let cardImg = document.createElement
  }
}

const cardContainer = document.getElementById("card-container");

function createCards(page) {
  let cardDiv = document.createElement('div');
  cardDiv.className = "card-div";

  let aspectDiv = document.createElement('div');
  aspectDiv.className = "aspect-div";
  cardDiv.appendChild(aspectDiv);

  createDisplayElement(page, cardDiv);

  let infoDiv = document.createElement('div');
  infoDiv.className = "info-div";

  let titleLink = document.createElement('a');
  titleLink.setAttribute("href", page.url);
  let titleParagraph = document.createElement('p');
  titleParagraph.className = "title-paragraph";
  titleParagraph.innerHTML = page.title;
  titleLink.appendChild(titleParagraph);

  let authorDiv = document.createElement('div');
  authorDiv.innerHTML = "Submitted By ";
  let authorLink = document.createElement('a');
  authorLink.setAttribute("href", `https://www.reddit.com/user/${page.author}`);
  authorLink.innerHTML = page.author;
  authorLink.className = "author-link";

  let timeElapsed = document.createElement('p');
  timeElapsed.innerHTML = moment.unix(page.created_utc).fromNow();
  authorDiv.appendChild(authorLink);
  authorDiv.appendChild(timeElapsed);

  let votedParagraph = document.createElement('p');
  votedParagraph.innerHTML = `Votes ${page.score}`;
  votedParagraph.className = "voted-paragraph";
  authorDiv.appendChild(votedParagraph);

  let commentLink = document.createElement('a');
  commentLink.setAttribute("href", `https://www.reddit.com${page.permalink}`);
  commentLink.innerHTML = `${page.num_comments} comments`;

  infoDiv.appendChild(titleLink);
  infoDiv.appendChild(authorDiv);
  infoDiv.appendChild(commentLink);
  cardDiv.appendChild(infoDiv);
  cardContainer.appendChild(cardDiv);
}

requestHelper("https://www.reddit.com/r/gaming.json", redditRequest);

function requestHelper(link, listener) {
  let newReq = new XMLHttpRequest();
  newReq.addEventListener("load", listener);
  newReq.open("GET", link);
  newReq.send();
}