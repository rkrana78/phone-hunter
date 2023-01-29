const loadPhone = (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayPhone(data.data, dataLimit));
  };
  
  const displayPhone = (phones, dataLimit) => {
    const mobileContainer = document.getElementById("card-container");
    mobileContainer.innerHTML = "";
    
    //show all
    const showAll = document.getElementById('show-all')

    if(dataLimit && phones.length > 0) {
        phones = phones.slice(0,10);
        showAll.classList.remove('d-none');
    } else {
        showAll.classList.add('d-none');
    }
    

    //display no found massage
    const massage = document.getElementById('no-found-message')
    if ( phones.length === 0 ) {
        massage.classList.remove('d-none');
    } else {
        massage.classList.add('d-none');
    }
    phones.forEach((phone) => {
      const phoneCard = document.createElement("div");
      phoneCard.classList.add("col");
      phoneCard.innerHTML = `
          <div class="card container">
              <img src="${phone.image}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">${phone.slug}</p>
              </div>
            </div>
          `;
      mobileContainer.appendChild(phoneCard);
      
    });

    //stop spinner
    loadSpinner(false);
  };
  
  const searchPhone = (dataLimit) => {
    //start spinner
    loadSpinner(true);

    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    loadPhone(searchText, dataLimit);
  };
  
  document.getElementById('search-phone').addEventListener('click', function() {
    searchPhone(10);
  })

  const loader = document.getElementById('loader')
const loadSpinner = (isLoading) => {
    if (isLoading) {
        loader.classList.remove('d-none');
    } else {
        loader.classList.add('d-none');
    }
} 

document.getElementById('btn-show-all').addEventListener('click', function(){
    searchPhone();
})

// search input field enter key handler
document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchPhone(10);
    }
});
 // loadPhone();
  