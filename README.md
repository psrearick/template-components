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

## Process
