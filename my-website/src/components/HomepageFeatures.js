import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Cybersecurity',
    Svg: require('../../static/img/security.svg').default,
    description: (
      <>
        Develop a purple team as a personal objective. 
        Red team and blue team must be understood as a whole.
      </>
    ),
  },
  {
    title: 'Investment',
    Svg: require('../../static/img/invest.svg').default,
    description: (
      <>
        Freedom is not achieved through knowledge alone.
        Long term, the stock market's a very good place to be.
      </>
    ),
  },
  {
    title: 'Languages',
    Svg: require('../../static/img/Languages.svg').default,
    description: (
      <>
        What is the sense of having all the knowledge 
        within reach if it cannot be understood?
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
