const { getProjects } = require("./projects");

const getRepositories = (project) => {
  const projects = getProjects();

  if (!projects.find((p) => p.key === project)) {
    throw new Error("Project not found");
  }

  // Generates a number of repositories using the
  // following structure
  // {
  //     project: {
  //         key: "QEWASO",
  //     },
  //     slug: "repo-1",
  //     description: "This is repository number 1 for project QEWASO",
  //     links: {
  //         self: [{
  //             href: "http://localhost:3000/api/bitbucket/projects/QEWASO/repos/repo-1"
  //         }]
  //     }
  // },
  const repositories = [];

  for (let i = 1; i <= 10; i++) {
    repositories.push({
      project: {
        key: project,
      },
      slug: `repo-${i}`,
      description: `This is repository number ${i} for project ${project}`,
      links: {
        self: [
          {
            href: `http://localhost:3000/api/bitbucket/projects/${project}/repos/repo-${i}`,
          },
        ],
      },
    });
  }

  return repositories;
};

module.exports = { getRepositories };
