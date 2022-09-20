import LadingComponent from "components/landing/Home";
import Features from "components/landing/Features";
import AboutUs from "components/landing/About";
import ContactUsPoweredBy from "components/landing/ContactUsPoweredBy";
import { NextPage } from "next";
import Header from "components/landing/Header";

const Home: NextPage = () => {
  return (
    <>
      <div className="w-full" id="Home"></div>
      <Header />
      <LadingComponent />
      <div className="bg-secondary relative">
        <AboutUs />
        <Features />
        <ContactUsPoweredBy />
      </div>
    </>
  );
};

export default Home;
