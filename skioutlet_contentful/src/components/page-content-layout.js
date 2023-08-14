import React from 'react'
import styled from 'styled-components'

import { Navbar } from './Navbar'
import { Localization } from './Localization'
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { Footer } from './Footer'
import { ShopSection } from '../components/ShopSection/ShopSection';
import SingleProductPage from './ShopSection/SingleProductPage'
import { Parse } from '../../parse'


export const PageContentLayout = ({ title, content, navbar, footer, details, path, products, product }) => {
    console.log(details);
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
                    default:
                        return null
                }
            }
        }
    }

    const output = content && renderRichText(content, options)

    return (
        <div>
            <Navbar navbar={navbar} lang={details} />
            <div style={{ minHeight: "calc(100vh - 468px)" }}>
                {((details.slug !== "home") && (details.slug !== "shop") && (!details.slug.includes("product"))) && <PageTitle isHome={details.slug}>{title}</PageTitle>}
                <PageContent>
                    <Content>
                        {output}
                    </Content>
                </PageContent>
            </div>
            <Footer footer={footer} lang={details} />
            <Localization data={details} path={path} />
        </div>
    )
}

export const PageTitle = styled.h2`
    margin: 10px auto;
    padding: 9px 13px 13px 13px;
    background-color: #f1f1f1;
    max-width: 900px;
    font-size: 25px;
    font-weight: 300;
    color: black;
    @media (max-width: 800px) {
        font-size: 35px;
        text-align: left;
    }
`
export const CoverImg = styled.img`
    max-height: 300px;
    object-fit: cover;
    width: 100%;
    margin-bottom: 10px;
`
export const Content = styled.div`
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    background-color: white;
    color: black;
    padding: 10px 20px;
    a {
        color: #279BDE;
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
        padding: 0 20px;
    }
`

export const Paragraph = styled.p`
    margin-bottom: 12px;
    b {
        font-weight: 600;
    }
`


