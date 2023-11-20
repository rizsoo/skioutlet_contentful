import React from 'react'
import './zero.css'
import { graphql } from "gatsby"
import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { SEO } from '../components/Seo';
import { PageContentLayout } from '../components/page-content-layout';

const ProductTemplate = ({ data: { page, navbar, footer, products }, path, pageContext }) => {

    let product = pageContext.details

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true)
    }, [products])

    return (
        <>
            <Helmet>
                <title>{product.title}</title>
                <SEO title={product.title} description={"Skioutlet síszaküzlet"} />
            </Helmet>
            {isLoaded ?
                <PageContentLayout
                    title={product.title}
                    content={page.content}
                    image={page.image}
                    navbar={navbar}
                    footer={footer}
                    details={pageContext}
                    path={path}
                    product={product}
                    products={products}
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
query MyQuery($node_locale: String) {
  page: contentfulPage(slug: { eq: "product" }, node_locale: { eq: $node_locale }) {
        content {
          raw
          references {
            ... on ContentfulProductSection {
              __typename
              contentful_id
              title
              stock
              cathegory
              comment
              sku
              piece
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
    products: allCsvData {
        nodes {
            sku
            title
            img
            brand
            cat1
            cat2
            price
            saleprice
            isonsale
            stock
            size
            list {
                size
                stock
            }
        }
    }
}
`

export default ProductTemplate

