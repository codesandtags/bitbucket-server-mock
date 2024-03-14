# Bitbucket Server Mock for testing

This is a mock server for Bitbucket Server. It is intended to be used for testing purposes only.

The docker-compose supports:

- Bitbucket Server Mocked app
- Prometheus
- Grafana

**NOTE**: This server is not intended to be used in a production environment.

## Grafana setup

The Grafana server is available at `http://localhost:3001`. The default credentials are `admin`/`secret`.

The Prometheus server is available at `http://localhost:9090`.

The Bitbucket Server Mocked app is available at `http://localhost:3000`.

To create the dashboard on Grafana, you need to create a new data source with the following settings:

- Name: `Prometheus`
- Type: `Prometheus`
- URL: `http://prometheus:9090`
