const yaml = require("js-yaml");

const generateCatalogInfo = (props) => {
  const data = {
    apiVersion: "backstage.io/v1alpha1",
    kind: `${props.kind}`,
    metadata: {
      name: `${props.project.toLowerCase()}-component-${props.repository}`,
      description: `Generating catalog-instance.yaml for ${props.project} - ${props.repository}`,
    },
    spec: {
      type: "service",
      lifecycle: "production",
      owner: "guest",
      providesApis: [],
      consumesApis: [],
    },
  };

  const yamlData = yaml.dump(data);

  return yamlData;
};

module.exports = { generateCatalogInfo };
