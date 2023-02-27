# [OLAP Application][repository]

This project provides a web-based OLAP (Online Analytical Processing) application that helps the movie industry to gain insights and make data-driven decisions based on an [IMDB dataset](https://relational.fit.cvut.cz/dataset/IMDb). The application enables users to view dashboards that display visual diagrams and charts, using various analytical operations such as roll-up, drill-down, slice, dice, and pivot.

## Setup locally

1. Install the dependencies (requires [Node.js])
```shell
npm ci
```

2. To run this project, create a `.env` file in the root directory and add the following environment variables to connect to your data warehouse:

| Variable | Description             | Default |
|----------|-------------------------|---------|
| MYSQL_HOST      | MySQL connection hostname | "localhost" |
| MYSQL_PORT      | MySQL connection port     | 3306        |
| MYSQL_DATABASE  | MySQL connection selected database | "defaultdb" |
| MYSQL_USER      | MySQL connection username | "root"      |
| MYSQL_PASSWORD  | MySQL connection password | ""          |

3. In order to start the development server, you will need to run the following script:
```shell
npm run dev
```

4. Go to http://localhost:3000 to access the website.

## License

Distributed under the MIT License. See [LICENSE](./LICENSE) for more information.

<!-- Links -->
[node.js]: https://nodejs.org/en/
[IMDB dataset]: https://relational.fit.cvut.cz/dataset/IMDb
[repository]: https://github.com/nicapos/ADVDB-MCO1