function init() {

  // DOM Elements

  const line = document.querySelector('.line')
  const outerContainer = document.querySelector('.outer_container')
  const home = document.querySelector('.home')
  const aboutMe = document.querySelector('.about_me')
  const projects = document.querySelector('.projects')
  const contact = document.querySelector('.contact')
  const scroller = document.querySelectorAll('.nav_scroller_icon')
  const homeIcons = document.querySelectorAll('.home_icon')
  const aboutMeIcons = document.querySelectorAll('.about_me_icon')
  const projectsIcons = document.querySelectorAll('.projects_icon')
  const contactIcons = document.querySelectorAll('.contact_icon')
  const navbars = document.querySelectorAll('.navbar')
  // const navTimeline = document.querySelector('.nav_timeline_line')

  const windowHeight = outerContainer.offsetHeight
  const windowWidth = outerContainer.offsetWidth

  // console.log(windowWidth)

  const order = [home, aboutMe, projects, contact]
  let scrollPos = 0
  let currentPage = home
  let currentNav = navbars[0]
  let lineColour = 0
  let pageColour = 1
  let lineMove = true
  let iconClickable = true

  function nextPage() {
    lineMove = false
    iconClickable = false
    // order[order.indexOf(page) + 1].style.zIndex = '200'
    // console.log(order[order.indexOf(currentPage) + 1])
    currentPage = order[order.indexOf(currentPage) + 1] ? order[order.indexOf(currentPage) + 1] : order[0]
    currentNav = order[order.indexOf(currentNav) + 1] ? order[order.indexOf(currentNav) + 1] : order[0]
    pageContentClassChange()
    zIndexChange(currentPage)
    // currentPage.classList.toggle('purple_background')
    line.style.zIndex = '199'
    currentPage.classList.add('page_open')
    line.classList.add('line_animation_test')
    line.style.height = '0px'
    // // focusChange(order[order.indexOf(page) + 1])
    // // page = order[order.indexOf(page) + 1]
  }

  // function pageContentClassChange() {
  //   console.log(currentPage)
  //   switch (currentPage) {
  //     case home:
  //       pageColour ? home.classList.add('reverse_home') : home.classList.remove('reverse_home')
  //       break
  //     case aboutMe:
  //       !pageColour ? aboutMe.classList.add('reverse_about_me') : aboutMe.classList.remove('reverse_about_me')
  //       break
  //     case projects:
  //       pageColour ? projects.classList.add('reverse_projects') : projects.classList.remove('reverse_projects')
  //       break
  //     case contact:
  //       !pageColour ? contact.classList.add('reverse_contact') : contact.classList.remove('reverse_contact')
  //       break
  //   }
  // }

  function pageContentClassChange() {
    switch (currentPage) {
      case home:
        if (pageColour) {
          home.classList.add('reverse_home')
          windowWidth >= 1025 && navbars[0].classList.add('reverse_nav')
        } else {
          home.classList.remove('reverse_home')
          windowWidth >= 1025 && navbars[0].classList.remove('reverse_nav')
        }
        break
      case aboutMe:
        if (!pageColour) {
          aboutMe.classList.add('reverse_about_me')
          windowWidth >= 1025 && navbars[1].classList.remove('reverse_nav')
        } else {
          aboutMe.classList.remove('reverse_about_me')
          windowWidth >= 1025 && navbars[1].classList.add('reverse_nav')
        }
        break
      case projects:
        if (pageColour) {
          projects.classList.add('reverse_projects')
          windowWidth >= 1025 && navbars[2].classList.add('reverse_nav')
        } else {
          projects.classList.remove('reverse_projects')
          windowWidth >= 1025 && navbars[2].classList.remove('reverse_nav')
        }
        break
      case contact:
        if (!pageColour) {
          contact.classList.add('reverse_contact')
          windowWidth >= 1025 && navbars[3].classList.remove('reverse_nav')
        } else {
          contact.classList.remove('reverse_contact')
          windowWidth >= 1025 && navbars[3].classList.add('reverse_nav')
        }
        break
    }
  }

  function scrollFunc(event) {
    console.log('fda')
    if (window.innerWidth < 480) return
    if (!lineMove) return
    const change = event.deltaY
    if (scrollPos + change < 0) {
      scrollPos = 0
    } else if (scrollPos + change > windowHeight) {
      scrollPos = windowHeight
    } else {
      scrollPos += change
    }
    // console.log(scrollPos)
    scrollerHeight()
    line.style.height = `${scrollPos}px`
    if (scrollPos === windowHeight) nextPage()
  }

  function scrollerHeight() {
    let left = ((scrollPos / windowHeight) * 100) / 3
    switch (currentPage) {
      case home:
        left += 0
        break
      case aboutMe:
        left += 100 / 3
        break
      case projects:
        left += (100 / 3) * 2
        break
      case contact:
        left += 100
        break
    }
    if (left >= 117) left = - 17 + (left - 117)
    // console.log(top)
    // console.log(scroller)
    scroller.forEach(scroll => scroll.style.left = `${left}%`)
    // scroller.style.left = `${left}%`
  }

  function clipPathEnd() {
    // setColours()
    if (event.propertyName === 'clip-path') {
      // setColours()
      scrollPos = 0
      // line.style.height = '0px'
      // home.style.zIndex = '1'
      line.style.height = '0px'
      line.style.zIndex = '201'
      // zIndexChange(order[order.indexOf(page) + 1])
      focusChange(currentPage)
      // colourChange(currentPage)
      // page = order[order.indexOf(page) + 1]
      lineChange()
      setColours(currentPage)
      lineMove = true
      iconClickable = true
    }
    if (event.propertyName === 'height') {
      line.classList.remove('line_animation_test')
      line.style.zIndex = '99'
    }
    // setColours()
    // currentPage.classList.remove('page_open')
    // currentPage.classList.add('page_full_clip')
  }
  
  function clipPathStart() {
    if (event.propertyName === 'clip-path') {
      line.style.zIndex = '99'
    }
  }

  function lineChange() {
    line.classList.toggle('white_line')
    !lineColour ? lineColour = 1 : lineColour = 0
  }

  function zIndexChange(currentPage) {
    order.forEach(page => {
      page !== currentPage ? page.style.zIndex = '1' : page.style.zIndex = '200'
    })
  }

  function colourChange(current) {
    order.forEach(page => {
      if (page !== current) page.classList.toggle('purple_background')
    })
  }

  // function setNavColours() {
  //   if (!pageColour) {
  //     navbars.forEach(navbar => {
  //       if (navbar !== currentNav) navbar.classList.add('navbar_purple_background')
  //     })
  //     // navTimeline.classList.remove('nav_timeline_white')
  //     pageColour = 1
  //     // console.log('adding purple')
  //   } else {
  //     navbars.forEach(navbar => {
  //       if (navbar !== currentNav) navbar.classList.remove('navbar_purple_background')
  //     })
  //     // navTimeline.classList.add('nav_timeline_white')
  //     pageColour = 0
  //     // console.log('removing purple')
  //   }
  //   // console.log(order)
  // }

  function setColours() {
    if (!pageColour) {
      // navbars.forEach(navbar => {
      //   if (navbar !== currentNav) navbar.classList.add('navbar_purple_background')
      // })
      order.forEach(page => {
        if (page !== currentPage) page.classList.add('purple_background')
      })
      // navTimeline.classList.remove('nav_timeline_white')
      pageColour = 1
      // console.log('adding purple')
    } else {
      // navbars.forEach(navbar => {
      //   if (navbar !== currentNav) navbar.classList.remove('navbar_purple_background')
      // })
      order.forEach(page => {
        if (page !== currentPage) page.classList.remove('purple_background')
      })
      // navTimeline.classList.add('nav_timeline_white')
      pageColour = 0
      // console.log('removing purple')
    }
    // console.log(order)
  }

  function focusChange(current) {
    order.forEach(page => {
      if (page !== current) page.classList.remove('page_open')
    })
    // page = current
  }

  // function clickIconEvent(event) {
  //   if (!iconClickable) return
  //   iconClickable = false
  //   lineMove = false
  //   switch (event.target) {
  //     case homeIcon:
  //       if (currentPage === home) {
  //         iconClickable = true
  //         lineMove = true
  //         return
  //       }
  //       currentPage = home
  //       pageContentClassChange()
  //       zIndexChange(currentPage)
  //       currentPage.classList.add('page_open')
  //       scroller.forEach(scroll => scroll.style.left = '0%')
  //       // scroller.style.left = '0%'
  //       break
  //     case aboutMeIcon:
  //       if (currentPage === aboutMe) {
  //         iconClickable = true
  //         lineMove = true
  //         return
  //       }
  //       currentPage = aboutMe
  //       pageContentClassChange()
  //       zIndexChange(currentPage)
  //       currentPage.classList.add('page_open')
  //       scroller.forEach(scroll => scroll.style.left = `${100 / 3}%`)
  //       // scroller.style.left = `${100 / 3}%`
  //       break
  //     case projectsIcon:
  //       if (currentPage === projects) {
  //         iconClickable = true
  //         lineMove = true
  //         return
  //       }
  //       currentPage = projects
  //       pageContentClassChange()
  //       zIndexChange(currentPage)
  //       currentPage.classList.add('page_open')
  //       scroller.forEach(scroll => scroll.style.left = `${(100 / 3) * 2}%`)
  //       // scroller.style.left = `${(100 / 3) * 2}%`
  //       break
  //     case contactIcon:
  //       if (currentPage === contact) {
  //         iconClickable = true
  //         lineMove = true
  //         return
  //       }
  //       currentPage = contact
  //       pageContentClassChange()
  //       zIndexChange(currentPage)
  //       currentPage.classList.add('page_open')
  //       scroller.forEach(scroll => scroll.style.left = '100%')
  //       // scroller.style.left = '100%'
  //       break
  //   }
  // }

  function clickIconEvent(event) {
    if (!iconClickable) return
    iconClickable = false
    lineMove = false
    if (Array.from(homeIcons).includes(event.target)) {
      if (currentPage === home) {
        iconClickable = true
        lineMove = true
        return
      }
      currentPage = home
      pageContentClassChange()
      zIndexChange(currentPage)
      currentPage.classList.add('page_open')
      scroller.forEach(scroll => scroll.style.left = '0%')
    } else if (Array.from(aboutMeIcons).includes(event.target)) {
      if (currentPage === aboutMe) {
        iconClickable = true
        lineMove = true
        return
      }
      currentPage = aboutMe
      pageContentClassChange()
      zIndexChange(currentPage)
      currentPage.classList.add('page_open')
      scroller.forEach(scroll => scroll.style.left = `${100 / 3}%`)
    } else if (Array.from(projectsIcons).includes(event.target)) {
      if (currentPage === projects) {
        iconClickable = true
        lineMove = true
        return
      }
      currentPage = projects
      pageContentClassChange()
      zIndexChange(currentPage)
      currentPage.classList.add('page_open')
      scroller.forEach(scroll => scroll.style.left = `${(100 / 3) * 2}%`)
    } else if (Array.from(contactIcons).includes(event.target)) {
      if (currentPage === contact) {
        iconClickable = true
        lineMove = true
        return
      }
      currentPage = contact
      pageContentClassChange()
      zIndexChange(currentPage)
      currentPage.classList.add('page_open')
      scroller.forEach(scroll => scroll.style.left = '100%')
        
    }
  }

  // Icon buttons

  // homeIcon.addEventListener('click', clickIconEvent)
  // aboutMeIcon.addEventListener('click', clickIconEvent)
  // projectsIcon.addEventListener('click', clickIconEvent)
  // contactIcon.addEventListener('click', clickIconEvent)

  homeIcons.forEach(icon => icon.addEventListener('click', clickIconEvent))
  aboutMeIcons.forEach(icon => icon.addEventListener('click', clickIconEvent))
  projectsIcons.forEach(icon => icon.addEventListener('click', clickIconEvent))
  contactIcons.forEach(icon => icon.addEventListener('click', clickIconEvent))


  window.addEventListener('wheel', scrollFunc)
  window.addEventListener('touchmove', scrollFunc)
  window.addEventListener('transitionend', clipPathEnd)
  window.addEventListener('transitionstart', clipPathStart)

}

window.addEventListener('DOMContentLoaded', init)