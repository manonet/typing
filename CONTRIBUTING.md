# How to contribute

Contributions are welcome in any form :) The project currently maintained in [GitLab](https://gitlab.com/zyxneo/typing). If you do not like to use its features, you can even write an email. (Hint: see [package.json](package.json) for details, or go to the [website](http://beta.manonet.org))

For setting up the development environment see [README.md](README.md)

## Translations

Translations are very important, and I can't do them. If you speak any language then you have perfect skills for translation contributions! You can translate the application interface, or you can simply review and proofread the existing translations, fix translation issues, bugs, typos, or grammar issues. Any help is a BIG help.

How to translate? Simple and easy! The user interface is managed in [POEditor](https://poeditor.com), a great translation management system, and in that way translation is even fun! Feel free to join under this link: [Join Translation of Manonet](https://poeditor.com/join/project/eIB3WJcqZ9) See details in [TRANSLATION_GUIDE.md](/src/intl/docs/TRANSLATION_GUIDE.md)

Feel free to report or fix typos or grammar issues in the code-base too. (e.g. this file)

#### Current status

- BR [![POEditor](https://img.shields.io/poeditor/progress/332969/pt-br?token=1aabd279b4b49d495134bbcff94c2199)](https://poeditor.com/projects/po_edit?id_language=190&per_page=50&id=332969) - thanks to [Guilherme Anselmo](https://www.linkedin.com/in/guilhermeanselmo/)
- DE [![POEditor](https://img.shields.io/poeditor/progress/332969/de?token=1aabd279b4b49d495134bbcff94c2199)](https://poeditor.com/projects/po_edit?id_language=55&per_page=50&id=332969) - thanks to [Marlies Kirchner](https://www.linkedin.com/in/marliesolensky/)
- EN [![POEditor](https://img.shields.io/poeditor/progress/332969/en?token=1aabd279b4b49d495134bbcff94c2199)](https://poeditor.com/projects/po_edit?id_language=43&per_page=50&id=332969)
- HR [![POEditor](https://img.shields.io/poeditor/progress/332969/hr?token=1aabd279b4b49d495134bbcff94c2199)](https://poeditor.com/projects/po_edit?id_language=37&per_page=50&id=332969) - thanks to [Nedelov Mónika](https://www.linkedin.com/in/monika-nedelov/)
- HU [![POEditor](https://img.shields.io/poeditor/progress/332969/hu?token=1aabd279b4b49d495134bbcff94c2199)](https://poeditor.com/projects/po_edit?id_language=65&per_page=50&id=332969) - (no contribution needed, I can manage it)
- PL [![POEditor](https://img.shields.io/poeditor/progress/332969/pl?token=1aabd279b4b49d495134bbcff94c2199)](https://poeditor.com/projects/po_edit?id_language=127&per_page=50&id=332969) - thanks to [Dominik Soczewka](https://www.linkedin.com/in/dominiksoczewka/)

## Bug reports

If you like to report a bug, you can do it on [GitLab](https://gitlab.com/zyxneo/typing/-/issues/new). You can follow the [guidelines of GitLab](https://about.gitlab.com/blog/2019/01/09/marker-io-gitlab-integration/) or similar.

## Coding contributions

If you want to add an issue or pull request, please ensure that the existing issues don't already cover your question or contribution. It is recommended to get in touch before you start coding.

## Releases / CI

The ideal way of releasing the software:

- Development happens in feature branches, or directly in dev branch. Many commits can be added and pushed without the need for deployment.
- Deploy to beta environment on each tag. Everything, which changes the way the app works, should be versioned. This method enforces versioning, and versioning enforces changelog. This hopefully leads to a more clear git history, and a more think-through structure.
- The state of master should reflect the state of the live application which the user sees. Merging into master should be deployed on the live server/environment.
