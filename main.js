function getdata() {
  return fetch('http://localhost:3001/res')
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .catch(error => {
      console.error('Error:', error);
      throw error; 
    });
}

let shopbutton = document.querySelector(".Shop")
let secondpage = document.querySelector(".scondpage")
let firstpage = document.querySelector(".firstpage")
let TVs = document.querySelector(".TVs")
let phone = document.querySelector(".phone")
let camera = document.querySelector(".Cameras")
let smartWatch = document.querySelector(".Watch")
let Refrigerators = document.querySelector(".Refrigerators")
let Elements = document.querySelector('.Elements')




shopbutton.addEventListener("click", function(){
  secondpage.style.display = 'flex';
  document.body.classList.add('no-scroll');
  secondpage.scrollIntoView({ behavior: 'smooth' });
})

function createArticle(data){
  let element = document.createElement('div')
  element.classList.add("element")
  let img = document.createElement("img")
  let mark= document.createElement("h3")
  let nom = document.createElement("h4")
  let fearture = document.createElement("p")
  let price = document.createElement("h4");
  mark.innerHTML = data.mark;
  nom.innerHTML = data.name;
  // fearture.innerHTML = `Display Resolution: ${data.features['DisplayResolution']}<br>
  //                      Operating System: ${data.features['OperatingSystem']}<br>
  //                      Display Type: ${data.features['DisplayType']}`;
  price.innerHTML = data.price;
  img.src = data.photo
  element.appendChild(img)
  element.appendChild(mark)
  element.appendChild(nom)
  // element.appendChild(fearture)
  // element.appendChild(price)
  return element;
}
async function loadData(Type,element) {
  let active = document.querySelector(".active");
  if (active != undefined ){
    while (Elements.firstChild) {
      Elements.removeChild(Elements.firstChild);
    }
    active.classList.remove("active")
  }
  element.classList.add("active")
  try {
    const data = await getdata();
    if (data && data[Type]) {
      const products = data[Type];
      products.forEach(tv => {
        const article = createArticle(tv);
        Elements.appendChild(article);
        article.addEventListener('click', function () {
          handleclick(tv);
        });
      });
    } else {
      console.error('Invalid data format:',data);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
TVs.addEventListener('click', function() {loadData('TVs',TVs)});
phone.addEventListener('click', function(){loadData("smartphone",phone)})
smartWatch.addEventListener('click', function(){loadData("smartWatch",smartWatch)})
camera.addEventListener('click', function(){loadData("Cameras",camera)})
Refrigerators.addEventListener('click', function(){loadData("Refrigerators",Refrigerators)})

function handleclick (data){
  let div = document.createElement('div')
  div.classList.add("moreinfo")
  let div2 = document.createElement('div')
  div2.classList.add('details')
  let button = document.createElement('button')
  button.addEventListener('click',function(){handleclose(div)})
  button.innerHTML = "X"
  let nav = document.createElement('nav')
  nav.appendChild(button)
  let img = document.createElement('img')
  img.src = data.photo;
  let h2 = document.createElement('h2')
  div2.appendChild(img)
  div.appendChild(nav)
  div.appendChild(div2)
  secondpage.appendChild(div)
}
function handleclose(details){
  details.remove()
}


////  the search code
async function searche() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  
  try {
    const data = await getdata();
    if (data) {
      const allProducts = Object.values(data).flat();

      const filteredProducts = allProducts.filter(product =>
        product.name.toLowerCase().includes(searchInput)
      );

      renderResults(filteredProducts);
    } else {
      console.error('Invalid data format:', data);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}


function renderResults(products) {
  const Elements = document.querySelector('.Elements');
  Elements.innerHTML = '';

  if (products.length > 0) {
    products.forEach(product => {
      Elements.appendChild(createArticle(product));
    });
  } else {
    Elements.innerHTML = '<p>No matching products found.</p>';
  }
}
