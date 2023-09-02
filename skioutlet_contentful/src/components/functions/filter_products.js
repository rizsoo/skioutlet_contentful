function filterProducts(products, searchTerm) {

  function filteredSearchcode(arr, index, searchTerm) {
    // Get each word
    function filterIt(terms, arr) {
      if (null === terms && terms.lenght < 3) return arr;
      // let words = terms.match(/"[^"]+"|.+/g);
      let words = terms.split(" ");
      // console.log(words);
      words = words.map(val => val.replace(/\"/g, ""));

      return arr.filter((a) => {
        const v = Object.values(a);
        const f = JSON.stringify(v).toLowerCase();
        let result = words.every(val => f.includes(val))
        return result;
      });
    };
    // Filter by color
    const list = arr.map(e => e[index]).map((e, i, final) => final.indexOf(e) === i && i).filter(e => arr[e]).map(e => arr[e]);
    if (!searchTerm) {
      return list;
    } else {
      return filterIt(searchTerm, list);
    }
  }

  // Filtering by cat/brand/sex
  let brandList = filteredSearchcode([products], 'brand').filter(data => data.brand != undefined).map(data => data.brand.toLowerCase()).map(brand => brand.includes(" ") ? brand.split(" ").join("-") : brand).sort((a, b) => a.localeCompare(b));

  function filterCat1ByCat2(searchWord) {
    let result = filteredSearchcode([products], 'cat1').map(data => {
      if (data.cat2 === searchWord && data.cat1 != undefined && data.cat2 != undefined) {
        return String(data.cat1).toLowerCase()
      }
    }).sort((a, b) => a.localeCompare(b));
    return result.filter(el => el != undefined && !el.includes("minta"))
  }

  // Get each word
  let allCathegory = [...filterCat1ByCat2("Felszerelés"), ...filterCat1ByCat2("Ruházat"), ...brandList]

  function filterIt(terms, prod, size) {
    let words = terms.normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ");
    words = words.map(val => !val.includes("-") ? val.replace(/\"/g, "") : val.split("-").join(" ").replace(/\"/g, ""));
    const v = Object.values(prod);
    const brandName = prod.brand ? prod.brand.toLowerCase() : "";

    // Is it a cathergory name?
    const catName = prod.cat1 ? prod.cat1.toLowerCase() : "";
    let catNames = [brandName, catName];
    let isCat = words.some(el => allCathegory.includes(el)) ? words.some(el => catNames.some(cat => cat === el)) : true;

    // Does it have a size?
    // const sizeOfProduct = String(prod.size)
    // let isSize = size != "" ? size.some(el => el === sizeOfProduct) : true;

    const f = JSON.stringify(v).toLowerCase();
    let result = words.every(val => f.normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(val) && isCat)
    return result;
  };

  const filteredProducts = [products].filter(prod => {
    if (searchTerm === "" || filterIt(searchTerm, prod)) {
      return prod
    }
  });

  return filteredProducts
}

module.exports = filterProducts;