(function () {
  const textAreaElement = document.querySelector(".essay__text");
  textAreaElement.addEventListener('input', () => {
    textAreaElement.style.height = 'auto';
    textAreaElement.style.height = textAreaElement.scrollHeight + 'px';
  });
}())
