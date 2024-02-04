import React from "react";
import "./Home.scss";
import Slider from "../../componets/slider/Slider";
import HomeInfoBox from "./HomeInfoBox";
import { productData } from "../../componets/corousel/data";
import CarouselItem from "../../componets/corousel/CarouselItem";
import ProductCarousel from "../../componets/corousel/Carousel";
import ProductCategory from "./ProductCategory";
import FooterLinks from "../../componets/footer/FooterLinks";
import { logo } from "../../componets/header/Header";

const PageHeading = ({ heading, btnText }) => {
  return (
    <>
      <div className="--flex-between">
        <h2 className="--fw-thin">{heading}</h2>
        <button className="--btn">{btnText}</button>
      </div>
      <div className="--hr"></div>
    </>
  );
};

const Home = () => {
  const productss = productData.map((item, index) => (
    <div key={index.id}>
      <CarouselItem
        name={item.name}
        url={item.imageurl}
        price={item.price}
        description={item.description}
      />
    </div>
  ));
  return (
    <>
      <Slider />
      <section>
        <div className="container">
          <HomeInfoBox />
          <PageHeading heading={"Latest Products"} btnText={"ShowNow>>>"} />
          <ProductCarousel products={productss} />
        </div>
      </section>
      <section>
        <div className="--bg-grey">
          <div className="container">
            <h3>Categories</h3>
            <ProductCategory />
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <PageHeading heading={"Moabile Phone"} btnText={"ShowNow>>>"} />
          <ProductCarousel products={productss} />
        </div>
      </section>
      <FooterLinks />
    </>
  );
};
export default Home;
