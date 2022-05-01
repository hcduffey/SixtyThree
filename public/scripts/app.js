const close = document.getElementById('close')
const modal = document.getElementById('modal')
const info1 = document.querySelector('.info1')
const info2 = document.querySelector('.info2')
const info3 = document.querySelector('.info3')
const closeModal = () => {
    modal.style.display = 'none'
    info1.style.animationName = 'slideIn'
    info2.style.animationName = 'slideIn'
    info3.style.animationName = 'slideIn'
  }

  close.addEventListener('click', closeModal)



