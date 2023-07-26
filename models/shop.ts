class Shop {
    name: string;
    description: string;
    maxPrice: number;
    products: Product[] = new Array();
    
    constructor(name: string, description: string, maxPrice: number){
        this.name = name;
        this.description = description;
        this.maxPrice = maxPrice;
    }
    
    addProduct(product: Product): void{
        this.products.push(product);
    }
}