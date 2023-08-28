import React from 'react'
import './zero.css'
import { graphql } from "gatsby"
import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { SEO } from '../components/Seo';
import { PageContentLayout } from '../components/page-content-layout';

const NewsTemplate = ({ data: { news, navbar, footer }, path }) => {
    console.log(news);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true)
    }, [news])

    return (
        <>
            <Helmet>
                <title>{news.title}</title>
                <SEO title={news.title} description={"Skioutlet síszaküzlet"} />
            </Helmet>
            {isLoaded ?
                <PageContentLayout
                    title={news.title}
                    content={news.content}
                    image={news.image}
                    navbar={navbar}
                    footer={footer}
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
}
`

export default NewsTemplate

