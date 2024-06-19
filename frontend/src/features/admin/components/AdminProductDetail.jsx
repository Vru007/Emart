import React from "react";
import { useEffect} from "react";
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { Link,useParams} from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addProductAsync, selectAllBrands, selectAllCategories, selectedProducts, updateProductAsync } from "../../product-list/productListsSlice";
import { fetchProductByIdAsync } from "../../product-list/productListsSlice";
export default function AddProduct(){

  const dispatch=useDispatch();
  const params=useParams();
  useEffect(()=>{
    window.scrollTo(0, 0);
  })
 
  const selectedProduct=useSelector(selectedProducts);

  // const selectedProductId=product.id;
  // console.log("sele",selectedProductId);
    const { register, handleSubmit,reset,setValue, formState: { errors } } = useForm();
      
    const brands=useSelector(selectAllBrands);
    // console.log(brands);
    const category = useSelector(selectAllCategories);
    const handleEditForm=()=>{
      
      console.log("product selected: ",selectedProduct);
      setValue('title',selectedProduct.title);
      setValue('description',selectedProduct.description);
      setValue('brand',selectedProduct.brand);
      setValue('category',selectedProduct.category);
      setValue('Warranty Period',selectedProduct.warrantyInformation);
      setValue('shippingInformation',selectedProduct.shippingInformation);
      setValue('price',selectedProduct.price);
      setValue('discountPercentage',selectedProduct.discountPercentage);
      setValue('stock',selectedProduct.stock);
      setValue('thumbnail',selectedProduct.thumbnail);
      setValue('image1',selectedProduct.images[0]);
      setValue('image2',selectedProduct.images[1]);
      setValue('image3',selectedProduct.images[2]);
   }


   const handleDetail=(e)=>{
      
    console.log("id: ",e);
    console.log("clicked on null: ");
    dispatch(fetchProductByIdNullAsync());
    navigate(`/admin/edit/${e}`);
  }
   const handleClick=(id,index)=>{
    handleDetail(id);
    handleEditForm(index);
  
  }
  useEffect(() =>{
    if(selectedProduct)
    {
    handleEditForm();
    }
   },[selectedProduct]);


    return(
        <div className="mt-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit((data)=>{
         const product={...data};
         product.images=[product.image1,product.image2,product.image3];
         delete product['image1'];
         delete product['image2'];
         delete product['image3'];
         delete product['image'];
         product.rating = 0;
         console.log("new Update Product: ",product);
         

         dispatch(updateProductAsync({itemId:selectedProduct.id,product:product}));
         reset();
                      
})}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you share.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Product Title
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    {...register("title",{required: "Title is required"})}
                    id="title"
                    // autoComplete="username"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Title"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                Description of Product
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  {...register("description",{required: "description is required"})}
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about product.</p>
            </div>


            
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

            <div className="sm:col-span-3">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                brand 
              </label>
              <select
                  id="brand"
                  {...register("brand",{required: "category is required"})}
                  
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="">--Choose-Brand--</option>
                  {brands.map((brand)=>(
                  <option value={brand.value}>{brand.value}</option>
    ))}
                </select>
              
            </div>
            <div className="sm:col-span-3">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              category
            </label>
            <select
            id="category"
            {...register("category",{required: "Category is required"})}
            
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
          >
            <option value="">--Choose-category--</option>
            {category.map((Cate)=>(
            <option value={Cate.value}>{Cate.value}</option>
))}
          </select>
          </div>
          <div className="sm:col-span-3">
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Warranty Period
          </label>
          <div className="mt-2">
            <input
              id="Warranty Period"
              {...register("Warranty Period",{required: "Warranty Period is required"})}
              type="text"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="sm:col-span-3">
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
        Shipping Information
        </label>
        <div className="mt-2">
          <input
            id="shippingInformation"
            {...register("shippingInformation",{required: "shippingInformation is required"})}
            type="text"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
           
            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                Price
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("price",{required: "Price is required"})}
                
                  id="Price"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                Discount Percent
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("discountPercentage",{required: "discountPercentage is required"})}
                  id="discountPercentage"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
              stock
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  {...register("stock",{required: "stock is required"})}
                  id="stock"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-4">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Thumbnail Link
            </label>
            <div className="mt-2">
              <input
                id="thumbnail"
                {...register("thumbnail",{required: "thumbnail is required"})}
                type="text"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-4">
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Image Link 1
          </label>
          <div className="mt-2">
            <input
              id="image1"
              {...register("image1",{required: "image1 is required"})}
              type="text"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="sm:col-span-4">
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Image Link 2
          </label>
          <div className="mt-2">
            <input
              id="image2"
              {...register("image2",{required: "image2 is required"})}
              type="text"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="sm:col-span-4">
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Image Link 3
          </label>
          <div className="mt-2">
            <input
              id="image3"
              {...register("image3",{required: "image3 is required"})}
              type="text"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
          </div>
        </div>

        
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Link to="/admin/products" type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </Link>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
        </div>
    )
}

