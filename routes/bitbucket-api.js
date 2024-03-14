// Export bitbucket-api routes to be used in app.js
const express = require("express");
const { getProjects } = require("../mocks/projects.js");
const { getRepositories } = require("../mocks/repositories.js");
const { generateCatalogInfo } = require("../mocks/backstage-generator.js");

const router = express.Router();

// projects
router.get("/api/bitbucket/projects", (req, res) => {
  const projects = getProjects();
  console.count("🔥 Getting Projects");

  res.json(projects);
});

// repositories
router.get("/api/bitbucket/projects/:project/repos", (req, res) => {
  const { project } = req.params;
  const repositories = getRepositories(project);

  console.count("🔥 Getting Repositories");

  res.json(repositories);
});

// repository raw file
router.get(
  "/api/bitbucket/projects/:project/repos/:repository/raw/:file",
  (req, res) => {
    const { repository, project, file } = req.params;
    console.log(`Generating raw file for ${repository}/${file}`);
    const catalogYaml = generateCatalogInfo({
      kind: "Component",
      project,
      repository,
    });

    console.count("🔥 Getting catalog.yml");

    res.setHeader("Content-Type", "application/x-yaml");
    res.send(catalogYaml);
  }
);

// repository
router.get("/api/bitbucket/projects/:project/repos/:repository", (req, res) => {
  const { project, repository } = req.params;

  res.json({ project, repository });
});

module.exports = router;
