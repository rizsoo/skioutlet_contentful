import React from 'react'
import styled from 'styled-components'

import { Navbar } from './Navbar'
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { Footer } from './Footer'
import { ShopSection } from '../components/ShopSection/ShopSection';
import SingleProductPage from './ShopSection/SingleProductPage'
import NewsList from './NewsList/NewsList'
import HomepageSection from './HomepageSection/HomepageSection'
import { SupportersSection } from './SupportersSection/SupportersSection'

export const PageContentLayout = ({ title, content, navbar, footer, details, path, products, product, image }) => {

    const options = {
        renderNode: {
            [BLOCKS.EMBEDDED_ASSET]: (node) => {
                let link = node.data.target.description;
                if (link) {
                    return <a href={link} target={link.includes("http") && "_blank"} rel="noreferrer"><img src={node.data.target.file.url} alt="" /></a>
                } else return <img src={node.data.target.file.url} alt="" />
            },
            [INLINES.HYPERLINK]: (node) => {
                let link = node.data.uri
                return <a href={link} target={link.includes("http") && "_blank"} rel="noreferrer">{node.content[0].value}</a>
            },
            [BLOCKS.EMBEDDED_ENTRY]: (node) => {
                let data = node.data.target
                switch (data && data.__typename) {
                    case "ContentfulShopSection":
                        return (
                            <ShopSection
                                props={data}
                                lang={details}
                                slug={path}
                                products={products}
                            />
                        )
                    case "ContentfulProductSection":
                        return (
                            <SingleProductPage
                                props={data}
                                lang={details}
                                slug={path}
                                product={product}
                                products={products}
                            />
                        )
                    case "ContentfulNewsList":
                        return (
                            <NewsList
                                props={data.news}
                                lang={details}
                                slug={path}
                            />
                        )
                    case "ContentfulHomepageSection":
                        return (
                            <HomepageSection
                                props={data.news}
                                lang={details}
                                products={products}
                                slug={path}
                            />
                        )
                    case "ContentfulSupportersSection":
                        return (
                            <SupportersSection
                                props={data}
                                lang={details}
                            />
                        )
                    default:
                        return null
                }
            }
        }
    }

    const output = content && renderRichText(content, options)

    return (
        <Page>
            <Navbar navbar={navbar} lang={details} />
            <div style={{ minHeight: "calc(100vh - 421px)" }}>
                <PageContent>
                    <Content>
                        {image && (details.slug !== "home") ? <CoverImg src={image.url} /> : null}
                        {((details.slug !== "home") && (details.slug !== "shop") && (details.slug !== "versenyunk") && (!details.slug.includes("product"))) && <PageTitle isHome={details.slug}>{title}</PageTitle>}
                        {output}
                    </Content>
                </PageContent>
            </div>
            <Footer footer={footer} lang={details} />
        </Page>
    )
}

export const Page = styled.div`

`

export const PageTitle = styled.h2`
    margin: 10px auto;
    padding: 9px 13px 13px 13px;
    background-color: #f1f1f1;
    max-width: 940px;
    font-size: 20px;
    font-weight: 500;
    color: black;
    @media (max-width: 800px) {
        font-size: 20px;
        text-align: left;
    }
`
export const CoverImg = styled.img`
    max-height: 350px;
    object-fit: cover;
    object-position: 0 -80px;
    width: 100%;
    @media (max-width: 650px) {
        margin-top: 5px;
        object-position: center;
    }
`
export const Content = styled.div`
    width: 100%;
    max-width: 940px;
    margin: 0 auto;
    background-color: white;
    color: black;
    padding: 0px;
    a {
        color: #ed2123;
    }
`
export const PageContent = styled.div`
    max-width: 1300px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    gap: 20px;
    color: black;
    @media (max-width: 650px) {
        flex-direction: column;
        padding: 0 15px;
    }
`

export const Paragraph = styled.p`
    margin-bottom: 12px;
    b {
        font-weight: 600;
    }
`


