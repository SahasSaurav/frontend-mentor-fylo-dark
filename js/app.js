const hamburgerMenu=document.getElementById('hamburger');
const navUl=document.getElementById('nav-ul');

hamburgerMenu.addEventListener('click',()=>{
    navUl.classList.toggle('show');
})