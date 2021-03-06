import React from 'react';
import {MDXProvider} from '@mdx-js/react';

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import renderRoutes from '@docusaurus/renderRoutes';
import Layout from '@theme/Layout';
import DocItem from '@theme/DocItem';
import DocSidebar from '@theme/DocSidebar';
import MDXComponents from '@theme/MDXComponents';
import NotFound from '@theme/NotFound';
import {matchPath} from '@docusaurus/router';

import Link from '@docusaurus/Link';
import Navbar from '@theme/Navbar';

import styles from './styles.module.css';

function DocPage(props) {
  const {route: baseRoute, docsMetadata, location, content} = props;
  const {
    permalinkToSidebar,
    docsSidebars,
    version,
    isHomePage,
    homePagePath,
  } = docsMetadata;

  // Get case-sensitive route such as it is defined in the sidebar.
  const currentRoute = !isHomePage
    ? baseRoute.routes.find((route) => {
        return matchPath(location.pathname, route);
      }) || {}
    : {};

  const sidebar = isHomePage
    ? content.metadata.sidebar
    : permalinkToSidebar[currentRoute.path];
  const {
    siteConfig: {themeConfig: {sidebarCollapsible = true} = {}} = {},
    isClient,
  } = useDocusaurusContext();

  if (!isHomePage && Object.keys(currentRoute).length === 0) {
    return <NotFound {...props} />;
  }

  return (
    <Layout version={version} key={isClient}>
      <div id="docs" className={styles.docPage}>
        <div id="sidebar">      
          {sidebar && (
            <div className={styles.docSidebarContainer}>

		  <div align="center" id="logo"><a href="https://joern.io"><img width="40%" src="/img/logo.svg"/></a></div>
	      
                <DocSidebar
                docsSidebars={docsSidebars}
                path={isHomePage ? homePagePath : currentRoute.path}
                sidebar={sidebar}
                sidebarCollapsible={sidebarCollapsible}
              />
            </div>
          )}
        </div>

        <div id="content-wrapper">
          <header>
            <Navbar />
          </header>

          <div className={styles.docPage}>
            <main className={styles.docMainContainer}>
              <MDXProvider components={MDXComponents}>
                {isHomePage ? (
                  <DocItem content={content} />
                ) : (
                  renderRoutes(baseRoute.routes)
                )}
              </MDXProvider>
            </main>
          </div>
        </div>

        <div id="right-spacer"></div>
      </div>
    </Layout>
  );
}

export default DocPage;
