const cards = document.querySelectorAll('.menu-card');

cards.forEach((card, index) => {

  card.style.opacity = 0;
  card.style.transform = 'translateY(50px)';

  setTimeout(() => {
    card.style.transition = '0.7s';
    card.style.opacity = 1;
    card.style.transform = 'translateY(0)';
  }, index * 250);

});
