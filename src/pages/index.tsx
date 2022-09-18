import LadingComponent from "components/landing/Home";
import Features from "components/landing/Features";
import AboutUs from "components/landing/About";
import ContactUs from "components/landing/ContactUsForm";
import { NextPage } from "next";
import Header from "components/landing/Header";
import PoweredBy from "components/landing/PoweredBy";

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <LadingComponent />
      <div className="bg-secondary relative">
        <AboutUs />
        <Features />
        <PoweredBy />
        <ContactUs />
      </div>
    </>
  );
};

export default Home;
