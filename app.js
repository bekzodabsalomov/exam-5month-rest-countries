const countriesEl = document.querySelector(".countries");
const dropDown = document.querySelector(".dropDown");
const dropEl = document.querySelector(".drop");
const region = document.querySelectorAll(".region");
const regionName = document.getElementsByClassName("regionName");
const countryName = document.getElementsByClassName("countryName");
const toggle = document.getElementById("toogle");
const search = document.querySelector(".search");
const moon = document.querySelector(".moon");

async function getCountry() {
  const url = await fetch(
    "https://countries-api-v7sn.onrender.com/countries?limit=250"
  );
  const res = await url.json();
  const newData = res.data;
  showCountry(newData);
}
//filter dom korinishi
getCountry();
function showCountry(data) {
  data.forEach((country) => {
    countriesEl.innerHTML += `
        <a href="#">
            <div class="country">
                <div class="country-img">
                    <img src=${country.flags.png} alt="" />
                    </div>
                    <div class="country-info">
                    <h5 class="countryName">${country.name.common}</h5>
                    <p><strong>Population: </strong>${country.population}</p>
                    <p class="regionName"><strong>Region: </strong>${country.region}</p>
                    <p><strong>Capital: </strong>${country.capital}</p>
                </div>
            </div>
        </a>`
        ;
  });
  // SHU YERDAGI XATOLIK TUFAYLI MODAL BOLIMI ISHLAMAYBDI , MODALNI QOLGAN BARCHA QISMI TAYYOR
   //modal krishi
   country.addEventListener("click", () => {
    showCountryDetail(data)
  })
}

//filter dropdown

dropDown.addEventListener("click", () => {
  dropEl.classList.toggle("showDropDown");
});

region.forEach((element) => {
  element.addEventListener("click", () => {
    Array.from(regionName).forEach((e) => {
      if (
        element.innerText.include(e.innerText || element.innerText == "All")
      ) {
        e.parentElement.parentElement.style.display = "grid";
      } else {
        e.parentElement.parentElement.style.display = "grid";
      }
    });
  });
});

//input search qismi

search.addEventListener("input", () => {
  const inputValue = search.value.toLowerCase();
  const countriesName = document.querySelectorAll(".countryName");
  countriesName.forEach((item) => {
    if (item.textContent.toLowerCase().includes(inputValue)) {
      item.parentElement.parentElement.parentElement.classList.remove("hidden");
    } else {
      item.parentElement.parentElement.parentElement.classList.add("hidden");
    }
  });
});

//dark mode
toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  moon.classList.toggle("fas");
});


const countryModal = document.querySelector('.countryModal')
function showCountryDetail(data) {
  countryModal.classList.toggle("show")
  countryModal.innerHTML`
  <button class="back">Back</button>
      <div class="modal">
        <div class="leftModal">
          <img src=${country.flags.png} alt="">
        </div>
        <div class="rightModal">
          <h1>${country.name}</h1>
        <div class="modalInfo">
          <div class="innerLeft inner">
            <p><strong>NativeName</strong>${country.nativeName}</p>
            <p><strong>Region: </strong>${country.population}</p>
            <p><strong>Capital: </strong>${country.capital}</p>
            <p><strong>Sub-region</strong>${country.subregion}</p>
          </div>
          <div class="innerRight inner">
            <p><strong>Capital:</strong>${country.capital}</p>
            <p><strong>Top Level Domain:</strong>${country.TopLevelDomain.map(elem => elem)}</p>
            <p><strong>Curencies:</strong>${country.curencies.map(elem => elem.name)}</p>
            <p><strong>Languages:</strong>${country.languages.map(elem => elem)}</p>
          </div>
        </div>
        </div>
      </div>`
  // modal ichidagi back btn

  const back = countryModal.querySelector('.back')
  back.addEventListener('click', () => {
    countryModal.classList.toggle("show")
  })

}

