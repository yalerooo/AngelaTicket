document.addEventListener('DOMContentLoaded', function() {
    const ticketCard = document.querySelector('.ticket-card');
    let isDragging = false;
    let startX = 0;
    let rotateY = 0;

    ticketCard.addEventListener('mousedown', startDrag);
    ticketCard.addEventListener('touchstart', startDrag);
  
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag);

    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);


    function startDrag(e) {
      isDragging = true;
      startX = e.clientX || e.touches[0].clientX; // obtiene la posición inicial
    }

    function drag(e) {
      if (!isDragging) return;
      
        const x = e.clientX || e.touches[0].clientX;
        const deltaX = x - startX; // calcula la diferencia
        rotateY += deltaX * 0.2; // ajusta la sensibilidad del giro
        ticketCard.style.transform = `rotateY(${rotateY}deg)`; // aplica el giro
        startX = x; // actualiza la posición inicial
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