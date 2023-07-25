import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import axios from "axios";

export const Parse = () => {
    const [jsonData, setJsonData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const csvUrl = "https://wp.skioutlet.hu/wp-content/uploads/2022/09/webarlista_utf8.csv";
                const response = await axios.get(csvUrl);
                const csvData = response.data;

                // Parse CSV data into JSON using PapaParse
                Papa.parse(csvData, {
                    skipEmptyLines: true,
                    delimiter: "\t",
                    // download: true,
                    dontInfer: true,
                    dynamicTyping: true,
                    header: true,
                    transformHeader: function (h, i) {
                        let header = ["sku", "title", "brand", "", "cat1", "cat2", "price", "saleprice", "isonsale", "stock", "size"]
                        h = header[i]
                        return h
                    },
                    complete: (result) => {
                        let finalData = result.data.filter(prod => Number(prod.stock.split(",").shift()) > 0);

                        setJsonData(finalData);
                    },
                });
            } catch (error) {
                console.error("Error fetching or parsing CSV data:", error);
            }
        };

        fetchData();
    }, []);


    return console.log(jsonData);
}
