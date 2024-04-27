document.getElementById('date_range').valueAsDate = new Date();

const domSelector = eleClass => document.querySelector(eleClass);
const domSelectorAll = eleClass => document.querySelectorAll(eleClass);


// create income bars
const createBars = (nums, elementClass) => {
  
 const barContainer = domSelector(elementClass);
  for (let i = 0; i <= nums; i++) {
    const bar = document.createElement("div");
    bar.className = elementClass === ".income_bars" ? "bar_inc" : "bar_exp";
    bar.style.height = `${Math.round(Math.random() * 90)}%`;
    barContainer.appendChild(bar);
  }
}

createBars(30, ".income_bars")
createBars(30, ".expenses_bars")


// Number formater
const formatCurrency = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN"
})


const balanceEl = domSelectorAll(".balance");
const lastAmEl = domSelectorAll(".last_am");
const accAmEl = domSelectorAll(".acc_amount");
const visaBalEl = domSelector(".visa_balance");


const currencyFormater = eleArr =>{
  eleArr.forEach(el => {
    el.textContent = formatCurrency.format(el.textContent);
  })
}

currencyFormater(balanceEl);
currencyFormater(accAmEl);
currencyFormater(lastAmEl);

visaBalEl.textContent = formatCurrency.format(visaBalEl.textContent.replace(/\D/g, ""))


// add line to 1 and 7th bar and give bars random height
const graphBars = domSelectorAll(".bar_inc");

graphBars.forEach((inc_bar, index) => {
  if (index === 0 || index % 6 === 0) {
    inc_bar.classList.add("inc22");
  }
})


// fill all figure with currency
const accAmount = document.querySelectorAll(".acc_amount");

accAmount.forEach(amount => {
  const last = amount.parentElement.nextElementSibling.querySelector("span").textContent;

  const perFugure = amount.nextElementSibling.firstChild;
  // percentage calculator
  const perChanV = Math.abs(amount.textContent.replace(/\D/g, "") - last.replace(/\D/g, "")).toFixed(2);
  const percA = (perChanV * 100) / last.replace(/\D/g, "");
  perFugure.textContent = percA.toFixed(2)
  // end percetage calculator


  const changeColor = amount.nextElementSibling.querySelector("span");


  if (amount.textContent > last) {
    changeColor.textContent = "north_east"
    changeColor.parentElement.style.color = "#00d473";
  } else {
    changeColor.parentElement.style.color = "orangered";
  }

  const currValue = amount.textContent;
  amount.textContent = currValue;
})


// close menu
const fullMenuBtn = domSelector(".fullscreen")
const nav = domSelector("nav")
const navBtn = domSelector(".menu_btn");

navBtn.addEventListener("click", (e) => {
  nav.style.display = "none";
  fullMenuBtn.style.display = "block"
})

fullMenuBtn.addEventListener("click", (e) => {
  nav.style.display = "flex";
  fullMenuBtn.style.display = "none"
})


// random user

async function getUser() {
  const res = await fetch("https://randomuser.me/api/");
  const data = await res.json();
  const user = data.results[0];
  const { first, last } = user.name;
  const picture = user.picture.large
  const email = user.email

  const nameEl = domSelector(".bio_name");
  const picEl = domSelector(".bio_img");
  const emailEl = domSelector(".email_addr");

  nameEl.textContent = `${first} ${last}`;
  picEl.src = picture;
  emailEl.href = `mailto:${email}`;
  emailEl.textContent = email;
}

getUser();