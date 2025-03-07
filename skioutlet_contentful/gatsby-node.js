const path = require("path");
const axios = require("axios");
const Papa = require("papaparse");
const arrayMergeByKey = require("array-merge-by-key");
const filteredSearchcode = require("./src/components/functions/filter_by_color");
const fs = require("fs");
const pathModule = require("path"); // Rename the imported path module

async function fetchCsvDataAndConvertToJson(url, header, delimeter) {
  try {
    const csvUrl = url;
    const response = await axios.get(csvUrl);
    const csvData = response.data;

    return new Promise((resolve) => {
      Papa.parse(csvData, {
        skipEmptyLines: true,
        delimiter: delimeter,
        encoding: "UTF-8",
        dynamicTyping: false,
        dontInfer: true,
        header: true,
        transformHeader: function (h, i) {
          h = header[i];
          return h;
        },
        complete: (result) => {
          let res = result.data;
          resolve(res);
        },
      });
    });
  } catch (error) {
    console.error("Error fetching or parsing CSV data:", error);
    return [];
  }
}

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    target: "node",
    resolve: {
      alias: {
        "@mui/styled-engine": "@mui/styled-engine-sc",
      },
    },
  });
};

// Function to create the CSV and save it in the `static` directory (accessible in Gatsby)
function createCSVFile(data) {
  const modifiedData = data.map((item) => {
    const modifiedItem = {};

    for (let key in item) {
      // Rename columns
      if (key === "sku") {
        modifiedItem["id"] = item[key]; // Change "sku" to "id"
      } else if (key === "saleprice") {
        modifiedItem["sale_price"] = item[key]; // Change "saleprice" to "sale_price"
      } else if (key === "cat1") {
        modifiedItem["google_product_category"] = item[key]; // Change "saleprice" to "sale_price"
      } else if (key === "web" || key === "cat2" || key === "list") {
        continue; // Remove "web", "cat2", and "list"
      } else if (
        item[key] !== undefined &&
        item[key] !== null &&
        item[key] !== ""
      ) {
        modifiedItem[key] = item[key]; // Keep other columns if they have valid values
      }
    }

    // Add the new "image_link" column (converted to lowercase)
    if (modifiedItem["brand"] && modifiedItem["img"]) {
      modifiedItem[
        "image_link"
      ] = `https://img.skioutlet.hu/product_images/${modifiedItem[
        "brand"
      ].toLowerCase()}/${modifiedItem["img"]}.jpg`;
    }

    // Add the new "link" column (converted to lowercase)
    if (modifiedItem["img"]) {
      modifiedItem[
        "link"
      ] = `https://skioutlet.hu/product/${modifiedItem["img"]}`;
    }

    // Add fixed description
    modifiedItem["description"] =
      "Üzletünk nem webáruház, így termékeink kizárólag szaküzletünkben vásárolhatóak meg!";

    // Add fixed availability status
    modifiedItem["availability"] = "in_stock";

    // Add availability date (current date in ISO 8601 format)
    modifiedItem["availability_date"] = new Date().toISOString();

    return modifiedItem;
  });

  const csvData = Papa.unparse(modifiedData); // Convert data to CSV format

  // Define the path where you want to save the CSV file
  const filePath = pathModule.join(__dirname, "static", "product_data.csv");

  // Write the CSV data to a file
  fs.writeFileSync(filePath, csvData, "utf8");

  console.log("CSV file has been created:", filePath);
}

// Create the GraphQL
exports.sourceNodes = async ({ actions }) => {
  const { createNode } = actions;

  // Fetch and convert CSV data to JSON
  const jsonData = await fetchCsvDataAndConvertToJson(
    "https://wp.skioutlet.hu/wp-content/uploads/2022/09/webarlista_utf8.csv",
    [
      "sku",
      "title",
      "brand",
      "web",
      "cat1",
      "cat2",
      "price",
      "saleprice",
      "isonsale",
      "stock",
      "size",
    ],
    "\t"
  );
  const fixedJsonData = jsonData.filter(
    (prod) => Number(prod.stock.split(",").shift()) > 0
  );
  const imageData = await fetchCsvDataAndConvertToJson(
    "https://wp.skioutlet.hu/wp-content/uploads/2022/09/keresokod_utf8.csv",
    ["sku", "img"],
    ""
  );
  let mergedData = filteredSearchcode(
    arrayMergeByKey("sku", imageData, fixedJsonData).filter((el) => el.title),
    "img"
  ).filter((el) => el.sku != undefined || el.sku != null);
  let singleData = arrayMergeByKey("sku", imageData, fixedJsonData)
    .filter((el) => el.title)
    .filter((el) => el.sku != undefined || el.sku != null);

  let result = mergedData.map((obj) => ({
    ...obj,
    list: singleData
      .filter((el) => el.img === obj.img)
      .map((el) => ({
        size: el.size,
        stock: el.stock,
      })),
  }));

  // Create a new GraphQL node for the JSON data
  result.forEach((data, index) => {
    createNode({
      ...data,
      id: `${index}`, // Use a unique ID for each node
      parent: null,
      children: [],
      internal: {
        type: "CsvData", // Specify the GraphQL type name for the node
        contentDigest: JSON.stringify(data),
      },
    });
  });
  createCSVFile(result);
};

