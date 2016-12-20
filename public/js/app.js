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
  cardImg.className = "card-image";
  cardImg.src = page.thumbnail;
  let cardImgLink = document.createElement('a');
  cardImgLink.setAttribute("href", page.url);
  cardImgLink.appendChild(cardImg);


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
  authorDiv.appendChild(authorLink);

  let votedParagraph = document.createElement('p');
  votedParagraph.innerHTML = `Votes ${page.score}`;
  votedParagraph.className = "voted-paragraph";
  authorDiv.appendChild(votedParagraph);

  let timeElapsed = document.createElement('p');
  //timeElapsed.innerHTML = moment.unix(page.created_utc).fromNow();

  let commentLink = document.createElement('a');
  commentLink.setAttribute("href", `https://www.reddit.com${page.permalink}`);
  commentLink.innerHTML = `${page.num_comments} comments`;

  cardDiv.appendChild(cardImgLink);
  cardDiv.appendChild(titleLink);
  cardDiv.appendChild(authorDiv);
  cardDiv.appendChild(commentLink);

  contentContainer.appendChild(cardDiv);
}

requestHelper("https://www.reddit.com/r/gaming.json", redditRequest);

function requestHelper(link, listener) {
  let newReq = new XMLHttpRequest();
  newReq.addEventListener("load", listener);
  newReq.open("GET", link);
  newReq.send();
}