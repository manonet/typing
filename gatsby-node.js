/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

exports.onCreateWebpackConfig = ({ actions, loaders, stage }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /firebase/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
};

exports.createPages = ({ actions }) => {
  const { createRedirect } = actions;

  // redirect old app paths
  createRedirect({
    fromPath: `/index.html`,
    toPath: `/hu/`,
    redirectInBrowser: true,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/hu/gepiro_program/ingyenes_gepiras_oktato_program.html`,
    toPath: `/hu/typewriter/`,
    redirectInBrowser: true,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/hu/kapcsolat/szilagyi_balazs.html`,
    toPath: `/hu/contact/`,
    redirectInBrowser: true,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/hu/fejlesztes/fejlesztes_menete.html`,
    toPath: `/hu/faq`,
    redirectInBrowser: true,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/hu/tamogatas/anyagi_tamogatas.html`,
    toPath: `/hu/contribution`,
    redirectInBrowser: true,
    isPermanent: true,
  });
  // Temporary redirects
  createRedirect({
    fromPath: `/redirect_to_flash/index.html`,
    toPath: `/hu/`,
    redirectInBrowser: true,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/redirect_to_flash/gepiro_program/ingyenes_gepiras_oktato_program.html`,
    toPath: `/hu/`,
    redirectInBrowser: true,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/redirect_to_flash/fejlesztes/fejlesztes_menete.html`,
    toPath: `/hu/`,
    redirectInBrowser: true,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/redirect_to_flash/kapcsolat/szilagyi_balazs.html`,
    toPath: `/hu/contact/`,
    redirectInBrowser: true,
    isPermanent: true,
  });
};
