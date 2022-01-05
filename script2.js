load_photos();

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

function load_photos() {
  let slider = document.getElementsByClassName("slider")[0];
  let slides = document.createElement("div");
  slides.classList.add("slides");

  readTextFile("data.json", function (text) {
    if (text.length === 0) {
      let errorMessage = document.createElement("h3");
      errorMessage.id = "error";
      errorMessage.textContent = "Choose at least one photo!!!";
      errorMessage.style.color = "darkred";
      slider.appendChild(errorMessage);
    } else {
      let data = JSON.parse(text);
      data.sort(function (a, b) {
        let keyA = parseInt(a["order"]);
        let keyB = parseInt(b["order"]);
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });
      for (let i = 0; i < data.length; i++) {
        let a = document.createElement("a");
        a.href = `#slide-${i + 1}`;
        a.textContent = `${i + 1}`;
        slider.appendChild(a);
      }
      for (let i = 0; i < data.length; i++) {
        let slide = document.createElement("div");
        slide.id = `slide-${i + 1}`;

        let img = document.createElement("img");
        img.src = data[i]["filepath"];
        img.alt = data[i]["caption"];

        let caption = document.createElement("label");
        caption.textContent = data[i]["caption"];
        caption.classList.add("author-info");

        slide.appendChild(img);
        slide.appendChild(caption);
        slides.appendChild(slide);
      }
      slider.appendChild(slides);
    }
  });
}