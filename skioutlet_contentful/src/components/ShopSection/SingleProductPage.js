import React from 'react'
import { useState, useEffect } from 'react';

import Papa from 'papaparse';
import SingleProductDisplay from './SingleProductDisplay';
import styled from 'styled-components';

import arrayMergeByKey from 'array-merge-by-key';

function Product({ state }) {
    const res = state.source.get(state.router.link)

    const [imgData, setImgData] = useState([])
    const [webarlista, setWebarlista] = useState([])

    const [theProduct, setTheProduct] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    const url = res.id;

    function getIMGData() {
        fetch("https://wp.skioutlet.hu/wp-content/uploads/2022/09/keresokod_utf8.csv")
            .then(res => res.url)
            .then((response) => {
                Papa.parse(response, {
                    skipEmptyLines: true,
                    encoding: "UTF-8",
                    download: true,
                    dynamicTyping: true,
                    header: true,
                    transformHeader: function (h, i) {
                        let header = ["sku", "img"]
                        h = header[i]
                        // console.log(h);
                        return h
                    },
                    complete: function (results) {
                        let data = results.data;
                        setImgData(data)
                    }
                })
            })
    }

    function getData2() {
        fetch("https://wp.skioutlet.hu/wp-content/uploads/2022/09/webarlista_utf8.csv")
            .then(res => res.url)
            .then((response) => {
                Papa.parse(response, {
                    skipEmptyLines: true,
                    delimiter: "\t",
                    encoding: "UTF-8",
                    download: true,
                    dynamicTyping: true,
                    header: true,
                    transformHeader: function (h, i) {
                        let header = ["sku", "title", "brand", "web", "cat1", "cat2", "price", "saleprice", "isonsale", "stock", "size"]
                        h = header[i]
                        // console.log(h);
                        return h
                    },
                    complete: function (results) {
                        let data = results.data.filter(prod => Number(prod.stock.split(",").shift()) > 0);
                        setWebarlista(data);
                        setIsLoaded(true)
                    }
                })
            })
    }

    useEffect(() => {
        getData2()
        getIMGData()
    }, [])

    let result = arrayMergeByKey("sku", imgData, webarlista).filter(el => String(el.img).toLowerCase() === url && el.title ? el : null)

    return (
        <div>
            <SingleProductDisplay result={result} theProduct={theProduct} />
        </div>
    )
}

export default Product