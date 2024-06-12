import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { increment, incrementAsync, selectCount } from "../productListsSlice";
// import styles from './Counter.module.css';
import { Link, useNavigate } from "react-router-dom";
import { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon, StarIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import {
  fetchAllProductsAsync,
  selectAllProducts,
  fetchProductsByfilterAsync,
  selectTotalItems,
  selectAllCategories,
  fetchAllCategoriesAsync,
  fetchAllBrandsAsync,
  selectAllBrands,
  fetchProductByIdNullAsync
} from "../../product-list/productListsSlice";
const sortOptions = [
  { name: "Best Rating", sorts: "rating", order: "desc", current: false },
  { name: "Price: Low to High", sorts: "price", order: "asc", current: false },
  { name: "Price: High to Low", sorts: "price", order: "desc", current: false },
];
const subCategories = [];


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function AdminProductList() {

  const navigate=useNavigate();
  const dispatch = useDispatch();
  const categories=useSelector(selectAllCategories);
  const brands=useSelector(selectAllBrands);
  
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filter, setFilters] = useState({});
  const products = useSelector(selectAllProducts);
  const totalItems=useSelector(selectTotalItems);
  const [sort,setSort]=useState({});
  
  const [page,setPage]=useState(1);
  const limit=9;
  
  const sections = [
    {
      id: "brand",
      name: "brand",
      options: brands
    },
    {
      id: "category",
      name: "Category",
      options:categories
    },
  ];
  const handleFilter = async (e, section, option) => {
    console.log(section.id,option.value);

    
    const newFilter = { ...filter };

    //When we close the filtes the box gets unchecked need to update the checked state of the selected option (pending)
     
    //multiple category at same time
    if (e.target.checked) {
      //now i am creating an array which can store multiple categories and brand;
      //in implementation only last one is executeed update the api accordingly

      //1. checkin if section id is already there
      if(newFilter[section.id]){
          newFilter[section.id].push(option.value);//pushing the options selected ;
      }
      else{
         newFilter[section.id]=[option.value];
      }
    } else {
       //if checkbox is unselected than first find the index of the unselected element and then will delete it from the array
        const index=newFilter[section.id].findIndex(e=>e===option.value);
        newFilter[section.id].splice(index,1);
      }

    setFilters(newFilter);
    setPage(1);
    // console.log(newFilter);
    // dispatch(fetchProductsByfilterAsync(newFilter));
  };
  const handleSort = (e, option) => {
    const newFilter = { _sort: option.sorts, _order: option.order };
    setSort(newFilter);
    setPage(1);
    // dispatch(fetchProductsByfilterAsync(newFilter));
    
  };
  const handlePage=(page)=>{
    // console.log(page);

    setPage(page);
  }
  const handleDetail=(e)=>{
    
    console.log("id: ",e);
    console.log("clicked on null: ");
    dispatch(fetchProductByIdNullAsync());
    navigate(`/admin/edit/${e}`);
  }

  useEffect(() => {
    const pagination={_page:page,_limit:limit};
    dispatch(fetchProductsByfilterAsync({filter,sort,pagination}));
    // console.log(products);
  }, [dispatch,filter,sort,page]);
 
  useEffect(()=>{
    dispatch(fetchAllCategoriesAsync());
    dispatch(fetchAllBrandsAsync());
  },[]);
  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition show={mobileFiltersOpen}>
          <Dialog
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <TransitionChild
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>

            <div className="fixed inset-0 z-40 flex">
              <TransitionChild
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    {sections.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <DisclosureButton className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </DisclosureButton>
                            </h3>
                            <DisclosurePanel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      onChange={(e) =>
                                        handleFilter(e, section, option)
                                      }
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </DisclosurePanel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                    <Link to="/admin/addproduct"
                type="submit"
                className=" mt-5 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add New Product  
              </Link>
              <Link to="/admin/orders"
                type="submit"
                className=" mt-5 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                All Orders  
              </Link>
                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </Dialog>
        </Transition>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-10">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Products
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </MenuButton>
                </div>

                <Transition
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <MenuItem key={option.name}>
                          {({ focus }) => (
                            <p
                              onClick={(e) => handleSort(e, option)}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                focus ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {option.name}
                            </p>
                          )}
                        </MenuItem>
                      ))}
                    </div>
                  </MenuItems>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                {sections.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-b border-gray-200 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <DisclosureButton className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </DisclosureButton>
                        </h3>
                        <DisclosurePanel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  onChange={(e) =>
                                    handleFilter(e, section, option)
                                  }
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>
                ))}
                <Link to="/admin/addproduct"
                type="submit"
                className=" mt-5 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add New Product
              </Link>
              <Link to="/admin/orders"
                type="submit"
                className=" mt-5 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                All Orders  
              </Link>
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                {/* Your content 
                
              older vali start hui idhar se*/}

                <div>
                  <div className="bg-white">
                    <div className="mx-auto max-w-2xl px-4 py-1 sm:px-6 sm:py-2 lg:max-w-7xl lg:px-8">
                      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                        {products.map((product) => (
                            
                          <div value={product.id} onClick={()=>handleDetail(product.id)} key={product.id} className="group relative mb-5">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                              <img
                                src={product.thumbnail}
                                alt={product.imageAlt}
                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                              />
                            </div>
                            <div className="mt-4 flex justify-between">
                              <div>
                                <h3 className="text-sm text-gray-700">
                                  <p>
                                    <span
                                      aria-hidden="true"
                                      className="absolute inset-0"
                                    />

                                    <StarIcon
                                      className="h-6 w-6"
                                      aria-hidden="true"
                                    ></StarIcon>
                                    {product.rating}
                                  </p>
                                </h3>
                              </div>
                              <p className="text-sm font-medium text-gray-900">
                                ₹{product.price}
                              </p>
                            </div>
                            <div className="mt-1 mb-5 flex justify-between">
                              <p className="text-sm font-medium text-gray-900">
                                {product.title}
                              </p>
                            </div>
                            <Link to ="/admin/edit"
                type="submit"
                className=" w-20 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Edit 
              </Link> 
                          </div>
                          
                          
                          
                        
                         
              
              ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Pagination Code starts from here*/}
          
          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
              <a onClick={()=>handlePage(page-1>0?page-1:0)}
                href="#"
                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Previous
              </a>
              <a onClick={()=>handlePage(page+1<=Math.ceil(totalItems/limit)?page+1:Math.ceil(totalItems/limit))}
                href="#"
                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Next
              </a>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{(page-1)*limit+1}</span> to{" "}
                  <span className="font-medium">{(page*limit +1)}</span> of{" "}
                  <span className="font-medium">{totalItems}</span> results
                </p>
              </div>
              <div>
                <nav
                  className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                  aria-label="Pagination"
                >
                  <a onClick={()=>handlePage(page-1>=1?page-1:1)}
                    
                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                  </a>
                  {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                  
                  {Array.from({length:Math.ceil(totalItems/limit)}).map((el,index)=>(

                    <div onClick={()=>handlePage(index+1)}
                  
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${index+1===page ? 'bg-indigo-600 text-white':'text-gray-900'}  ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}
                    >
                    {index+1<Math.ceil(totalItems/limit)?index+1:Math.ceil(totalItems/limit)}
                  </div>
                  ))
                            
                  }
                  
                  <a onClick={()=>handlePage(page+1<=Math.ceil(totalItems/limit)?page+1:Math.ceil(totalItems/limit))}
                    
                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                  </a>
                </nav>
              </div>
            </div>
          </div>

          {/* Pagination Code ends here*/}
        </main>
      </div>
    </div>
  );
}

{ /**/}