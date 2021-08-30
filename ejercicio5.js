//EJERCICIO 5
let json =
  '[{"id":"978-0641723445","label":["book","hardcover"],"name":"The Lightning Thief","author":"Rick Riordan","series_t":"Percy Jackson and the Olympians","genre_s":"fantasy","inStock":true,"price":12,"pages_i":384},{"id":"978-1857995879","label":["book","paperback"],"name":"Sophie\'s World : The Greek Philosophers","author":"Jostein Gaarder","genre_s":"fantasy","inStock":true,"price":3,"pages_i":64},{"id":"978-1933988177","label":["Article","paperback"],"name":"Lucene in Action, Second Edition","author":"Michael McCandless","genre_s":"IT","inStock":true,"price":30,"pages_i":475}]';

var jsonParse = JSON.parse(json);

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

//FUNCION AGREGAR LIBRO

const addBook = () => {
  let name, author, gender, inStock, price, pages;
  let label = [];
  let ids = `${random(111, 999)}-${random(1000000000, 9999999999)}`;

  name = document.getElementById("nombre").value;
  author = document.getElementById("autor").value;
  gender = document.getElementById("genero").value;
  try {
    inStock = document.querySelector("input[name=stock]:checked").value;
  } catch (error) {
    return window.alert("No ingresaste el estado del stock del libro");
  }
  price = parseInt(document.getElementById("precio").value);
  pages = parseInt(document.getElementById("pag").value);
  if (document.getElementById("labels").value === "") {
    return window.alert(`No ingresaste ninguna etiqueta`);
  }
  label = document.getElementById("labels").value.split(",");

  if (name === "") return window.alert(`No ingresaste el nombre del libro`);
  if (author === "") return window.alert(`No ingresaste el nombre del autor`);
  if (gender === "") return window.alert(`No ingresaste el genero`);
  if (isNaN(price)) return window.alert(`No ingresaste el precio`);
  if (isNaN(pages)) return window.alert(`No ingresaste la cantidad de paginas`);
  if (inStock == "true") {
    inStock = true;
  } else {
    inStock = false;
  }

  jsonParse.push({
    id: ids,
    label: label,
    name: name,
    author: author,
    genre_s: gender,
    inStock: inStock,
    price: price,
    pages_i: pages,
  });
  window.alert("libro agregado");
  console.clear();
  console.log(jsonParse);
  document.getElementById("btnReset").click();
  return false;
};

//MOSTRAR TODOS LOS LIBROS

const viewBooks = () => {
  let foo = jsonParse.map(function (i) {
    return (
      `<h4> ${i.name}</h4>` +
      "<li>" +
      " Autor:  " +
      i.author +
      " <br>" +
      " Género: " +
      i.genre_s +
      " <br>" +
      " Páginas: " +
      i.pages_i +
      " <br>" +
      " Precio: " +
      i.price +
      " $" +
      "<br>" +
      "---------------------------------------------------------------" +
      "</li>"
    );
  });
  document.getElementById("caja").innerHTML = foo.join("");
};

//MOSTRAR MAYORES AL PRECIO RECIBIDO
const viewBooksForPrice = (receivedPrice) => {
  receivedPrice = parseInt(receivedPrice);
  if (isNaN(receivedPrice)) return window.alert(`No ingresaste el precio`);

  let aux = [];

  for (let i = 0; i < jsonParse.length; i++) {
    if (jsonParse[i].price > receivedPrice) {
      aux.push(jsonParse[i]);
    }
    if (aux.length > 0) {
      let foo = aux.map(function (i) {
        return (
          `<h4> ${i.name}</h4>` +
          "<li>" +
          " Autor:  " +
          i.author +
          " <br>" +
          " Género: " +
          i.genre_s +
          " <br>" +
          " Páginas: " +
          i.pages_i +
          " <br>" +
          " Precio: " +
          i.price +
          " $" +
          "<br>" +
          "---------------------------------------------------------------" +
          "</li>"
        );
      });
      document.getElementById("caja").innerHTML = foo.join("");
    }
  }

  if (aux.length == 0) {
    window.alert(`No se encontraron libros mayores a ${receivedPrice}`);
    document.getElementById("precioMayor").value = "";
  }
};

//MOSTRAR POR ETIQUETA
const viewBooksForLabel = (receivedLabel) => {
  if (receivedLabel == "") return window.alert(`No ingresaste la etiqueta`);

  let aux = [];

  for (let i = 0; i < jsonParse.length; i++) {
    for (let j = 0; j < jsonParse[i].label.length; j++) {
      if (jsonParse[i].label[j].toLowerCase() == receivedLabel.toLowerCase()) {
        aux.push(jsonParse[i]);
      }
    }

    if (aux.length > 0) {
      let foo = aux.map(function (i) {
        return (
          `<h4> ${i.name}</h4>` +
          "<li>" +
          " Autor:  " +
          i.author +
          " <br>" +
          " Género: " +
          i.genre_s +
          " <br>" +
          " Páginas: " +
          i.pages_i +
          " <br>" +
          " Precio: " +
          i.price +
          " $" +
          "<br>" +
          " Etiquetas: " +
          i.label +
          "<br>" +
          "---------------------------------------------------------------" +
          "</li>"
        );
      });
      document.getElementById("caja").innerHTML = foo.join("");
    }
  }

  if (aux.length == 0) {
    window.alert(`No se encontraron libros con la etiqueta ${receivedLabel}`);
    document.getElementById("etiqueta").value = "";
  }
};

//ONLOAD
window.onload = function () {
  document.getElementById("btnAdd").addEventListener("click", addBook, false);
  document
    .getElementById("btnLibros")
    .addEventListener("click", viewBooks, false);
  document.getElementById("btnPrice").addEventListener(
    "click",
    function () {
      viewBooksForPrice(document.getElementById("precioMayor").value);
    },
    false
  );
  document.getElementById("btnLabel").addEventListener(
    "click",
    function () {
      viewBooksForLabel(document.getElementById("etiqueta").value);
    },
    false
  );
};
