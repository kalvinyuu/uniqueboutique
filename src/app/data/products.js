export const products = [
    {
        id: 1,
	sku: "",
        name: "mens pjs",
        price: 3300,
        currency: "GBP",
        image: "productCatalouge/adult_pjs.jpg", // Corrected path
    },
    {
        id: 2,
	sku: "",
        name: "kids pjs",
        price: 1399,
        currency: "GBP",
        image: "productCatalouge/kids_pjs.jpg", // Corrected path
    },
];
console.log("Product data:", products);

// Example of using the image paths (replace this with your actual usage)
products.forEach(product => {
    const imagePath = product.image;
    console.log("Image path:", imagePath);

    // Your code using imagePath...
});

console.log("End of product processing");
