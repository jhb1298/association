const sideBtn = document.getElementById('barButton');
//let body = document.body;
const menu = document.getElementById('sideMenu');
let drawerOpened = false;


sideBtn.addEventListener('click', () => {
    if (drawerOpened) {
        menu.classList.add('sideMenuOut');
        menu.addEventListener('animationend', () => {
            menu.classList.remove('sideMenuOut');
            menu.style.transform = 'scaleY(0)';
        }, { once: true });
        drawerOpened = false;
    }
    else {
        menu.classList.add('sideMenuIn');
        menu.addEventListener('animationend', () => {
            menu.classList.remove('sideMenuIn');
            menu.style.transform = 'scaleY(1)';

        }, { once: true });
        drawerOpened = true;
    }
    console.log(drawerOpened)
});



