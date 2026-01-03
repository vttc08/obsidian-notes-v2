Dynamic, interactive user interface
Small reusable components
- tree of components with App being the root
## Create App
### VIte
```bash
npm create vite@latest
# follow instructions
```
This will create a subfolder with the name defined
In that directory, run to install dependencies
```bash
npm install
npm run dev
```
## Structure
```bash
node_modules/ # node dependencies
public/ # images, stylesheets
src/ # code
index.html
```
- `package.json` dependencies needed
- `tsconfig.json` only for TS, how is it complied
Support an image is located in `./public/vite.svg`, write `<img src=vite.svg>` relative to the `public` path