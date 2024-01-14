import React from 'react'
import './zero.css'
import { graphql } from "gatsby"
import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { SEO } from '../components/Seo';
import { PageContentLayout } from '../components/page-content-layout';
import { useSiteMetadata } from '../hooks/use-site-metadata';

const ProductTemplate = ({ data: { page, navbar, footer, footer2, products }, path, pageContext }) => {

    let product = pageContext.details
    console.log(product);

    const [isLoaded, setIsLoaded] = useState(false);

    const { title: defaultTitle, description: defaultDescription, image: MetaImage, siteUrl } = useSiteMetadata()

    useEffect(() => {
        setIsLoaded(true)
    }, [products])

    return (
        <>
            <Helmet>
                <title>{product.title}</title>
                <meta name="description" content={defaultDescription} />
                <meta name="image" content={product.image ? `https://img.skioutlet.hu/product_images/${product.brand.toLowerCase()}/${product.img}.jpg` : MetaImage} />
                <meta name="title" content={product.title} />
                <meta property="og:description" content={defaultDescription} />
                <meta property="og:image" content={product.image ? `https://img.skioutlet.hu/product_images/${product.brand.toLowerCase()}/${product.img}.jpg` : MetaImage} />
                <meta property="og:site_name" content={product.title} />
                <meta property="og:title" content={product.title} />
                <meta property="og:type" content="website" />
            </Helmet>
            {isLoaded ?
                <PageContentLayout
                    title={product.title}
                    content={page.content}
                    image={page.image}
                    navbar={navbar}
                    footer={footer}
                    footer2={footer2}
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

