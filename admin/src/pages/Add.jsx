import React, { useState } from "react";
import { assets } from "../assets/admin_assets/assets.js";
import axios from 'axios';
import toast from "react-hot-toast";
// import backendUrl from "../App.jsx"


const backendUrl = import.meta.env.VITE_BACKEND_URL;
console.log(backendUrl);

const Add = ({token}) => {

  const [image1,setImage1] = useState(false);
  const [image2,setImage2] = useState(false);
  const [image3,setImage3] = useState(false);
  const [image4,setImage4] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Men');
  const [subCategory, setSubCategory] = useState('TopWear');
  const [bestseller, setBestSeller] = useState("false");
  const [sizes, setSizes] = useState([]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("category", category);
        formData.append("subCategory", subCategory);
        formData.append("bestSeller", bestseller);
        formData.append("sizes", JSON.stringify(sizes));

        // Append images if they exist
        image1 && formData.append("image1", image1);
        image2 && formData.append("image2", image2);
        image3 && formData.append("image3", image3);
        image4 && formData.append("image4", image4);

        // Make the POST request
        const response = await axios.post(backendUrl + "/api/product/add", formData, {
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQHdlYXJ0cmVuei5jb20iLCJwYXNzd29yZCI6ImFkbWluMTIzNCIsImlhdCI6MTcyODUzMjQxNSwiZXhwIjoxNzI4NTM2MDE1fQ.u4ISHIbOUMlKIlzKXdwIz1ZfioJ-vGH8qtYT6Mp5KDk`, // Token is directly displayed here
                'Content-Type': 'multipart/form-data', // Specify content type for FormData
            }
        });

        if(response.data.success) {
          toast.success ("product Added Successfully");
          setName('');
          setDescription("");
          setImage1(false);
          setImage2(false);
          setImage3(false);
          setImage4(false);
          setPrice('');
        } else {
          toast.error("Failed to add product");
        }

        console.log("Product added successfully: ", response.data);
    } catch (error) {
        console.error("Error adding product: ", error);
        toast.error("error.message")
    }
};


  return (
    <form className="flex flex-col w-full items-start gap-3" onSubmit={handleOnSubmit}>
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-3">
          <label htmlFor="image1">
            <img src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" className="w-20" />
            <input type="file" id="image1" hidden  onChange={(e)=>setImage1(e.target.files[0])}/>
          </label>
          <label htmlFor="image2">
            <img src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" className="w-20" />
            <input type="file" id="image2" hidden  onChange={(e)=>setImage2(e.target.files[0])}/>
          </label>
          <label htmlFor="image3">
            <img src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" className="w-20" />
            <input type="file" id="image3" hidden onChange={(e)=>setImage3(e.target.files[0])} />
          </label>
          <label htmlFor="image4">
            <img src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" className="w-20" />
            <input type="file" id="image4" hidden  onChange={(e)=>setImage4(e.target.files[0])}/>
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here"
          required
          onChange={(e)=> setName(e.target.value)}
          value={name}
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Write Content Area"
          required
          onChange={(e)=> setDescription(e.target.value)}
          value={description}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product Category</p>
          <select className="w-full px-3 py-2" onChange={(e)=> setCategory(e.target.value)} value={category}>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Sub Category</p>
          <select className="w-full px-3 py-2" onChange={(e)=> setSubCategory(e.target.value)} value={subCategory}>
            <option value="TopWear">TopWear</option>
            <option value="BottomWear">BottomWear</option>
            <option value="WinterWear">WinterWear</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Product Prize</p>
          <input
            type="Number"
            placeholder="25"
            className="w-full px-3 py-2 sm:w-[120px]"
            onChange={(e)=>setPrice(e.target.value)}
            value={price}
          />
        </div>
      </div>

      <div>
  <p className="mb-2">Product Sizes</p>
  <div className="flex gap-3">
    <div onClick={() => setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])}>
      <p className={`${sizes.includes("S") ? "bg-yellow-300" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>S</p>
    </div>

    <div onClick={() => setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])}>
      <p className={`${sizes.includes("M") ? "bg-yellow-300" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>M</p>
    </div>

    <div onClick={() => setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])}>
      <p className={`${sizes.includes("L") ? "bg-yellow-300" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>L</p>
    </div>

    <div onClick={() => setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])}>
      <p className={`${sizes.includes("XL") ? "bg-yellow-300" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XL</p>
    </div>

    <div onClick={() => setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev, "XXL"])}>
      <p className={`${sizes.includes("XXL") ? "bg-yellow-300" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XXL</p>
    </div>
  </div>
</div>


      <div className="flex gap-2 mt-3">
        <input type="checkbox" id="bestseller" onChange={()=> setBestSeller(prev => !prev)} checked={bestseller} />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to Bestseller
        </label>
      </div>

      <button
        type="submit"
        className="w-28 py-3 mt-4 bg-black text-white rounded-md"
      >
        Add
      </button>
    </form>
  );
};

export default Add;
