load_params();

function readTextFile(file, callback) {
  let rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4 && rawFile.status == "200") {
      callback(rawFile.responseText);
    }
  };
  rawFile.send(null);
}

function load_params() {
  let photo_params = document.getElementById("photo_params");
  readTextFile("data.json", function (text) {
    let data = JSON.parse(text);

    for (let i = 0; i < data.length; i++) {
      let div_photo = document.createElement("div");
      div_photo.classList.add("photo");

      let select = document.createElement("select");
      select.name = "orders[]";
      for (let i = 0; i < data.length; i++) {
        let option = new Option(i + 1, i + 1);
        select.add(option);
      }
      select.selectedIndex = data[i]["order"] - 1;

      let current_photo = document.createElement("label");
      current_photo.textContent = `Current photo: ${
        data[i]["filepath"].split("\\")[1]
      }`;

      let br_current_photo = document.createElement("br");

      let choose_another_photo = document.createElement("label");
      choose_another_photo.textContent = " Choose another photo: ";

      let file = document.createElement("input");
      file.setAttribute("type", "file");
      file.setAttribute("name", "uploads[]");

      let hidden = document.createElement("input");
      hidden.setAttribute("type", "hidden");
      hidden.setAttribute("value", `${data[i]["filepath"].split("\\")[1]}`);
      hidden.setAttribute("name", "hidden[]");

      let br = document.createElement("br");

      let photo_caption = document.createElement("label");
      photo_caption.textContent = "Caption for photo";

      let photo_caption_input = document.createElement("input");
      photo_caption_input.setAttribute("type", "text");
      photo_caption_input.setAttribute("name", "captions[]");

      let caption = data[i]["caption"].split("\\");
      photo_caption_input.setAttribute("value", `${caption}`);

      let delete_button = document.createElement("button");
      delete_button.textContent = "Delete photo";
      delete_button.addEventListener("click", delete_photo);

      photo_params.appendChild(div_photo);
      div_photo.appendChild(select);
      div_photo.appendChild(current_photo);
      div_photo.appendChild(br_current_photo);
      div_photo.appendChild(choose_another_photo);
      div_photo.appendChild(file);
      div_photo.appendChild(hidden);
      div_photo.appendChild(br);
      div_photo.appendChild(photo_caption);
      div_photo.appendChild(photo_caption_input);
      div_photo.appendChild(delete_button);
    }
  });
}

function delete_photo(e) {
  e.preventDefault();
  let div_photo = e.target.parentNode;
  let photo_params = div_photo.parentNode;

  let select = div_photo.getElementsByTagName("select")[0];
  let selected_index_to_delete = select.selectedIndex;
  let allSelects = document
    .getElementById("photo_params")
    .getElementsByTagName("select");

  if (selected_index_to_delete !== select.options.length - 1) {
    for (let i = 0; i < allSelects.length; i++) {
      if (allSelects[i] === select) continue;
      if (allSelects[i].selectedIndex >= selected_index_to_delete)
        allSelects[i].selectedIndex--;
    }
  }
  let lastIndex = allSelects[0].length - 1;
  for (let i = 0; i < allSelects.length; i++) {
    allSelects[i].options.remove(lastIndex);
  }

  photo_params.removeChild(div_photo);
}

function add_photo(e) {
  e.preventDefault();
  let photo_params = document.getElementById("photo_params");

  let photos = document.getElementsByClassName("photo");
  let div_photo = document.createElement("div");
  div_photo.classList.add("photo");

  let select = document.createElement("select");
  select.name = "orders[]";
  for (let i = 0; i < photos.length + 1; i++) {
    let option = new Option(i + 1, i + 1);
    select.add(option);
  }
  select.selectedIndex = select.options.length - 1;

  let allSelects = document
    .getElementById("photo_params")
    .getElementsByTagName("select");
  for (let i = 0; i < allSelects.length; i++) {
    let option = new Option(select.selectedIndex + 1, select.selectedIndex + 1);
    allSelects[i].add(option);
  }

  let file = document.createElement("input");
  file.setAttribute("type", "file");
  file.setAttribute("name", "uploads[]");

  let br = document.createElement("br");
  
  let photo_caption = document.createElement("label");
  photo_caption.textContent = "Caption for photo ";
  
  let photo_caption_input = document.createElement("input");
  photo_caption_input.setAttribute("type", "text");
  photo_caption_input.setAttribute("name", "captions[]");
  
  let delete_button = document.createElement("button");
  delete_button.textContent = "Delete photo";
  delete_button.addEventListener("click", delete_photo);

  photo_params.appendChild(div_photo);
  div_photo.appendChild(select);
  div_photo.appendChild(file);
  div_photo.appendChild(br);
  div_photo.appendChild(photo_caption);
  div_photo.appendChild(photo_caption_input);
  div_photo.appendChild(delete_button);
}

function check_for_dublicate_options() {
  let allSelects = document
    .getElementById("photo_params")
    .getElementsByTagName("select");
  let selected_options = [];
  for (let i = 0; i < allSelects.length; i++) {
    selected_options.push(allSelects[i].selectedIndex);
  }
  return new Set(selected_options).size === selected_options.length;
}

function save() {
  if (check_for_dublicate_options()) {
    let error = document.getElementById("error");
    if (error !== null) {
      error.parentNode.removeChild(error);
    }
    document.forms.slider_settings.submit();
  } else {
    let errorMessage = document.createElement("h3");
    errorMessage.id = "error";
    errorMessage.textContent = "Error: The same options can't be chosen!!!";
    errorMessage.style.color = "darkred";
    document.forms.slider_settings.appendChild(errorMessage);
  }
}

document.forms.slider_settings.add_photo.addEventListener("click", add_photo);
document.forms.slider_settings.submit_button.addEventListener("click", save);