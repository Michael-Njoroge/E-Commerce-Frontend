import React, { useState, useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import ProductCard from "../components/ProductCard";
import Colors from "../components/Colors";
import Meta from "../components/Meta";
import ReactStars from "react-rating-stars-component";
import Container from "../components/Container";
import { getProducts } from '../features/product/productSlice';
import {useDispatch, useSelector} from 'react-redux'

const OurStore = () => {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state?.product?.products);
  const [grid, setGrid] = useState(4);
  const [productBrand, setProductBrand] = useState([]);
  const [productCategory, setProductCategory] = useState([]);
  const [productTag, setProductTag] = useState([]);
  const [productColor, setProductColor] = useState([]);

  //filter states
  const [category, setCategory] = useState(null);
  const [brand, setBrand] = useState(null);
  const [tag, setTag] = useState(null);
  const [color, setColor] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [sort, setSort] = useState(null);


  const getAllProducts = () => {
    dispatch(getProducts({category,brand,color,minPrice,maxPrice,sort,tag}));
  };

  useEffect(() => {
    getAllProducts()
  }, [category,brand,color,minPrice,maxPrice,sort,tag]);

  useEffect(() => {
    const newBrand = [];
    const newCategory = [];
    const newTag = [];
    const newColor = [];

    for (var i = 0; i < productState.length; i++) {
      const element = productState[i]
      newBrand.push(element?.brand?.title)
      newCategory.push(element?.category?.title)
      newTag.push(element?.tags)

      const allColors = element?.colors

      for (var k = 0; k < allColors.length; k++) {
        const colored = allColors[k]
        newColor.push(colored)

      }
    }
    setProductBrand(newBrand);
    setProductCategory(newCategory);
    setProductTag(newTag);
    setProductColor(newColor);
  },[productState]);

  return (
    <>
      <Meta title="E-Commerce | Our Store" />
      <BreadCrumb title="Our Store" />
      <Container class1="store-wrapper home-wrapper-2 py-5">
          <div className="row">
            <div className="col-3">
              <div className="filter-card mb-3">
                <h3 className="filter-title">Shop By Categories</h3>

                <div>
                  <ul className="ps-0">
                  {
                    productCategory && [...new Set(productCategory)].map((item,index)=>{
                      return (
                        <li key={index} onClick={()=>{setCategory(item)}}>{item}</li>
                      )
                    })
                  }
                  </ul>
                </div>
              </div>
              <div className="filter-card mb-3">
                <h3 className="filter-title">Shop By Brands</h3>

                <div>
                  <ul className="ps-0">
                  {
                    productBrand && [...new Set(productBrand)].map((item,index)=>{
                      return (
                        <li key={index} onClick={()=>{setBrand(item)}}>{item}</li>
                      )
                    })
                  }
                  </ul>
                </div>
              </div>
              <div className="filter-card mb-3">
                <h3 className="filter-title">Filter By</h3>
                <div>
                  <h5 className="sub-title">Availability</h5>
                  <div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        value=""
                        id=""
                      />
                      <label className="form-check-label" htmlFor="">
                        In Stock (1)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        value=""
                        id=""
                      />
                      <label className="form-check-label" htmlFor="">
                        Out of Stock (0)
                      </label>
                    </div>
                  </div>
                  <h5 className="sub-title">Price</h5>
                  <div className="d-flex align-items-center gap-10">
                    <div className="form-floating">
                      <input
                        type="number"
                        className="form-control"
                        id="floatingInput"
                        placeholder="From"
                        onChange={(e)=>{setMinPrice(e.target.value)}}
                      />
                      <label htmlFor="floatingInput">From</label>
                    </div>
                    <div className="form-floating">
                      <input
                        type="number"
                        className="form-control"
                        id="floatingInput1"
                        placeholder="To"
                        onChange={(e)=>{setMaxPrice(e.target.value)}}
                      />
                      <label htmlFor="floatingInput1">To</label>
                    </div>
                  </div>
                  <h5 className="sub-title">Colors</h5>
                  <div>
                    <ul className="ps-0 colors">
                    {
                        console.log("[...new Set(item?.title)]",[...new Set(productColor)])

                    }
                    {
                      productColor && productColor.map((item,index)=>{

                        return (
                          <li key={index} onClick={()=>{setColor(item?.id)}} style={{backgroundColor:[...new Set(item?.title)]}}></li>
                        )
                      })
                    }
                    </ul>
                  </div>
        {/*          <h5 className="sub-title">Size</h5>
                  <div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        value=""
                        id="color-1"
                      />
                      <label className="form-check-label" htmlFor="color-2">
                        S (2)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        value=""
                        id="color-1"
                      />
                      <label className="form-check-label" htmlFor="color-2">
                        M (2)
                      </label>
                    </div>
                  </div>*/}
                </div>
              </div>
              <div className="filter-card mb-3">
                <h3 className="filter-title">Product Tags</h3>
                <div>
                  <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                  {
                    productTag && [...new Set(productTag)].map((item,index)=>{
                      return (
                        <span key={index} onClick={()=>setTag(item)} style={{cursor:"pointer"}} className="badge bg-light text-secondary rounded-3 py-2 px-3">
                          {item}
                        </span>
                      )
                    })
                  }
                  </div>
                </div>
              </div>
              <div className="filter-card mb-3">
                <h3 className="filter-title">Random Products</h3>
                <div>
                  <div className="random-products mb-3 d-flex">
                    <div className="w-50">
                      <img
                        src="images/watch.jpg"
                        className="img-fluid"
                        alt="random"
                      />
                    </div>
                    <div className="w-50">
                      <h5>
                        Kids headphones bulk 10 pack multi colored for students
                      </h5>
                      <ReactStars
                        count={5}
                        size={24}
                        value={4}
                        edit={false}
                        activeColor="#ffd700"
                      />
                      <b>$ 300</b>
                    </div>
                  </div>
                  <div className="random-products d-flex">
                    <div className="w-50">
                      <img
                        src="images/watch.jpg"
                        className="img-fluid"
                        alt="random"
                      />
                    </div>
                    <div className="w-50">
                      <h5>
                        Kids headphones bulk 10 pack multi colored for students
                      </h5>
                      <ReactStars
                        count={5}
                        size={24}
                        value={4}
                        edit={false}
                        activeColor="#ffd700"
                      />
                      <b>$ 300</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-9">
              <div className="filter-sort-grid mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-10">
                    <p className="mb-0" style={{ width: "100px" }}>
                      Sort By:
                    </p>
                    <select name="" className="form-control form-select" id="" onChange={(e)=>{setSort(e.target.value)}}>
                      <option value="manual">Featured</option>
                      <option selected value="best-selling">
                        Best Selling
                      </option>
                      <option value="title-ascending">
                        Alphabetically, A-Z
                      </option>
                      <option value="title-descending">
                        Alphabetically, Z-A
                      </option>
                      <option value="price-ascending">
                        Price, low to high
                      </option>
                      <option value="price-descending">
                        Price, high to low
                      </option>
                      <option value="created_at">
                        Date, old to new
                      </option>
                      <option value="-created_at">
                        Date, new to old
                      </option>
                    </select>
                  </div>
                  <div className="align-items-center d-flex gap-10">
                    <p className="total-products mb-0">{productState.length} Products</p>
                    <div className="align-items-center d-flex gap-10 grid">
                      <img
                        onClick={() => {
                          setGrid(3);
                        }}
                        src="images/gr4.svg"
                        className="d-block img-fluid"
                        alt="grid"
                      />
                      <img
                        onClick={() => {
                          setGrid(4);
                        }}
                        src="images/gr3.svg"
                        className="d-block img-fluid"
                        alt="grid"
                      />
                      <img
                        onClick={() => {
                          setGrid(6);
                        }}
                        src="images/gr2.svg"
                        className="d-block img-fluid"
                        alt="grid"
                      />
                      <img
                        onClick={() => {
                          setGrid(12);
                        }}
                        src="images/gr.svg"
                        className="d-block img-fluid"
                        alt="grid"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="product-list pb-5">
                <div className="d-flex flex-wrap gap-10">
                  <ProductCard data={productState ? productState : []} grid={grid} />
                </div>
              </div>
            </div>
          </div>
      </Container>
    </>
  );
};
export default OurStore;
