import React from 'react'
import './zero.css'
import { graphql } from "gatsby"
import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { SEO } from '../components/Seo';
import { PageContentLayout } from '../components/page-content-layout';
import { useSiteMetadata } from '../hooks/use-site-metadata';

const NewsTemplate = ({ data: { news, navbar, footer, footer2 }, path }) => {

    const [isLoaded, setIsLoaded] = useState(false);

    const { title: defaultTitle, description: defaultDescription, image: MetaImage, siteUrl } = useSiteMetadata()

    useEffect(() => {
        setIsLoaded(true)
    }, [news])

    return (
        <>
            <Helmet>
                <title>{news.title}</title>
                <meta name="description" content={news.short? news.short : defaultDescription} />
                <meta name="image" content={news.image ? news.image.url : MetaImage} />
                <meta name="title" content={news.title} />
                <meta property="og:description" content={news.short? news.short : defaultDescription} />
                <meta property="og:image" content={news.image ? news.image.url : MetaImage} />
                <meta property="og:site_name" content={news.title} />
                <meta property="og:title" content={news.title} />
                <meta property="og:type" content="website" />
            </Helmet>
            {isLoaded ?
                <PageContentLayout
                    title={news.title}
                    content={news.content}
                    image={news.image}
                    navbar={navbar}
                    footer={footer}
                    footer2={footer2}
                    details={news}
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
  news: contentfulNews(slug: { eq: $slug }, node_locale: { eq: $node_locale }) {
        content {
          raw
          
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
    footer2: contentfulPageList(node_locale: {eq: $node_locale}, title: {eq: "footer2"}) {
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

export default NewsTemplate

