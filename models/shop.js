"use strict";
class Shop {
    constructor(name, description, maxPrice) {
        this.products = new Array();
        this.name = name;
        this.description = description;
        this.maxPrice = maxPrice;
    }
    addProduct(product) {
        this.products.push(product);
    }
}
