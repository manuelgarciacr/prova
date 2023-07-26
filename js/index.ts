//(function () {
    
    'use strict'
    let shop: Shop;
    const shopForm = document.getElementById("id-shop-form")!;
    const btnShopSubmit = document.getElementById("id-shop-submit")!;
    const shopName = document.getElementById("id-shop-name")! as HTMLInputElement;
    const description = document.getElementById("id-shop-description")! as HTMLInputElement;
    const maxPrice = document.getElementById("id-shop-max-price")! as HTMLInputElement;

    const productForm = document.getElementById("id-product-form")!;
    const btnProductSubmit = document.getElementById("id-product-submit")!;
    const productName = document.getElementById("id-product-name")! as HTMLInputElement;
    const productDescription = document.getElementById("id-product-description")! as HTMLInputElement;
    const productPrice = document.getElementById("id-product-price")! as HTMLInputElement;
    const productStock = document.getElementById("id-product-stock")! as HTMLInputElement;

    const btnFinalizar = document.getElementById("id-finalizar-submit")!;
    const products = document.getElementById("id-products");

    const validation = () => {

        shopName.parentElement!.classList.remove('is-invalid');
        description.parentElement!.classList.remove('is-invalid');
        maxPrice.parentElement!.classList.remove('is-invalid');

        if (shopName.value.length < 5)
            shopName.parentElement!.classList.add('is-invalid');
        if (description.value.length < 5)
            description.parentElement!.classList.add('is-invalid');
        if ((maxPrice.value as unknown as number) < 10)
            maxPrice.parentElement!.classList.add('is-invalid');

        const errors = document.querySelector("#id-shop-form .is-invalid");
        const setted = shopName.value.length && description.value.length && maxPrice.value;
        if (errors == null && setted){
            shopName.disabled = true;
            description.disabled = true;
            maxPrice.disabled = true;
            btnShopSubmit?.classList.add("hide");
            productForm.classList.remove("d-none")
            shop = new Shop(shopName.value, description.value, maxPrice.value as unknown as number)
        }
            
    }

    // Disable submit event
	shopForm.addEventListener('submit', function (event) {
		event.preventDefault()
		event.stopPropagation()
	}, false);

    const productValidation = () => {

        productName.parentElement!.classList.remove('is-invalid');
        productDescription.parentElement!.classList.remove('is-invalid');
        productPrice.parentElement!.classList.remove('is-invalid');

        if (productName.value.length < 5)
            productName.parentElement!.classList.add('is-invalid');
        if (productDescription.value.length < 5)
            productDescription.parentElement!.classList.add('is-invalid');
        const preu: number = parseFloat(productPrice.value);
        
        if (preu > shop.maxPrice) {
            const msg = productPrice.parentElement!.getElementsByTagName("p")[0];
            msg!.innerText = "El precio debe ser máximo de " + shop.maxPrice;
            productPrice.parentElement!.classList.add('is-invalid');
        }
        const errors = document.querySelector("#id-product-form .is-invalid");
        const setted = productName.value.length && productDescription.value.length && productPrice.value;

        if (errors == null && setted){
            const product = new Product(productName.value, productDescription.value, productPrice.value as unknown as number
                , productStock.value as unknown as number);
            shop.addProduct(product);
            productName.value = "";
            productDescription.value = "";
            productPrice.value = "";
            productStock.value = "";
        }
            
    }

    // Disable submit event
	productForm.addEventListener('submit', function (event) {
		event.preventDefault()
		event.stopPropagation()
	}, false);

    btnShopSubmit!.addEventListener("click", () => {
        validation()
    })

    btnProductSubmit!.addEventListener("click", () => {
        productValidation()
    })

    btnFinalizar!.addEventListener("click", () => {
        btnProductSubmit.classList.add("hide");
        productForm.classList.add("hide");
        products!.classList.remove("d-none");
        const productsDiv = products?.getElementsByTagName("div")[0];
        
        shop.products.forEach(v => {
            const div =document.createElement("div");
            const span = document.createElement("span");
            productsDiv!.innerHTML = productsDiv!.innerHTML 
                + "<div class='row'><span class='col-3'>"+ v.name+"</span>" 
                + "<span class='col-3'>"+ v.description+"</span>" 
                + "<span class='col-3'>"+ v.price +"</span>" 
                + "<span class='col-3'>"+ v.stock+"</span></div>" 
        })
    })

//})()
    