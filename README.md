# Modesto CSS ![GitHub package.json version](https://img.shields.io/github/package-json/v/nalmeida/modesto)

Um framework CSS simples (fortemente inspirado pelo visual do [CodyFrame](https://codyhouse.co/ds/docs/framework)), para estilizar minimamente um conteúdo tipo "texto" sem precisar adicionar nenhuma classe (ou o mínimo) aos elementos nativos.

👉 Documentação e demonstração: https://modesto.netlify.app/

> **modesto:** dotado de modéstia; isento de vaidade; simples, despretensioso.

---

## Utilização

Versão com o [CSS aberto](https://unpkg.com/modesto@latest/modesto.css) ![Standard CSS size](https://img.badgesize.io/nalmeida/modesto/master/modesto.css.png):

```
<link rel="stylesheet" href="https://unpkg.com/modesto@latest/modesto.css">
```

Versão com o [CSS minificado](https://unpkg.com/modesto@latest/modesto.min.css) ![GZIPed CSS size](https://img.badgesize.io/nalmeida/modesto/master/modesto.min.css.png?compression=gzip):

```
<link rel="stylesheet" href="https://unpkg.com/modesto@latest/modesto.min.css">
```

---

## Princípios

1.  📖 Semântico
2.  👋 Independente de qualquer conteúdo externo
3.  ♿️ Acessível
4.  🤓 *ClassLess*: evitar ao máximo a necessidade colocar `class` nos elementos
5.  ⚡️ Leve, MUITO leve para se "embedado" direto na página, ![GZIPed CSS size](https://img.badgesize.io/nalmeida/modesto/master/modesto.min.css.png?compression=gzip)

## Development Scripts

This "bootstrap" is based on the awesome [HTML SASS Jumpstart](https://github.com/5t3ph/html-sass-jumpstart) from [5t3ph](https://github.com/5t3ph).

**`npm run develop`**

> Serve with hot reload at localhost:1337

**`npm run build`**

> Generate minified, autoprefixed CSS for production

Use this as the "Publish command" if needed by hosting such as Netlify.

**`npm run dist`**

> Replaces `__VERSION__` string inside html and css file for the version from package.json file, generates the CSS files and copy them into the root of the project.

---

In order publish a new version and documentation:

1. Change the `version` inside the `package.json`.

```
$ npm run dist
$ git add .
$ git commit -m ...
$ git push origin master
$ npm publish
```

---

[![Netlify Status](https://api.netlify.com/api/v1/badges/4e99a990-c943-4861-8d48-4985dabd87e3/deploy-status)](https://app.netlify.com/sites/modesto/deploys)