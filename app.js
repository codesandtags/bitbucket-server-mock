const express = require("express");
const promClient = require("prom-client");

const app = express();
const port = 3000;

// Create a Registry to register the metrics
const register = new promClient.Registry();

// Automatically collect default metrics. The default metrics include Node.js-specific metrics like event loop lag, active handles, and more.
promClient.collectDefaultMetrics({ register });

// Define custom HTTP request counter
const httpRequestCounter = new promClient.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "path", "status"],
  registers: [register], // Register the metric
});

// Define custom metrics if needed
const httpRequestDurationMicroseconds = new promClient.Histogram({
  name: "http_request_duration_ms",
  help: "Duration of HTTP requests in ms",
  labelNames: ["method", "route", "code"],
  buckets: [0.1, 5, 15, 50, 100, 500],
});

// Add custom metrics to the registry
register.registerMetric(httpRequestDurationMicroseconds);
register.registerMetric(httpRequestCounter);

// Middleware to count HTTP requests
app.use((req, res, next) => {
  res.on("finish", () => {
    // Increment counter on response finish, and label the counter with method, path, and response status code
    httpRequestCounter.inc({
      method: req.method,
      path: req.route ? req.route.path : req.path, // Use req.route.path if available, else req.path
      status: res.statusCode,
    });
  });
  next();
});

// Middleware to collect metrics for each request
app.use((req, res, next) => {
  const responseTimeInMs = Date.now();

  res.on("finish", () => {
    httpRequestDurationMicroseconds
      .labels(req.method, req.path, res.statusCode)
      .observe(Date.now() - responseTimeInMs);
  });

  next();
});

// Define your routes here
// Example route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Metrics endpoint
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

// Add the bitbucket-api routes
app.use(require("./routes/bitbucket-api"));
app.use(require("./routes/backstage-api"));

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
