import FontFaceObserver from "fontfaceobserver";

export default async () => {
  const MontserratObserver = new FontFaceObserver('Montserrat');
  const InterObserver = new FontFaceObserver('Inter');

  Promise.all([
    MontserratObserver.load(),
    InterObserver.load(),
  ]).then(() => {
    document.querySelectorAll('.font-sans').forEach(el => el.classList.add('fonts-loaded'));
    document.querySelectorAll('.font-serif').forEach(el => el.classList.add('fonts-loaded'));
  });
};
