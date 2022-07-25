// THEME GLOGAL ------------------------------------------

const btnTheme = document.querySelector('.icons');

function themeDarkMode() {
  return document.querySelector('body').classList.toggle('theme_dark');
}

btnTheme.addEventListener('click', themeDarkMode);

// THEME GLOGAL ------------------------------------------
// -----------------------------------------------------

// SHOW SELECT MENU --------------------------------------
const btnShowSelect = document.querySelector('.selectPokemon i');
const boxTypePokemon = document.querySelector('.selectPokemon .typesPokemonBox');

function showSelectionMenu() {
  return boxTypePokemon.classList.toggle('active')
}

btnShowSelect.addEventListener('click', showSelectionMenu);
// SHOW SELECT MENU --------------------------------------
// -----------------------------------------------------

// GET NAME OF POKEMON TYPE ------------------------------

const shwSectPokemon = document.querySelector('.selectPokemon .selet');
const listOfTipes = document.querySelector('.typesPokemonBox');

let newSelest;

// clip - path: polygon(0 0, 100 % 0, 100 % 0, 0 0);

function getTypeOfPokemon(e) {
  if (e.target) {
    newSelest = e.target.textContent || e.target.previousElementSibling.textContent;
    boxTypePokemon.classList.toggle('active');
  }
  newSelest.trim()
  shwSectPokemon.textContent = newSelest;
}

listOfTipes.addEventListener('click', getTypeOfPokemon);

// GET NAME OF POKEMON TYPE ------------------------------
// -----------------------------------------------------

// GET DATA OF TYPE POKEMON ------------------------------

let arrTypeApiGlobal = [];
let urlTypeApiGlobal = '';
async function getTypePokemonApi() {
  const respuesta = await fetch('https://pokeapi.co/api/v2/type/');
  const data = await respuesta.json();

  arrTypeApiGlobal.push(...data.results);

  listOfTipes.addEventListener('click', () => {

    if (true) {

      for (let valor of arrTypeApiGlobal) {
        if (valor.name == document.querySelector('.selectPokemon .selet').textContent) {
          urlTypeApiGlobal = valor.url;
          // console.log(urlTypeApiGlobal);
        }
      }
    }

    async function typePokemonSelect() {
      const respuestaSelect = await fetch(`${urlTypeApiGlobal}`);
      const data = await respuestaSelect.json();

      let arrNewListShow = [];

      arrNewListShow.push(...data.pokemon)

      document.getElementById('listPokemon').innerHTML = '';

      let countPokemon = 80;

      let newArrWithPokemon = arrNewListShow.slice(0, countPokemon);
      // console.log(newArrWithPokemon);

      let returShowPokemon = newArrWithPokemon.map(pokeAll => {

        async function getInfoImgApi() {
          const respuestaImg = await fetch(`${pokeAll.pokemon.url}`);
          const dataImg = await respuestaImg.json();
          // console.log(dataImg)


          document.getElementById('listPokemon').innerHTML += `
          <div class="card_Pokemon" data-value="${dataImg.name}">
            <img src="img/pokebola.png" alt="pokebola" class="pokebola">
            <img src="${null ? 'img/pokemon-secreto3.0.png' : dataImg.sprites.front_default}" alt="<IMG>" class="img_pokemon">
            <h3 class="nombre" data-url="${pokeAll.pokemon.url}">${dataImg.name}</h3>
          </div>
        `;

          // await console.log(pokeAll)

        }

        document.getElementById('listPokemon').innerHTML = 'LOADDING...';

        setTimeout(() => {
          return document.getElementById('listPokemon').innerHTML = '';
        }, 4000)
        setTimeout(getInfoImgApi, 5000);


      })

      // EVENTO GET INFO OG CLICK ------------------------------
      const pokemonListALL = document.getElementById('listPokemon');

      function getInfoOnClick(e) {
        if (e.target && e.target.tagName === 'H3') {


          setTimeout(() => {
            document.querySelector('#popubBox').classList.add('activePopup');
          }, 900);

          // GET DATOSADICIONAS PARA MOSTRAR EN EL POPUP------
          async function getDataPopupPokemon(eClick) {
            const respuestaPopup = await fetch(`${eClick.target.dataset.url}`)
            const dataPopup = await respuestaPopup.json();

            document.querySelector('.imgPopup').src = dataPopup.sprites.front_default;
            document.querySelector('.namePopup').textContent = dataPopup.name;
            document.querySelector('.typePopup').textContent = dataPopup.types[0].type.name;

            // estadisticas 

            document.querySelector('.hp').textContent = dataPopup.stats[0].base_stat;
            document.querySelector('.attack').textContent = dataPopup.stats[1].base_stat;
            document.querySelector('.defense').textContent = dataPopup.stats[2].base_stat;
            document.querySelector('.special-attack').textContent = dataPopup.stats[3].base_stat;
            document.querySelector('.special-defense').textContent = dataPopup.stats[4].base_stat;
            document.querySelector('.speed').textContent = dataPopup.stats[5].base_stat;

            // console.dir(eClick.target.dataset.url)
          }

          document.querySelector('#popubBox .iconPopup').addEventListener('click', () => {
            return document.querySelector('#popubBox').classList.remove('activePopup');
          });

          // GET DATOSADICIONAS PARA MOSTRAR EN EL POPUP------

          return getDataPopupPokemon(e);
        }
      }

      pokemonListALL.addEventListener('click', (e) => getInfoOnClick(e));
      // EVENTO GET INFO OG CLICK ------------------------------
      // -----------------------------------------------------
    }

    document.querySelector('#popubBox').classList.remove('activePopup')

    return typePokemonSelect();
  });
}

getTypePokemonApi();

// GET DATA OF TYPE POKEMON ------------------------------
// -----------------------------------------------------


