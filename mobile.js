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
  const showAll = document.getElementById("show-all");

  if (dataLimit && phones.length > 0) {
    phones = phones.slice(0, 10);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }

  //display no found massage
  const massage = document.getElementById("no-found-message");
  if (phones.length === 0) {
    massage.classList.remove("d-none");
  } else {
    massage.classList.add("d-none");
  }
  phones.forEach((phone) => {
    const phoneCard = document.createElement("div");
    phoneCard.classList.add("col");
    phoneCard.innerHTML = `
          <div class="card container">
              <img src="${phone.image}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
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

document.getElementById("search-phone").addEventListener("click", function () {
  searchPhone(10);
});

const loader = document.getElementById("loader");
const loadSpinner = (isLoading) => {
  if (isLoading) {
    loader.classList.remove("d-none");
  } else {
    loader.classList.add("d-none");
  }
};

document.getElementById("btn-show-all").addEventListener("click", function () {
  searchPhone();
});

// search input field enter key handler
document
  .getElementById("search-field")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      searchPhone(10);
    }
  });

const loadPhoneDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPhoneDetails(data.data));
};

const displayPhoneDetails = (phone) => {
  console.log(phone);
  const modalTitle = document.getElementById("phoneDetailModalLabel");
  modalTitle.innerText = phone.name;
  const phoneDetails = document.getElementById("phone-details");
  console.log(phone.mainFeatures.sensors[0]);
  phoneDetails.innerHTML = `
      <p>Release Date: ${
        phone.releaseDate ? phone.releaseDate : "No Release Date Found"
      }</p>
      <p>Storage: ${
        phone.mainFeatures
          ? phone.mainFeatures.storage
          : "No Storage Information "
      }</p>
      <p>Others: ${
        phone.others ? phone.others.Bluetooth : "No Bluetooth Information"
      }</p>
      <p>Sensor: ${
        phone.mainFeatures.sensors ? phone.mainFeatures.sensors[0] : "no sensor"
      }</p>
  `;
};
// loadPhone();
