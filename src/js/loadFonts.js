import FontFaceObserver from 'fontfaceobserver';

export default async (container) => {
  const MontserratObserver = new FontFaceObserver('Montserrat');
  const InterObserver = new FontFaceObserver('Inter');

  container = container || document;

  Promise.all([MontserratObserver.load(), InterObserver.load()]).then(() => {
    container
      .querySelectorAll('.font-sans')
      .forEach((el) => el.classList.add('fonts-loaded'));
    container
      .querySelectorAll('.font-serif')
      .forEach((el) => el.classList.add('fonts-loaded'));
  });
};
