function init() {

  // DOM Elements

  const line = document.querySelector('.line')
  const outerContainer = document.querySelector('.outer_container')
  const home = document.querySelector('.home')
  const aboutMe = document.querySelector('.about_me')
  const projects = document.querySelector('.projects')
  const contact = document.querySelector('.contact')
  const scroller = document.querySelector('.nav_scroller_icon')
  const homeIcon = document.querySelector('.home_icon')
  const aboutMeIcon = document.querySelector('.about_me_icon')
  const projectsIcon = document.querySelector('.projects_icon')
  const contactIcon = document.querySelector('.contact_icon')

  const windowHeight = outerContainer.offsetHeight

  const order = [home, aboutMe, projects, contact]
  let scrollPos = 0
  let currentPage = home
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

  function pageContentClassChange() {
    console.log(currentPage)
    switch (currentPage) {
      case home:
        pageColour ? home.classList.add('reverse_home') : home.classList.remove('reverse_home')
        break
      case aboutMe:
        !pageColour ? aboutMe.classList.add('reverse_about_me') : aboutMe.classList.remove('reverse_about_me')
        break
      case projects:
        pageColour ? projects.classList.add('reverse_projects') : projects.classList.remove('reverse_projects')
        break
      case contact:
        !pageColour ? contact.classList.add('reverse_contact') : contact.classList.remove('reverse_contact')
        break
    }
  }

  function scrollFunc(event) {
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
    let top = Math.floor(((scrollPos / windowHeight) * 100) / 3)
    switch (currentPage) {
      case home:
        top += 0
        break
      case aboutMe:
        top += Math.floor(100 / 3)
        break
      case projects:
        top += Math.floor((100 / 3) * 2)
        break
      case contact:
        top += 100
        break
    }
    if (top >= 116) top = - 16 + (top - 116)
    // console.log(top)
    scroller.style.top = `${top}%`
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

  function setColours() {
    if (!pageColour) {
      order.forEach(page => {
        if (page !== currentPage) page.classList.add('purple_background')
      })
      pageColour = 1
      // console.log('adding purple')
    } else {
      order.forEach(page => {
        if (page !== currentPage) page.classList.remove('purple_background')
      })
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

  function clickIconEvent(event) {
    if (!iconClickable) return
    iconClickable = false
    lineMove = false
    switch (event.target) {
      case homeIcon:
        if (currentPage === home) {
          iconClickable = true
          lineMove = true
          return
        }
        currentPage = home
        pageContentClassChange()
        zIndexChange(currentPage)
        currentPage.classList.add('page_open')
        scroller.style.top = '0%'
        break
      case aboutMeIcon:
        if (currentPage === aboutMe) {
          iconClickable = true
          lineMove = true
          return
        }
        currentPage = aboutMe
        pageContentClassChange()
        zIndexChange(currentPage)
        currentPage.classList.add('page_open')
        scroller.style.top = `${100 / 3}%`
        break
      case projectsIcon:
        if (currentPage === projects) {
          iconClickable = true
          lineMove = true
          return
        }
        currentPage = projects
        pageContentClassChange()
        zIndexChange(currentPage)
        currentPage.classList.add('page_open')
        scroller.style.top = `${(100 / 3) * 2}%`
        break
      case contactIcon:
        if (currentPage === contact) {
          iconClickable = true
          lineMove = true
          return
        }
        currentPage = contact
        pageContentClassChange()
        zIndexChange(currentPage)
        currentPage.classList.add('page_open')
        scroller.style.top = '100%'
        break
    }
  }

  // Icon buttons

  homeIcon.addEventListener('click', clickIconEvent)
  aboutMeIcon.addEventListener('click', clickIconEvent)
  projectsIcon.addEventListener('click', clickIconEvent)
  contactIcon.addEventListener('click', clickIconEvent)


  window.addEventListener('wheel', scrollFunc)
  window.addEventListener('transitionend', clipPathEnd)
  window.addEventListener('transitionstart', clipPathStart)

}

window.addEventListener('DOMContentLoaded', init)