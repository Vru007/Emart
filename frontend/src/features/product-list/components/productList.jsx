import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { increment, incrementAsync, selectCount } from "../productListsSlice";
// import styles from './Counter.module.css';
import { Link } from "react-router-dom";
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
import { fetchAllProductsAsync, selectAllProducts,fetchProductsByfilterAsync,fetchFromSortingAsync } from "../productListsSlice";
const sortOptions = [
  { name: "Best Rating", sorts:'rating',order:'desc', current: false},
  { name: "Price: Low to High", sorts: 'price', order:'asc', current: false},
  { name: "Price: High to Low", sorts: 'price', order:'desc',current: false},
];
const subCategories = [];
const filters = [
  {
    id: "brand",
    name: "brand",
    options: [
    { value: 'Essence', label: 'Essence', checked: false },
    { value: 'Glamour Beauty', label: 'Glamour Beauty', checked: false },   
    { value: 'Velvet Touch', label: 'Velvet Touch', checked: false },       
    { value: 'Chic Cosmetics', label: 'Chic Cosmetics', checked: false },   
    { value: 'Nail Couture', label: 'Nail Couture', checked: false },       
    { value: 'Calvin Klein', label: 'Calvin Klein', checked: false },       
    { value: 'Chanel', label: 'Chanel', checked: false },
    { value: 'Dior', label: 'Dior', checked: false },
    {
      value: 'Dolce & Gabbana',
      label: 'Dolce & Gabbana',
      checked: false
    },
    { value: 'Gucci', label: 'Gucci', checked: false },
    {
      value: 'Annibale Colombo',
      label: 'Annibale Colombo',
      checked: false
    },
    { value: 'Furniture Co.', label: 'Furniture Co.', checked: false },     
    { value: 'Knoll', label: 'Knoll', checked: false },
    { value: 'Bath Trends', label: 'Bath Trends', checked: false },
    { value: 'Apple', label: 'Apple', checked: false },
    { value: 'Asus', label: 'Asus', checked: false },
    { value: 'Huawei', label: 'Huawei', checked: false },
    { value: 'Lenovo', label: 'Lenovo', checked: false },
    { value: 'Dell', label: 'Dell', checked: false },
    { value: 'Fashion Trends', label: 'Fashion Trends', checked: false },   
    { value: 'Gigabyte', label: 'Gigabyte', checked: false },
    { value: 'Classic Wear', label: 'Classic Wear', checked: false },       
    { value: 'Casual Comfort', label: 'Casual Comfort', checked: false },   
    { value: 'Urban Chic', label: 'Urban Chic', checked: false },
    { value: 'Nike', label: 'Nike', checked: false },
    { value: 'Puma', label: 'Puma', checked: false },
    { value: 'Off White', label: 'Off White', checked: false },
    {
      value: 'Fashion Timepieces',
      label: 'Fashion Timepieces',
      checked: false
    },
    { value: 'Longines', label: 'Longines', checked: false },
    { value: 'Rolex', label: 'Rolex', checked: false },
    { value: 'Amazon', label: 'Amazon', checked: false },
    { value: 'Beats', label: 'Beats', checked: false },
    { value: 'TechGear', label: 'TechGear', checked: false },
    { value: 'GadgetMaster', label: 'GadgetMaster', checked: false },       
    { value: 'SnapTech', label: 'SnapTech', checked: false },
    { value: 'ProVision', label: 'ProVision', checked: false },
    { value: 'Generic Motors', label: 'Generic Motors', checked: false },   
    { value: 'Kawasaki', label: 'Kawasaki', checked: false },
    { value: 'MotoGP', label: 'MotoGP', checked: false },
    { value: 'ScootMaster', label: 'ScootMaster', checked: false },
    { value: 'SpeedMaster', label: 'SpeedMaster', checked: false },
    { value: 'Attitude', label: 'Attitude', checked: false },
    { value: 'Olay', label: 'Olay', checked: false },
    { value: 'Vaseline', label: 'Vaseline', checked: false },
    { value: 'Oppo', label: 'Oppo', checked: false },
    { value: 'Realme', label: 'Realme', checked: false },
    { value: 'Samsung', label: 'Samsung', checked: false },
    { value: 'Vivo', label: 'Vivo', checked: false },
    { value: 'Fashion Shades', label: 'Fashion Shades', checked: false },   
    { value: 'Fashion Fun', label: 'Fashion Fun', checked: false },
    { value: 'Chrysler', label: 'Chrysler', checked: false },
    { value: 'Dodge', label: 'Dodge', checked: false },
    { value: 'Fashionista', label: 'Fashionista', checked: false },
    { value: 'Heshe', label: 'Heshe', checked: false },
    { value: 'Prada', label: 'Prada', checked: false },
    {
      value: 'Elegance Collection',
      label: 'Elegance Collection',
      checked: false
    },
    { value: 'Comfort Trends', label: 'Comfort Trends', checked: false },   
    { value: 'Fashion Diva', label: 'Fashion Diva', checked: false },       
    { value: 'Pampi', label: 'Pampi', checked: false },
    {
      value: 'Fashion Express',
      label: 'Fashion Express',
      checked: false
    },
    { value: 'IWC', label: 'IWC', checked: false },
    { value: 'Fashion Gold', label: 'Fashion Gold', checked: false },       
    { value: 'Fashion Co.', label: 'Fashion Co.', checked: false }],
  },
  {
    id: "category",
    name: "Category",
    options: [
      { value: "beauty", label: "beauty", checked: false },
      { value: "fragrances", label: "fragrances", checked: false },
      { value: "furniture", label: "furniture", checked: false },
      { value: "groceries", label: "groceries", checked: false },
      {
        value: "home-decoration",
        label: "home decoration",
        checked: false,
      },
      {
        value: "kitchen-accessories",
        label: "kitchen accessories",
        checked: false,
      },
      { value: "laptops", label: "laptops", checked: false },
      { value: "mens-shirts", label: "mens shirts", checked: false },
      { value: "mens-shoes", label: "mens shoes", checked: false },
      { value: "mens-watches", label: "mens watches", checked: false },
      {
        value: "mobile-accessories",
        label: "mobile accessories",
        checked: false,
      },
      { value: "motorcycle", label: "motorcycle", checked: false },
      { value: "skin-care", label: "skin care", checked: false },
      { value: "smartphones", label: "smartphones", checked: false },
      {
        value: "sports-accessories",
        label: "sports accessories",
        checked: false,
      },
      { value: "sunglasses", label: "sunglasses", checked: false },
      { value: "tablets", label: "tablets", checked: false },
      { value: "tops", label: "tops", checked: false },
      { value: "vehicle", label: "vehicle", checked: false },
      { value: "womens-bags", label: "womens bags", checked: false },
      { value: "womens-dresses", label: "womens dresses", checked: false },
      {
        value: "womens-jewellery",
        label: "womens jewellery",
        checked: false,
      },
      { value: "womens-shoes", label: "womens shoes", checked: false },
      { value: "womens-watches", label: "womens watches", checked: false },
    ],
  },
];


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function ProductList() {
  const dispatch = useDispatch();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filter,setFilters]=useState({});
  const products = useSelector(selectAllProducts);
  useEffect(() => {
    dispatch(fetchAllProductsAsync());
    // console.log(products);
  }, [dispatch]);

 const handleFilter=async(e,section,option)=>{
  const newFilter={...filter,[section.id]:option.value};
   setFilters((prevfilter)=>({...prevfilter,[section.id]:option.value}));
  console.log(filter);
 dispatch(fetchProductsByfilterAsync(newFilter));
   
}
  const handleSort=(e,option)=>{
    e.preventDefault();
    dispatch(fetchFromSortingAsync(option));
  }

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
                    {filters.map((section) => (
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
                                      onChange={e=>handleFilter(e,section,option)}
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
                              onClick={e=>handleSort(e,option)}
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
                {filters.map((section) => (
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
                                  onChange={e=>handleFilter(e,section,option)}
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
                          <div key={product.id} className="group relative">
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
                                  <Link to="/details" href={product.href}>
                                    <span
                                      aria-hidden="true"
                                      className="absolute inset-0"
                                    />

                                    <StarIcon
                                      className="h-6 w-6"
                                      aria-hidden="true"
                                    ></StarIcon>
                                    {product.rating}
                                  </Link>
                                </h3>
                              </div>
                              <p className="text-sm font-medium text-gray-900">
                                ₹{product.price}
                              </p>
                            </div>
                            <div className="mt-1 flex justify-between">
                              <p className="text-sm font-medium text-gray-900">
                                {product.title}
                              </p>
                            </div>
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
              <a
                href="#"
                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Previous
              </a>
              <a
                href="#"
                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Next
              </a>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to{" "}
                  <span className="font-medium">10</span> of{" "}
                  <span className="font-medium">97</span> results
                </p>
              </div>
              <div>
                <nav
                  className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                  aria-label="Pagination"
                >
                  <a
                    href="#"
                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                  </a>
                  {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                  <a
                    href="#"
                    aria-current="page"
                    className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    1
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    2
                  </a>
                  <a
                    href="#"
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
