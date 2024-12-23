import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGetSingleProductQuery, useUpdateProductMutation } from "../redux/features/api/productApi";
import Container from "../../Layout/Container/Container";

const EditProduct = () => {
    const { id } = useParams();
    console.log(id)
    const { data: product, isLoading, isError } = useGetSingleProductQuery(id);
    const [updateProduct] = useUpdateProductMutation(id);

    const [name, setName] = useState("");
    const [img, setImg] = useState("");
    const [brand, setBrand] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("")

    // Populate the fields when the product data is available
    useEffect(() => {
        if (product) {
            setName(product.name || "");
            setImg(product.img || "");
            setBrand(product.brand || "");
            setPrice(product.price || "");
            setCategory(product.category || "");
        }
    }, [product]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        updateProduct({
            id,
            updatedProduct: {
                name, img, brand, price,category
            }
        })
        resetFormData()
    };

    const resetFormData = () => {
        setName("");
        setImg(""),
        setBrand(""),
        setPrice("")
        setCategory("")
    }

    if (isLoading) return <div className="ms-36">Loading....</div>;

    if (isError) return <p>Product not found or an error occurred.</p>;

    return (
        <Container>
             <div className="max-w-xl mx-auto p-8 shadow-lg bg-white rounded-lg mt-10">
            <h2 className="text-2xl font-semibold text-center mb-6">Edit Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input input-bordered w-full"
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Image Link</span>
                    </label>
                    <input
                        type="text"
                        value={img}
                        onChange={(e) => setImgLink(e.target.value)}
                        className="input input-bordered w-full"
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Brand</span>
                    </label>
                    <input
                        type="text"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        className="input input-bordered w-full"
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Price</span>
                    </label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="input input-bordered w-full"
                    />
                    </div>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Category</span>
                    </label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setPrice(e.target.category)}
                        className="input input-bordered w-full"
                    />
                </div>
                <button type="submit" className="btn btn-primary w-full mt-4">
                    Save Changes
                </button>
            </form>
        </div>
       </Container>
    );
};

export default EditProduct;


