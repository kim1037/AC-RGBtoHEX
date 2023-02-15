const hexBox = document.querySelector("#hex-number");
const showHexColor = document.querySelector(".show-Hex-color");
const convert = document.querySelector(".convert");
const rb = document.querySelector(".rb");
const gb = document.querySelector(".gb");
const bb = document.querySelector(".bb");
const rgbBlock = document.querySelector(".rgb-content");
const copyBtn = document.querySelector(".copy");

//當報錯時，將RGB重置歸零
function resetRGB() {
  //初始化input box
  const rgbInput = document.querySelectorAll(".rgb-input");
  for (let i = 0; i < rgbInput.length; i++) {
    rgbInput[i].value = "0";
  }
  //初始化色框
  rb.style.backgroundColor = "#FFFFFF";
  gb.style.backgroundColor = "#FFFFFF";
  bb.style.backgroundColor = "#FFFFFF";
}

//rgb轉hex
function rgb2Hex(r, g, b) {
  let hex = "#";
  let rgb = [r, g, b];
  for (let color of rgb) {
    if (Number(color) > 255 || Number(color) < 0) {
      alert("RGB should beteew 0~255");
      resetRGB();
      return hexBox.value;
    } else if (isNaN(color) || color === "") {
      alert("RGB should be a num");
      resetRGB();
      return hexBox.value;
    } else {
      if (parseInt(color, 10) === 0) {
        hex += "00";
      } else {
        const number = parseInt(color, 10).toString(16).toUpperCase();
        if (number.length === 1) {
          hex += "0" + number;
        } else {
          hex += number;
        }
      }
    }
  }
  return hex;
}

//點擊covert function
function convertBtn(event) {
  const r = document.querySelector("#r").value;
  const g = document.querySelector("#g").value;
  const b = document.querySelector("#b").value;
  const hexText = rgb2Hex(r, g, b);
  hexBox.value = hexText;
  showHexColor.style.backgroundColor = hexText;
}

//輸入rgb各數值時，更變旁邊框框顏色
function changeColor(event) {
  const target = event.target;
  if (target.classList.contains("rgb-input")) {
    const color = parseInt(target.value, 10);
    if (target.classList.contains("r")) {
      target.nextElementSibling.style.backgroundColor = `rgb(${color},0,0)`;
    } else if (target.classList.contains("g")) {
      target.nextElementSibling.style.backgroundColor = `rgb(0,${color},0)`;
    } else if (target.classList.contains("b")) {
      target.nextElementSibling.style.backgroundColor = `rgb(0,0,${color})`;
    }
  }
}

//copy button Function
function copyHEX(event) {
  const target = event.target;
  const hex = target.previousElementSibling.value;
  navigator.clipboard.writeText(hex);
}

convert.addEventListener("click", convertBtn);
rgbBlock.addEventListener("keyup", changeColor);
copyBtn.addEventListener("click", copyHEX);
