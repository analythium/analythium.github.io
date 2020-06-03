import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: <>Build</>,
    imageUrl: 'img/undraw_abstract_x68e_build.svg',
    description: (
      <>
        Designing and building powerful data science applications is at the heart of what we do.<br /><a href="docs/build">See how we are doing it →</a>
      </>
    ),
  },
  {
    title: <>Operate</>,
    imageUrl: 'img/undraw_programmer_imem_operate.svg',
    description: (
      <>
        Deploying apps securely and operating at scale is no small feat.<br /><a href="docs/operate">Check out the technologies we develop →</a>
      </>
    ),
  },
  {
    title: <>Manage</>,
    imageUrl: 'img/undraw_personal_goals_edgd_manage.svg',
    description: (
      <>
        Apps are meant to be used to make decisions in the real world.<br /><a href="docs/manage">Browse some of our examples →</a>
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
      title={`Hello from ${siteConfig.title}`}
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
