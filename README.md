# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Generate translations
Make sure the english json translation files are generated. In the documentation directory run:
```
npm run write-translations
```

From the main erddap project directory run:
```
python .\translation\translate_docs.py
```
Note that this step is very slow, it translates all of the pages, documentation files, and json message files into 29 additional languages.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```
or on Windows (and using npm):
```
cmd /C 'set "GIT_USER=<Your GitHub username>" && npm run deploy'
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

### Headers

In order to have consistent anchor links across languages (and so be able to have links within the text), header ids were generated using:
```
npm run write-heading-ids
```
You can also manually add header ids.