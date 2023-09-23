export const updateResponsiveClasses = async () => {
  document.querySelectorAll('.frame').forEach((frame) => {
    frame
      .querySelectorAll(
        '[class^="sm:"], [class^="md:"], [class^="lg:"], [class^="xl:"], [class^="2xl:"],' +
          '[class*="sm:"], [class*="md:"], [class*="lg:"], [class*="xl:"], [class*="2xl:"]',
      )
      .forEach((element) => {
        Array.from(element.classList).forEach((classItem) => {
          const split = classItem.split(':');

          if (split.length === 1) {
            return;
          }

          if (['sm', 'md', 'lg', 'xl', '2xl'].indexOf(split[0]) === -1) {
            return;
          }

          element.classList.add('@' + classItem);
          element.classList.remove(classItem);
        });
      });
  });
};
