# tom's lizard button — vite starter

an empty webpage scaffold, ready to open in vs code.

## run it

1. unzip this folder anywhere you like
2. open the folder in vs code (`code .` from inside it, or file → open folder)
3. in vs code's terminal (ctrl + `): `npm install`
4. then: `npm run dev`
5. open the link vite prints (usually http://localhost:5173)

## insert the gif

1. drop your gif into the `public/` folder
   (`tom-lizard.png` — tom with the background removed — is already in there waiting)
2. in `index.html`, uncomment the `<img>` line and set `src` to your file,
   e.g. `<img src="/tom.gif" alt="Tom the lizard" class="tom" />`
3. the page hot-reloads — no manual refresh needed

## build for sharing

`npm run build` → static files land in `dist/`
