const preloader = document.querySelector('#preloader')

const timer = setTimeout(() => {
    console.log(preloader, 'preloader')
    preloader.style.display = 'none'
}, '2000')

// clearTimeout(timer)