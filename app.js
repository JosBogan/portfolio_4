function init() {

  // DOM Elements

  const introContainer = document.querySelector('.intro_backdrop_container')

  const canvasBackground = document.querySelector('.canvas_background')
  const ctxBg = canvasBackground.getContext('2d')

  const canvasForeground = document.querySelector('.canvas_foreground')
  const ctxFg = canvasForeground.getContext('2d') 

  const canvasWidth = introContainer.getBoundingClientRect().width
  const canvasHeight = introContainer.getBoundingClientRect().height

  canvasBackground.width = canvasWidth
  canvasBackground.height = canvasHeight

  canvasForeground.width = canvasWidth
  canvasForeground.height = canvasHeight

  //  Variables

  let past = null
  const linesArr = []

  const canvasBoxDimensions = {
    x: 50,
    y: 50
  }

  const canvasGridDimensions = {
    x: canvasBackground.width / canvasBoxDimensions.x,
    y: canvasBackground.height / canvasBoxDimensions.y
  }

  // 


  function drawDots() {
    for (let x = (canvasBoxDimensions.x / 2); x < canvasWidth; x += canvasBoxDimensions.x) {
      for (let y = (canvasBoxDimensions.y / 2); y < canvasHeight; y += canvasBoxDimensions.y) {
        ctxBg.fillStyle = '#D8D8D8'
        ctxBg.beginPath()
        ctxBg.arc(x, y, 4, 0, 2 * Math.PI)
        ctxBg.fill()
      }
    }
  }

  function moveMouseFunc(event) {
    const mouseX = event.clientX - introContainer.getBoundingClientRect().x - 25
    const mouseY = event.clientY - introContainer.getBoundingClientRect().y - 25
    const cellX = parseInt((mouseX + canvasBoxDimensions.x / 2) / canvasBoxDimensions.x) * canvasBoxDimensions.x + 25
    const cellY = parseInt((mouseY + canvasBoxDimensions.y / 2) / canvasBoxDimensions.y) * canvasBoxDimensions.y + 25
    if (!past) {
      past = {
        x: cellX,
        y: cellY,
        a: 1
      }
      return linesArr.push(past)
    }
    if (past.x !== cellX || past.y !== cellY) {
      const newLocation = {
        x: cellX,
        y: cellY,
        a: 1
      }
      linesArr.push(newLocation)
      past = { ...newLocation }
    }
  }

  function canvasTick() {
    ctxFg.clearRect(0, 0, canvasWidth, canvasHeight)
    for (let i = 0; i < linesArr.length - 1; i++) {
      linesArr[i].a = linesArr[i].a - 0.02
      ctxFg.beginPath()
      ctxFg.lineWidth = 2
      ctxFg.strokeStyle = 'rgba(85, 85, 85, ' + linesArr[i].a + ')'
      ctxFg.moveTo(linesArr[i].x, linesArr[i].y)
      ctxFg.lineTo(linesArr[i + 1].x, linesArr[i + 1].y)
      ctxFg.stroke()
      ctxFg.closePath()
      if (linesArr[i].a < 0) linesArr.splice(i, 1)
    }
    window.requestAnimationFrame(canvasTick)
  }

  window.requestAnimationFrame(canvasTick)
  drawDots()
  // console.log(canvasGridDimensions)


  canvasBackground.addEventListener('mousemove', moveMouseFunc)

}

window.addEventListener('DOMContentLoaded', init)