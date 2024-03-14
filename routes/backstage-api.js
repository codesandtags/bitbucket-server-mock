const express = require("express");
const { getProjects } = require("../mocks/projects");
const { getRepositories } = require("../mocks/repositories");

const router = express.Router();

// Returns all paths for the catalog
router.get("/api/backstage/catalog", (req, res) => {
  const projects = getProjects();
  const catalog = [];

  for (const project of projects) {
    const repositories = getRepositories(project.key);
    const basePath = `http://localhost:3000/api/bitbucket/projects/${project.key}/repos/`;

    for (const repository of repositories) {
      const catalogPath = `${basePath}${repository.slug}/raw/catalog-info.yaml`;
      catalog.push(catalogPath);
    }
  }

  res.setHeader("Content-Type", "text/plain");
  res.send(catalog.join("\n- "));
});

module.exports = router;
