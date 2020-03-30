function init() {

  const body = document.querySelector('body')
  const contact = document.querySelector('.contact')
  const scroller = document.querySelector('.nav_scroller_icon')
  const navbar = document.querySelector('.navbar')
  const projectsIcon = document.querySelector('.projects_icon')
  const projects = document.querySelector('.projects')
  const homeIcon = document.querySelector('.home_icon')
  const aboutMeIcon = document.querySelector('.about_me_icon')
  // const aboutMe = dow

  function scrollFunc() {
    const scrollPerc = (window.scrollY / (body.offsetHeight - contact.offsetHeight - navbar.offsetHeight)) * 100
    scroller.style.left = `${scrollPerc}%`
    // console.log(window.scrollY)
  }

  // function goToFunc() {
  //   switch (event.target) {
  //     case projectsIcon:
  //       window.scrollTo(0, projects.getBoundingClientRect().top - navbar.offsetHeight)
  //       break
  //     case aboutMeIcon:
  //       window.scrollTo(0, projects.getBoundingClientRect().top - navbar.offsetHeight)
  //   }
  //   console.log('working')
  //   console.log(projects.getBoundingClientRect().top)
  //   console.log(window.scrollY)
  //   window.scrollTo(0, projects.getBoundingClientRect().top - navbar.offsetHeight)
  // }

  // window.addEventListener('click', goToFunc)
  window.addEventListener('scroll', scrollFunc)

}

window.addEventListener('DOMContentLoaded', init)