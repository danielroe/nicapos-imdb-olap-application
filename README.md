# [OLAP Application][website] &middot; [![GitHub license]](./LICENSE) ![CI Action]

This project provides a web-based OLAP (Online Analytical Processing) application that helps the movie industry to gain insights and make data-driven decisions based on an [IMDB dataset](https://relational.fit.cvut.cz/dataset/IMDb). The application enables users to view dashboards that display visual diagrams and charts, using various analytical operations such as roll-up, drill-down, slice, dice, and pivot.

## Installation

The first step will be to clone the repo

```shell
git clone https://github.com/nicapos/ADVDB-MCO1.git
```

### For development

The requirements are:

- [Node.js]

Install the dependencies
```shell
npm ci
```

## Environment Variables

To run this project, create a `.env` file in the root directory and add the following environment variables:

| Variable | Description             | Default |
|----------|-------------------------|---------|
| SITE_URL | The url of your website | ""      |
| MYSQL_HOST      | MySQL connection hostname | "localhost" |
| MYSQL_PORT      | MySQL connection port     | 3306        |
| MYSQL_DATABASE  | MySQL connection selected database | "mydb" |
| MYSQL_USER      | MySQL connection username | "root"      |
| MYSQL_PASSWORD  | MySQL connection password | ""          |

## Usage

In order to start the website, you will need to run the NPM scripts that are available in the package.json file,
using `npm run`. Here are the most important ones:

- **`dev`**: Starts the development server in http://localhost:3000.
- **`build`**: Builds your application for production. The output folder is `.output`.
- **`preview`**: Previews the production build from `.output` locally.
- **`test`**: Runs the unit tests using [Vitest].
- **`lint`**: Lints the project using [ESLint].

## License

Distributed under the MIT License. See [LICENSE](./LICENSE) for more information.

<!-- Packages links -->

[eslint]: https://eslint.org
[node.js]: https://nodejs.org/en/
[vitest]: https://vitest.dev

<!-- Repository links -->

[website]: https://github.com/nicapos/ADVDB-MCO1

<!-- Shields.io links -->

[github license]: https://img.shields.io/badge/license-MIT-blue.svg
[ci action]: https://github.com/nicapos/ADVDB-MCO1/actions/workflows/ci.yaml/badge.svg
