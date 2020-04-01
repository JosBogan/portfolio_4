function init() {

  const navbar = document.querySelector('.navbar')
  const navbarPlaceholder = document.querySelector('.navbar_placeholder')
  const navbarInner = document.querySelector('.navbar_inner')
  const aboutContents = document.querySelectorAll('.about_content_inner')
  const aboutToggles = document.querySelectorAll('.about_toggle')
  const navBarButtons = document.querySelectorAll('.navbar_inner li')

  const home = document.querySelector('.home')
  const aboutMe = document.querySelector('.about_me')
  const projects = document.querySelector('.projects')
  const contact = document.querySelector('.contact')

  const canvasBg = document.querySelector('.canvas_bg')
  const ctxBg = canvasBg.getContext('2d')

  const canvasFg = document.querySelector('.canvas_fg')
  const ctxFg = canvasFg.getContext('2d')

  let navTrigger = false

  function scrollEvent(event) {

    // nav section light up 
    if (pageYOffset >= (document.body.clientHeight - window.innerHeight)) {
      navBarButtons.forEach(button => button.classList.remove('navbar_link_active'))
      navBarButtons[3].classList.add('navbar_link_active')
    } else if (aboutMe.getBoundingClientRect().top <= 1) {
      navBarButtons.forEach(button => button.classList.remove('navbar_link_active'))
      navBarButtons[2].classList.add('navbar_link_active')
    } else if (projects.getBoundingClientRect().top <= 1) {
      navBarButtons.forEach(button => button.classList.remove('navbar_link_active'))
      navBarButtons[1].classList.add('navbar_link_active')
    } else {
      navBarButtons.forEach(button => button.classList.remove('navbar_link_active'))
      navBarButtons[0].classList.add('navbar_link_active')
    }

    // navbar bounce

    if (pageYOffset > navbar.offsetHeight) {
      if (navTrigger) return
      navTrigger = true
      let top = -pageYOffset
      navbarInner.style.position = 'fixed'
      navbarInner.style.top = `${top}px`
      const int = setInterval(function() {
        top += 1
        navbarInner.style.top = `${top}px`
        if (top >= 0) clearInterval(int)
      }, 10)
    } else if (pageYOffset === 0) {
      navTrigger = false
      navbarPlaceholder.height = '0px'
      navbarInner.style.position = 'static'
    }
  }

  // about content block

  function changeAboutContent(event) {
    console.log(aboutContents)
    aboutContents.forEach(content => {
      content.getAttribute('data-name') === event.target.getAttribute('data-name') ? content.style.display = 'block' : content.style.display = 'none'
    })
    aboutToggles.forEach(toggle => {
      toggle === event.target ? toggle.classList.add('about_toggle_on') : toggle.classList.remove('about_toggle_on')
    })
    console.log(event.target.getAttribute('data-name'))
  }

  // Canvas

  canvasBg.width = home.getBoundingClientRect().width
  canvasBg.height = home.getBoundingClientRect().height * 1.5
  canvasFg.width = home.getBoundingClientRect().width
  canvasFg.height = home.getBoundingClientRect().height * 1.5

  const height = canvasBg.offsetHeight
  const width = canvasBg.offsetWidth

  const dimensions = {
    x: 26,
    y: 12
  }

  const gridDimensions = {
    x: width / dimensions.x,
    y: height / dimensions.y
  }

  for (let x = gridDimensions.x / 2; x < window.innerWidth; x += gridDimensions.x) {
    for (let y = gridDimensions.y / 2; y < window.innerHeight; y += gridDimensions.y) {
      ctxBg.fillStyle = '#D8D8D8'
      ctxBg.beginPath()
      ctxBg.arc(x, y, 3, 0, 2 * Math.PI)
      ctxBg.fill()
    }
  }

  let past = null
  const arr = []

  function moveMouseFunc() {
    const cellX = (parseInt((event.clientX) / gridDimensions.x) * gridDimensions.x) + gridDimensions.x / 2
    const cellY = (parseInt((event.clientY + pageYOffset) / gridDimensions.y) * gridDimensions.y) - gridDimensions.y / 2
    console.log(event.clientY, cellY)
    if (!past) {
      past = {
        x: cellX,
        y: cellY,
        a: 1
      }
      return arr.push(past)
    }
    if (past.x !== cellX || past.y !== cellY) {
      const newLocation = {
        x: cellX,
        y: cellY,
        a: 1
      }
      arr.push(newLocation)
      past = { ...newLocation }
    }
  }

  function tick() {
    ctxFg.clearRect(0, 0, canvasFg.width, canvasFg.height)
    for (let i = 0; i < arr.length - 1; i++) {
      arr[i].a = arr[i].a - 0.02
      ctxFg.beginPath()
      ctxFg.lineWidth = 2
      ctxFg.strokeStyle = 'rgba(85, 85, 85, ' + arr[i].a + ')'
      ctxFg.moveTo(arr[i].x, arr[i].y)
      ctxFg.lineTo(arr[i + 1].x, arr[i + 1].y)
      ctxFg.stroke()
      ctxFg.closePath()
      if (arr[i].a < 0) arr.splice(i, 1)
    }
    window.requestAnimationFrame(tick)
  }

  window.requestAnimationFrame(tick)

  canvasBg.addEventListener('mousemove', moveMouseFunc)

  function clickTarget() {
    console.log(event.target)
  }

  aboutToggles.forEach(toggle => toggle.addEventListener('click', changeAboutContent))
  window.addEventListener('scroll', scrollEvent)
  window.addEventListener('click', clickTarget)

}

window.addEventListener('DOMContentLoaded', init)