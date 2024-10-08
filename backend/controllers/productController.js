

// Add product Function
const addProduct = (req, res) => {
  try {
    console.log("Body response:", req.body); // Log the request body
    console.log("Uploaded Files:", req.files); // Log the uploaded files
    console.log("Request Path:", req.path); // Log the request path

    // Destructure fields from request body
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

    // Check and access uploaded files from req.files
    const image1 = req.files?.image1 ? req.files.image1[0] : null;
    const image2 = req.files?.image2 ? req.files.image2[0] : null;
    const image3 = req.files?.image3 ? req.files.image3[0] : null;
    const image4 = req.files?.image4 ? req.files.image4[0] : null;

    console.log("Received Images:", { image1, image2, image3, image4 });
    console.log(name, description, price, category, subCategory, sizes, bestseller);
    console.log(image1, image2, image3, image4);

    // Return a response indicating success
    res.json({ success: true, message: "Product added successfully" });

  } catch (error) {
    console.log("Error:", error.message);
    res.json({ success: false, message: error.message });
  }
};


// List product Function
const listProducts = async (req, res) => {
  // Implementation here
};

// Remove product Function
const removeProduct = async (req, res) => {
  // Implementation here
};

// Single product info Function
const singleProduct = async (req, res) => {
  // Implementation here
};

export { addProduct, listProducts, removeProduct, singleProduct };
