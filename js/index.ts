   'use strict'

    let shop: Shop;
    const shopForm = document.getElementById("id-shop-form")!;
    const btnShopSubmit = document.getElementById("id-shop-submit")!;
    const shopName = document.getElementById("id-shop-name")! as HTMLInputElement;
    const shopDesc = document.getElementById("id-shop-description")! as HTMLInputElement;
    const shopMaxPrice = document.getElementById("id-shop-max-price")! as HTMLInputElement;

    const productForm = document.getElementById("id-product-form")!;
    const btnProductSubmit = document.getElementById("id-product-submit")!;
    const productName = document.getElementById("id-product-name")! as HTMLInputElement;
    const productDesc = document.getElementById("id-product-description")! as HTMLInputElement;
    const productPrice = document.getElementById("id-product-price")! as HTMLInputElement;
    const productStock = document.getElementById("id-product-stock")! as HTMLInputElement;

    const btnFinalizar = document.getElementById("id-finalizar-submit")!;
    const products = document.getElementById("id-products");

    const table = document.getElementsByTagName("table")[0];
    const tbody = table.getElementsByTagName("tbody")[0];

    const validation = () => {

        const name = shopName.value;
        const desc = shopDesc.value;
        const maxPrice = parseFloat(shopMaxPrice.value)

        shopName.parentElement!.classList.remove('is-invalid');
        shopDesc.parentElement!.classList.remove('is-invalid');
        shopMaxPrice.parentElement!.classList.remove('is-invalid');

        if (name.length < 5)
            shopName.parentElement!.classList.add('is-invalid');

        if (desc.length < 5)
            shopDesc.parentElement!.classList.add('is-invalid');

        if (maxPrice < 10 || isNaN(maxPrice))
            shopMaxPrice.parentElement!.classList.add('is-invalid');

        const errors = document.querySelector("#id-shop-form .is-invalid");

        if (errors == null){
            shopForm.classList.add("hide");
            productForm.classList.remove("hide");
            shop = new Shop(name, desc, maxPrice);

            const row = tbody.insertRow(1);
            row.append(document.createElement("th"));
            const nameCell = row.insertCell();
            const descCell = row.insertCell();
            const maxPriceCell = row.insertCell();
            const deleteCell = row.insertCell();
            const btnDelete = document.createElement("button");
            btnDelete.innerText = "-";
            btnDelete.classList.add("bg-danger");
            nameCell.innerText = shop.name;
            descCell.innerText = shop.description;
            maxPriceCell.innerText = "Precio máximo: " + shop.maxPrice.toString() + "€";

            productForm.classList.remove("hide");
            table.classList.remove("hide")
        }
            
    }

    // Disable submit event
	shopForm.addEventListener('submit', function (event) {
		event.preventDefault()
		event.stopPropagation()
	}, false);

    const repaintProducts = () => {
        while (table.rows.length > 4)
            table.deleteRow(3);

        shop.products.forEach((v, i) => {
            const row = tbody.insertRow();
            const th = document.createElement("th");
            th.innerText = shop.products.length.toString();
            row.append(th);
            const nameCell = row.insertCell();
            const descCell = row.insertCell();
            const priceCell = row.insertCell();
            const stockCell = row.insertCell();
            const deleteCell = row.insertCell();
            const btnDelete = document.createElement("button");
            btnDelete.innerText = "-";
            btnDelete.classList.add("bg-danger");
            btnDelete.dataset.index = i.toString();
            btnDelete.addEventListener( "click", (ev) => {
                const element = ev.target as HTMLButtonElement;
                const index = parseInt(element.dataset.index!);
                shop.products.splice(index, 1);
                repaintProducts()
            })
            deleteCell.append(btnDelete);
            nameCell.innerText = v.name;
            descCell.innerText = v.description;
            priceCell.innerText = "Precio: " + v.price.toString() + "€";
            stockCell.innerText = "Stock: " + v.stock.toString()
        })
    }

    const productValidation = () => {

        const name = productName.value;
        const desc = productDesc.value;
        const price = parseFloat(productPrice.value);
        let stock = parseFloat(productStock.value);

        if (isNaN(stock))
            stock = 0;

        productName.parentElement!.classList.remove('is-invalid');
        productDesc.parentElement!.classList.remove('is-invalid');
        productPrice.parentElement!.classList.remove('is-invalid');
        productStock.parentElement!.classList.remove('is-invalid');

        if (name.length < 5)
            productName.parentElement!.classList.add('is-invalid');

        if (desc.length < 5)
            productDesc.parentElement!.classList.add('is-invalid');

        if (price > shop.maxPrice) {
            const msg = productPrice.parentElement!.getElementsByTagName("p")[0];
            msg!.innerText = "El precio no debe ser mayor que " + shop.maxPrice;
            productPrice.parentElement!.classList.add('is-invalid');
        }

        if (price <= 0 || isNaN(price)) {
            const msg = productPrice.parentElement!.getElementsByTagName("p")[0];
            msg!.innerText = "El precio debe ser mayor que 0";
            productPrice.parentElement!.classList.add('is-invalid');
        }

        if (stock < 0)
            productStock.parentElement!.classList.add('is-invalid');

        const errors = document.querySelector("#id-product-form .is-invalid");

        if (errors == null){
            const product = new Product(name, desc, price, stock);
            shop.addProduct(product);
            productName.value = "";
            productDesc.value = "";
            productPrice.value = "";
            productStock.value = "";

            const row = tbody.insertRow();
            const th = document.createElement("th");
            th.innerText = shop.products.length.toString();
            row.append(th);
            const nameCell = row.insertCell();
            const descCell = row.insertCell();
            const priceCell = row.insertCell();
            const stockCell = row.insertCell();
            const deleteCell = row.insertCell();
            const btnDelete = document.createElement("button");
            btnDelete.innerText = "-";
            btnDelete.classList.add("bg-danger");
            btnDelete.dataset.index = (shop.products.length - 1).toString();
            btnDelete.addEventListener( "click", (ev) => {
                const element = ev.target as HTMLButtonElement;
                const index = parseInt(element.dataset.index!);
                shop.products.splice(index, 1);
                repaintProducts()
            })
            deleteCell.append(btnDelete);
            nameCell.innerText = name;
            descCell.innerText = desc;
            priceCell.innerText = "Precio: " + price.toString() + "€";
            stockCell.innerText = "Stock: " + stock.toString()
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
        shopName.value = "";
        shopDesc.value = "";
        shopMaxPrice.value = "";

        productName.value = "";
        productDesc.value = "";
        productPrice.value = "";
        productStock.value = "";

        while (table.rows.length > 4)
            table.deleteRow(3); // Products

        table.deleteRow(2); // Shop

        shopForm.classList.remove("hide");
        productForm.classList.add("hide");
        table.classList.add("hide")
    })

    