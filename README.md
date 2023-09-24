# Template Components

## Scripts

The two scripts used most often are `npm run start` and `npm run deploy`.

Both scripts start by running `npm run rebuild`, a script combining `npm run reset` and `npm run build`.

This will perform the following actions:

1. force remove the `.parcel-cache/` directory.
2. force remove the `.dist/` directory.
3. rebuild the project with Parcel using `src/index.html` as the entrypoint and `dist/` as the destination

From here, `npm run start`, will run `npm run dev` to start a parcel development server.

`npm run deploy`:

1. will move to the `gh-pages` branch
2. replace the contents of the root directory with the contents of the dist directory
3. push the contents of the new root directory to `remote/gh-pages`

### All Scripts

- `npm run build` : compile code with Parcel using `src/index.html` as the entrypoint
- `npm run deploy`: deploy the `dist` directory
- `npm run fix`: run eslint, stylelint, and prettier and fix issues
- `npm run lint`: run eslint, stylelint, and prettier and report issues but don't fix them
  - deploying means:
    1. run pre-deploy script, `npm run predeploy`
    2. switch to `gh-pages` branch, using `dist/` as the project root
    3. push to `remote/dh-pages`
- `npm run dev`: start Parcel development server with `src/index.html` as the entrypoint
  - optionally, add the `--open` flag to open the project in your default browser
- `npm run predeploy`: run rebuild script, `npm run rebuild`, the is run automatically before deployment
- `npm run rebuild`: run reset script, `npm run reset`, followed run the build script, `npm run build`
- `npm run reset`: remove the `.parcel-cache/` and `dist/` directories
- `npm run start` run rebuild script, `npm run rebuild`, followed by the development script, `npm run dev`
- `npm run watch:css`: set a css watcher on `src/css/index.css` to compile tailwindcss helpers to `src/css/tailwind.css`
  - This script is not critical as building tailwind code JIT is done automatically by postCSS whenever Parcel runs
- `npm run test`: This does nothing because there are no tests
- `npm run prepare`: installs husky pre-commit hooks - this is run when `npm install` is run, in case this is a new project

## Adding a Section

1. Create a section as an `.html` file in `/src/Sections` using the section template `/src/Templates/Section.html`. This can be shortcut with `sh bin/create-section.sh SECTION`.
2. Modify the `html` file as needed, using template variables as described in [templates](#templates).
3. Add two entries for the section in `index.html`, one for the navigation and one for the body display.
4. Add an entry for the section to the `sections` object in `/src/js/elementDefinitions.js`.

### File Entries

#### index.html

**Navigation**

```html

<a
  class="inline-block px-2 py-3 w-full hover:text-white text-primary-800 hover:bg-primary-700"
  href="#SECTION-section" <!-- this is the id given to the `div` in the body -->
>
  SECTION
  <!-- This is the display value in the link,
  it should match the text in the section header button in the section `html` file -->
</a>
```

**Body**

```html

<div
  id="SECTION-section" <!-- this `id` is used in the navigation link -->
  class="header-section"
  data-import="SECTION" <!-- this is the section name used as the key in the element definition  -->
></div>
```

#### Element Definition

- the key is the section name, it should match the `data-import` value in `index.html`.
- The value should be the URL to the `html` file. Use `URL` constructor with `import.meta.url` as the base url to convert the relative path in the `/src/Sections` directory to an absolute path to the `dist` directory, readable by the browser.

```js
export const sections = {
  SECTION: new URL('../Sections/SECTION.html', import.meta.url),
};
```

## Adding a Component

1. Add an `.html` file for the component in `/src/Components/`. This can be shortcut with `sh bin/create-section.sh SECTION`.
2. If needed, add a `.js` file for the component in `src/js/Components`. This can be shortcut with `sh bin/create-section.sh --js COMPONENT`.
3. Add any template variables needed to the `js` and `html` files, see [templates](#templates).
4. Add an entry for the component to the `components` object in `/src/js/elementDefinitions.js`.
5. Add an entry for the component to the "section components" `div` in the component's section `html` file.

### Element Definition

```js
export const components = {
  COMPONENT: {
    html: {
      code: new URL('../Components/COMPONENT.html', import.meta.url),
      properties: {
        KEY: VALUE,
      },
    },
    js: {
      code: fs.readFileSync(
        path.join(__dirname, '/Components/COMPONENT.js'),
        'utf8',
      ),
      properties: {
        KEY: VALUE,
      },
    },
  },
};
```

### Section HTML File

```html
<div id="SECTION" class="flex-1">
  <div class="component-section" data-import="COMPONENT"></div>
</div>
```

## Templates

### Section

### Component
