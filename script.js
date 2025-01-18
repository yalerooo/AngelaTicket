document.addEventListener('DOMContentLoaded', function() {
  const ticketCard = document.querySelector('.ticket-card');
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let rotateY = 0;
  let rotateX = 0;

  ticketCard.addEventListener('mousedown', startDrag);
  ticketCard.addEventListener('touchstart', startDrag);

  document.addEventListener('mousemove', drag);
  document.addEventListener('touchmove', drag);

  document.addEventListener('mouseup', endDrag);
  document.addEventListener('touchend', endDrag);


  function startDrag(e) {
      isDragging = true;
      startX = e.clientX || e.touches[0].clientX;
      startY = e.clientY || e.touches[0].clientY;
  }

  function drag(e) {
      if (!isDragging) return;
    
      const x = e.clientX || e.touches[0].clientX;
      const y = e.clientY || e.touches[0].clientY;
      const deltaX = x - startX;
      const deltaY = y - startY;

      rotateY += deltaY * 0.2;  // Usa deltaY para la rotación en Y
      rotateX -= deltaX * 0.2;  // Usa deltaX para la rotación en X (invertido)

      ticketCard.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
      
       startX = x; // Actualiza la posición inicial X
       startY = y; // Actualiza la posición inicial Y
  }

  function endDrag() {
      isDragging = false;
  }

  // Ajuste del overlay del qr al girar
  const qrOverlay = document.querySelector('.qr-overlay');
  const back = document.querySelector('.back');
  const front = document.querySelector('.front');

  function checkFlip() {

      if(rotateY % 360 > 90 && rotateY % 360 < 270){
         qrOverlay.style.visibility = 'hidden';
         front.style.zIndex = 1;
         back.style.zIndex = 2;
      } else {
          qrOverlay.style.visibility = 'visible';
         front.style.zIndex = 2;
         back.style.zIndex = 1;
      }

     requestAnimationFrame(checkFlip);
  }
  checkFlip();
});
