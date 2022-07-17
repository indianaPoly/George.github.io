const images = [
    "0.jepg",
    "1.jpeg",
    "2.jpeg"
];
// 배열에서 하나를 고르는 것이었음!

const chosenImage = images[Math.floor(Math.random() * images.length)];
//Math.random()은 0과 1사이의 숫자 아무거나를 추출하는 거였음.
//길이를 곱해도 되는 이유는 배열을 처음은 0으로 시작하기 때문임.
//floor는 소수점 밑으로 있는 숫자는 그냥 버림


// html에 이미지를 추가하기 위해서는 자바스크립트가 필요함.
// 자바스크립트에서 html의 태그를 만듦! -> 옼
const bgImage = document.createElement("img");
bgImage.src = `img/${chosenImage}`;
// 이것을 body에 추가를 해줘야 함.
document.body.appendChild(bgImage);
// append는 가장 뒤에
// prepend는 가장 앞에 태그를 추가시킴.

