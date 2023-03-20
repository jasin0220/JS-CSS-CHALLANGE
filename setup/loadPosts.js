var postData = [];
var postIndex = 0;

document.addEventListener("DOMContentLoaded", function() {
    fetch("../data.json")
      .then(function(response){
        return response.json();
      })
      .then(function(datas){
        postData = datas;
        populateCards(0);
        if(window.innerWidth < 993){
          document.getElementById("numberOfColumns").disabled = true;
        }
      })
      .catch(function(error){
        console.log(error);
      });
});

// Populating cards into section
function populateCards(num){
  let section = document.querySelector('#grid-management');
  let numberOfColumns = document.querySelector('#numberOfColumns').value == "dynamic" ? 2 : document.querySelector('#numberOfColumns').value;
  let out = "";

  postIndex = postIndex + num;
  for(let i = postIndex; i < postIndex + 5; i++){
    if(postData[i] !== undefined){
      out +=`
      <div class="card">
        <div class="space-between">
          <div class="card-item">
            <img class="rounded" width="50px" height="50" src="${postData[i].profile_image}" alt="">
              <div class="user-name">
                ${postData[i].source_type}
                <span class="subtitle-3">${postData[i].name}</span>
                <span class="subtitle-6">${postData[i].date}</span>
              </div>
          </div>
          <img src="../icons/instagram-logo.svg" class="social-logos" alt=""> 
        </div>
        <div class="centered-image">
        
          <img src="${postData[i].profile_image}" class="res-image" height="330" alt="">
        </div>
        <div>
          <p class="text-content">
            ${postData[i].caption}
          </p>
          <hr />
          <div class="sm-icon">
            <img style="margin-right:3px" id="heart-icon-post" class="heart-icon" width="15" src="../icons/heart.svg" alt="">
            <span class="likes-count">${postData[i].likes}</span>
          </div>
        </div>
      </div>
      `;
    }else {
      document.getElementById("loadMore").style.display = "none";
    }
  }

  section.innerHTML += out;
  likePost();
  setColumns(numberOfColumns);
}

// Liking the post, not being able to change the svg element (fill or stroke) instead changing background;
function likePost(){
  var cards = document.querySelectorAll(".card");
  
  cards.forEach(card => {
    const heart = card.querySelector('.heart-icon');
    const count = card.querySelector('.likes-count');

    let isLiked = false;
    let likeCount = parseInt(count.textContent);

    heart.addEventListener('click', () => {
      if (isLiked) {
        isLiked = false;
        likeCount--;
        heart.style.backgroundColor = 'white';
      } else {
        isLiked = true;
        likeCount++;
        heart.style.backgroundColor = 'red';
      }

      count.textContent = likeCount.toString();
    });
  });
}

// Changing the number of columns
function setColumns(numColumns) {
  numColumns = parseInt(numColumns) + 1;
  var cards = document.querySelectorAll(".card");

  if(window.innerWidth < 769){
    numColumns = 1;
  }else if(window.innerWidth > 769 && window.innerWidth < 993){
    numColumns = 2;
  }

  cards.forEach(card => {
    card.style.width = `calc(100% / ${numColumns} - 20px)`;
  });
}