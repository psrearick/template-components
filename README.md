# Template Components

## Installation

1. `git clone https://github.com/psrearick/template-components.git`
2. `cd template-components`
3. `npm install`
4. `npm run start`

## Sections and Components

Components are containers for code. Each component corresponds to a block of web page content. Each block serves a
specific purpose. For example, an "about" block or a "services" block.

Components are HTML code blocks with optional JavaScript. Each component is stored in a separate HTML file in
the `src/Components` directory.

Sections are containers for components. Each section corresponds to a type of block. An "about" section would be a
collection of components designated as "about" components.

Sections are generated dynamically. They can, however, be overridden by a separate file. If an override file is not
specified, the section will be generated using the `src/Templates/Section.html` template.

## Configuration

Sections and components are configured in `src/config/elementDefinitions.js`. This file exports a `sections`
configuration object and a `components` configuration object.

## Adding a Section

Sections are elements that display sets of components. Each section is rendered using a template file. Template files are
specified in the definitions config file. If a template is not specified for a section, the page will render the default
section template, `/src/Templates/Section.html`.

Follow these steps to create a new section:

1. If you need something custom instead of the default section template, create a section `.html` file in `/src/Sections`.
   - You can use the section template `/src/Templates/Section.html` as a starting point.
   - This process can be done with the helper script, `bin/create-section.sh`, as well.
2. If you created a custom section file, modify it as needed using template variables as described in [template variables](#template-variables).
3. Add an entry for the section to the `sections` object in `/src/js/elementDefinitions.js`.
   - The `sections` object holds sections, keyed by the section name.
   - `path`: the URL to the `html` file. Use `URL` constructor with `import.meta.url` as the base url to convert the
     relative path in the `/src/Sections` directory to an absolute path to the `dist` directory, readable by the browser.
   - `properties`: an object of key/value pairs used in the template, see [template variables](#template-variables)
     for a description of how to use this section.
   - `components`: an array of component names that correspond to keys in the components object.

```js
export const sections = {
  SECTION: {
    path: new URL('../Sections/SECTION.html', import.meta.url),
    properties: {
      section: 'SECTION',
    },
  },
};
```

## Adding a Component

A component is an individual page block.

Follow these steps to create a component:

1. Add an `.html` file for the component in `/src/Components/`.
   - This can be done with `bin/create-section.sh` helper script, which will copy the `src/templates/Section.html`
     template to the `src/sections` directory.
2. If needed, add a `.js` file for the component in `src/js/Components`.
   - if you used the helper script to create the component, adding the `--js` flag will create the JavaScript file as well.
3. Add any template variables needed to the `js` and `html` files, see [template variables](#template-variables).
4. Add an entry for the component to the `components` object in `/src/js/elementDefinitions.js`.

### Component Element Definition

- Component definitions are split between `html` and `js`.
- `html` has three values: `code`,`properties`, and `bodyDefinition`.
  - `code`: the URL to the `html` file. Use `URL` constructor with `import.meta.url` as the base url to convert the
    relative path in the `/src/Sections` directory to an absolute path to the `dist` directory, readable by the browser.
  - `properties`: an object of key/value template variable pairs used in the template.
  - `bodyDefinition` the definition of a div placed after the component's code. This dif is used to display additional
    content on the page so that you can see what the element would look like with more content. This object has two values:
    - `hasBody`: a boolean value indicating if a body div should be added.
    - `bodyClasses`: a set of classes to apply to the appended body div.
  - If the html does not need an appended body, leave it as an empty object: `bodyDefinition: {}`
- `js` has two values: `code` and `properties`.
  - `code`: is the js code to be executed in string form. This can be retrieved from a file using `fs.readFileSync`
    using the `encoding` option to get a string instead of a buffer.
    - This uses two arguments, the path and encoding. For the path, use `path.join` to join the directory of the element
      definition, `__dirname`, to the relative path of the JavaScript file, `/Components/{filename}`. The encoding
      should be `'utf-8'`.
  - `properties`: is an object of key/value pairs used in the template.
  - If the component does not use JavaScript, leave it as an empty object: `js: {}`;

```js
export const components = {
  COMPONENT: {
    html: {
      code: new URL('../Components/COMPONENT.html', import.meta.url),
      properties: {
        KEY: VALUE,
      },
      bodyDefinition: {
        hasBody: true,
        bodyClasses: [
          'min-h-[2000px]',
          'full',
          'bg-gray-100',
          'bg-stripes',
          'bg-stripes-primary-100',
        ],
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

## Template Variables

Variables can be used in component and section templates. This is most useful when a template is used multiple times.

Use the Mustache syntax, `{{variable}}`, for the placeholder. Modifier can be used by appending a `|` to the variable,
followed by the modifier:

- `|r` will add a random string to the end of the variable name that is unique to that component. So, `{{variable|r}}`
  would become something like `variable5Gu3s`. This ensures that variables are unique if a component of template shows up
  twice on a page.
- `|c` will make the first character of the variable's value uppercase. So, `{{variable|c}}` would become `Variable`.
- `|u` will make the variable's value uppercase. So, `{{variable|u}}` would become `VARIABLE`.

The values for variables are configured using the properties object in each element's Element Definition. For
components,
the object is specific to the language, or file, being used. See the [code example](#component-element-definition) for
the Component.

## Scripts

The two scripts used most often are `npm run start` and `npm run deploy`.

Both scripts start by running `npm run rebuild`, a script combining `npm run reset` and `npm run build`.

This will perform the following actions:

1. force remove the `.parcel-cache/` directory.
2. force remove the `.dist/` directory.
3. rebuild the project with Parcel using `src/index.html` as the entrypoint and `dist/` as the destination

From here, `npm run start` will run `npm run dev` to start a parcel development server.

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
- `npm run prepare`: installs husky pre-commit hooks - this is run when `npm install` is run, in case this is a new
  project

## To Document:

- CSS
- Fonts
- Playground
- Page Builder
