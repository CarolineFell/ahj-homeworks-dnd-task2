import ImageLoader from './ImageLoader';

const loadedImage = document.getElementsByClassName('loaded-images')[0];
const error = document.getElementById('error');
const selectFile = document.querySelector('#select-file');
const dropFile = document.querySelector('#drop-file');
const imageLoader = new ImageLoader(loadedImage, error);

function loadFile(files) {
  for (const item of files) {
    const imageUrl = URL.createObjectURL(item);
    imageLoader.addImage('no-name', imageUrl);
    selectFile.addEventListener('load', () => {
      URL.revokeObjectURL(imageUrl);
    });
  }
}

dropFile.addEventListener('click', () => {
  selectFile.value = null;
  selectFile.dispatchEvent(new MouseEvent('click'));
});

dropFile.addEventListener('dragover', (event) => {
  event.preventDefault();
});

dropFile.addEventListener('drop', (event) => {
  event.preventDefault();
  const files = Array.from(event.dataTransfer.files);
  loadFile(files);
});

selectFile.addEventListener('input', (event) => {
  const files = Array.from(event.currentTarget.files);
  loadFile(files);
});

loadedImage.addEventListener('click', (event) => {
  if (event.target.className === 'delete') {
    const itemElemnt = event.target.closest('.loaded-image');
    loadedImage.removeChild(itemElemnt);
  }
});