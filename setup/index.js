document.addEventListener("DOMContentLoaded", function() {
  var loadMore = document.getElementById("loadMore");
  const colorInput = document.querySelector('#cardBackgroundColor');
  const cardSpace = document.querySelector("#cardspace-between");
  const darkTheme = document.querySelector('#darkTheme');
  const lightTheme = document.querySelector('#lightTheme');
  const columnSelect = document.querySelector('#numberOfColumns');

  loadMore.addEventListener("click", function (){
    populateCards(5);
  });

  //updated color for each card
  function updateCardColor() {
    const cards = document.querySelectorAll(".card");
    const color = colorInput.value;

    cards.forEach(card => {
      card.style.backgroundColor = color;
    });
  }
  colorInput.addEventListener('input', updateCardColor);

  //updates the Card
  function updateCardColumn() {
    setColumns(columnSelect.value);
  }
  columnSelect.addEventListener("change", updateCardColumn);

  //updates card gap
  function updateCardGap() {
    var cards = document.querySelectorAll(".card");

    cards.forEach(card => {
      card.style.marginRight = `${cardSpace.value}`;
      card.style.marginBottom = `${cardSpace.value}`;
    });
  }
  cardSpace.addEventListener("input", updateCardGap);

  //themeColor
  function updateCardTheme() {
    if (darkTheme.checked && !lightTheme.checked) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else if (!darkTheme.checked && lightTheme.checked) {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
      document.body.classList.remove('light-mode');
    }
  }
  darkTheme.addEventListener('change', updateCardTheme);
  lightTheme.addEventListener('change', updateCardTheme);
})