// Create pages
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const { data } = await graphql(`
    {
      pages: allContentfulPage {
        nodes {
          slug
          node_locale
        }
      }
      news: allContentfulNews {
        nodes {
          slug
          node_locale
        }
      }
      products: allCsvData {
        nodes {
          sku
          img
          title
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
  `);

  // Simple Contentful pages
  data.pages.nodes.forEach((node) => {
    createPage({
      path:
        node.node_locale === "hu"
          ? `/${
              node.slug === "home"
                ? ``
                : !node.slug.includes("_") && `${node.slug}`
            }`
          : node.slug === "home"
          ? `/${node.node_locale}`
          : `/${node.node_locale}/${node.slug}`,
      component:
        node.slug === "shop"
          ? path.resolve(`src/templates/shop-template.js`)
          : path.resolve(`src/templates/page-template.js`),
      context: {
        slug: node.slug,
        node_locale: node.node_locale,
      },
    });
  });

  // Contentful news
  data.news.nodes.forEach((node) => {
    createPage({
      path:
        node.node_locale === "hu"
          ? `/${
              node.slug === "home"
                ? ``
                : !node.slug.includes("_") && `${node.slug}`
            }`
          : node.slug === "home"
          ? `/${node.node_locale}`
          : `/${node.node_locale}/${node.slug}`,
      component: path.resolve(`src/templates/news-template.js`),
      context: {
        slug: node.slug,
        node_locale: node.node_locale,
      },
    });
  });

  // Products hu pages
  data.products.nodes.forEach((node) => {
    createPage({
      path: `/product/${node.img}`,
      component: path.resolve(`src/templates/product-template.js`),
      context: {
        slug: `product/${node.img}`,
        node_locale: "hu",
        details: node,
      },
    });
  });

  // Products en pages
  data.products.nodes.forEach((node) => {
    createPage({
      path: `en/product/${node.img}`,
      component: path.resolve(`src/templates/product-template.js`),
      context: {
        slug: `product/${node.img}`,
        node_locale: "en",
        details: node,
      },
    });
  });

  // Shop page num pages HU
  Array.from({ length: 100 }, (v, k) => k + 1).forEach((node) => {
    createPage({
      path: `/shop/pagenum_${node}`,
      component: path.resolve(`src/templates/shop-template.js`),
      context: {
        slug: `/shop/pagenum_${node}`,
        node_locale: "hu",
      },
    });
  });
  // EN
  Array.from({ length: 100 }, (v, k) => k + 1).forEach((node) => {
    createPage({
      path: `/en/shop/pagenum_${node}`,
      component: path.resolve(`src/templates/shop-template.js`),
      context: {
        slug: `en/shop/pagenum_${node}`,
        node_locale: "en",
      },
    });
  });

  // Categories pages for SEO in HUN
  const categories = Array.from(
    new Set(data.products.nodes.map((el) => el.cat1))
  );
  categories.forEach((node) => {
    let correctSlug = node
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
    createPage({
      path: `/shop/${correctSlug}`,
      component: path.resolve(`src/templates/shop-template.js`),
      context: {
        slug: `/shop/${correctSlug}`,
        node_locale: "hu",
      },
    });
  });
  //EN
  categories.forEach((node) => {
    let correctSlug = node
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
    createPage({
      path: `en/shop/${correctSlug}`,
      component: path.resolve(`src/templates/shop-template.js`),
      context: {
        slug: `en/shop/${correctSlug}`,
        node_locale: "en",
      },
    });
  });
};
