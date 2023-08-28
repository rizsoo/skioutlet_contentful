import React from 'react'
import './zero.css'
import { graphql } from "gatsby"
import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { SEO } from '../components/Seo';
import { PageContentLayout } from '../components/page-content-layout';

const PageTemplate = ({ data: { page, navbar, footer }, path }) => {

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true)
  }, [page])

  return (
    <>
      <Helmet>
        <title>{page.title}</title>
        <SEO title={page.title} description={"Skioutlet síszaküzlet"} />
      </Helmet>
      {isLoaded ?
        <PageContentLayout
          title={page.title}
          content={page.content}
          image={page.image}
          navbar={navbar}
          footer={footer}
          details={page}
          path={path}
        />
        :
        <div style={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <ThreeDots
            height="90"
            width="90"
            radius="9"
            color="#000000"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>}
    </>
  )
}

export const query = graphql`
query MyQuery($slug: String, $node_locale: String) {
  page: contentfulPage(slug: { eq: $slug }, node_locale: { eq: $node_locale }) {
        content {
          raw
          references {
            ... on ContentfulShopSection {
              __typename
              contentful_id
              title
            }
            ... on ContentfulNewsList {
              __typename
              contentful_id
              title
              news {
                shortContext {
                  shortContext
                }
                content {
                  raw
                }
                id
                createdAt
                contentful_id
                image {
                  url
                }
                slug
                title
              }
            }
         }  
        }
        contentful_id
        slug
        node_locale
        title
        image {
            url
        }
    }
    navbar: contentfulPageList(node_locale: {eq: $node_locale}, title: {eq: "navbar"}) {
      title
      node_locale
      contentful_id
      elements {
        title
        slug
        node_locale
        }
    }
    footer: contentfulPageList(node_locale: {eq: $node_locale}, title: {eq: "footer"}) {
      title
      node_locale
      contentful_id
      elements {
        title
        slug
        node_locale
        }
    }
}
`

export default PageTemplate

