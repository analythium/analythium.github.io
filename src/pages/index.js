import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: <>R and Shiny</>,
    imageUrl: 'img/undraw_personal_goals_edgd_manage.svg',
    description: (
      <>
        R is the language of statistical computing, Shiny is the fastest way to build interactive data science applications.<br /><a href="docs/impact">Read more →</a>
      </>
    ),
  },
  {
    title: <>Containers</>,
    imageUrl: 'img/undraw_abstract_x68e_build.svg',
    description: (
      <>
        Containers provide portability, consistency, and are used for packaging, deploying, and running cloud-native data science applications.<br /><a href="docs/development">Read more →</a>
      </>
    ),
  },
  {
    title: <>ShinyProxy</>,
    imageUrl: 'img/undraw_programmer_imem_operate.svg',
    description: (
      <>
        Run data science applications with no limit on concurrent usage, add security, authentication, and authorization.<br /><a href="docs/operations">Read more →</a>
      </>
    ),
  },
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={classnames('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Rock solid and open source analytics at your service <head />">
      <header className={classnames('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={classnames(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/')}>
              Get started →
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
