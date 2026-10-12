import './style.css'

// ---- files in public/ ----
const GIF_SRC = '/lizard.gif'
const LIZARD_AUDIO = '/lizard.mpeg'
const SAM_AUDIO = '/mas.mpeg'

// how long the gif plays per press, in ms — lower = shorter burst
const PLAY_MS = 400

const poster = document.querySelector('#tom-poster')
let tom = document.querySelector('#tom')
const btn = document.querySelector('#lizard-btn')
const secretBtn = document.querySelector('#secret-btn')
const pctx = poster.getContext('2d')

let secretMode = false
let playTimer = null

const lizardSound = new Audio(LIZARD_AUDIO)
const samSound = new Audio(SAM_AUDIO)

// ---- frozen poster: draw the gif's first frame onto the canvas ----
const loader = new Image()
loader.onload = () => {
  poster.width = loader.naturalWidth
  poster.height = loader.naturalHeight
  pctx.drawImage(loader, 0, 0)
  tom.src = GIF_SRC // warm up the live gif now, so presses never wait on loading
}
loader.onerror = () =>
  console.error('lizard.gif failed to load — is it in public/ with that exact name?')
loader.src = GIF_SRC

lizardSound.addEventListener('error', () =>
  console.error('lizard.mpeg failed to load — check the file name in public/'))
samSound.addEventListener('error', () =>
  console.error('mas.mpeg failed to load — check the file name in public/'))

function playSound() {
  const s = secretMode ? samSound : lizardSound
  s.currentTime = 0
  s.play().catch(err => console.error('audio was blocked:', err))
}

btn?.addEventListener('click', () => {
  // restart from frame 0 with zero re-download: a cloned <img>
  // replays the cached gif from the beginning, so there's no flash
  const fresh = tom.cloneNode()
  fresh.hidden = false
  tom.replaceWith(fresh)
  tom = fresh
  poster.hidden = true

  playSound()

  clearTimeout(playTimer)
  playTimer = setTimeout(() => {
    poster.hidden = false
    tom.hidden = true
    pctx.drawImage(loader, 0, 0)
  }, PLAY_MS)
})

secretBtn?.addEventListener('click', () => {
  secretMode = !secretMode
  document.body.classList.toggle('secret', secretMode)
  secretBtn.classList.toggle('on', secretMode)
})
