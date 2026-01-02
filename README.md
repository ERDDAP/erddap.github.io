# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ npm install
```

### Local Development

```
$ npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Generate translations
Make sure the english json translation files are generated. In the documentation directory run:
```
npm run write-translations
```
Note that when doing a release build it is recommended to delete all of the en *.json files to ensure all tags are properly updated (for example the copyright tag needs to have the most recent version). 

From the main project directory run:
```
python .\translate_docs.py
```
Note that this step is very slow, it translates all of the pages, documentation files, and json message files into 29 additional languages.

To translate a single page or list of pages, you can supply the page paths as arguments:

```
python .\translate_docs.py docs\server-admin\deploy-install.md docs\server-admin\deploy-update.md
```

To translate to a subset of languages, set environment variable `LANGUAGE_CODE_LIST` to a comma separated
list of the language codes to translate.

```
LANGUAGE_CODE_LIST=es,ja .\translate_docs.py docs\server-admin\deploy-install.md
```

### Build

```
$ npm run build
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
