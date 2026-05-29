import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Heading from '@theme/Heading'
import Layout from '@theme/Layout'
import clsx from 'clsx'
import { useEffect, type ReactNode } from 'react'
import styles from './index.module.css'

export default function Home(): ReactNode {
  // Fallback in case redirection plugin does not work:
  useEffect(() => { window.location.replace('/blog') }, [])
  // Graceful UI fallback in case none of the redirection strategies work:
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout
      title={siteConfig.title}
      description={siteConfig.tagline}
    >
      <header
        className={clsx('hero hero--primary', styles.heroBanner)}
        style={{ display: 'none' }}
      >
        <div className="container">
          <Heading as="h1" className="hero__title">
            {siteConfig.title}
          </Heading>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className="button button--secondary button--lg"
              to="/blog">
              Start reading
            </Link>
          </div>
        </div>
      </header>
      {/* <main>
        <></>
      </main> */}
    </Layout>
  )
}
