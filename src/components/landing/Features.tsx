import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import type { NextPage } from "next";
import clsx from "clsx";

const Features: NextPage = () => {
  React.useEffect(() => {
    AOS.init();
  }, []);

  const about = [
    {
      className: "flex flex-row-reverse justify-between items-center w-full",
      dataAos: "fade-right",
      dataAosImage: "fade-left",
      left: true,
      title: "What is Invoice Factoring?",
      image: "/infoimage3.png",
      description:
        "Invoice factoring is a way for UK based businesses to raise money by selling invoices owed to your business to a third party factoringcompany at a discount. Factoring usually includes your own accounts receivable credit control, this is where the lender chases unpaid invoices up on your behalf. UK factoring companies help release cash from your debtor book. Here is everything you need to know about invoice factoring.",
    },
    {
      className: "flex justify-between items-center w-full",
      dataAos: "fade-left",
      dataAosImage: "fade-right",
      left: false,
      title: "How Does Factoring Work?",
      image: "/infoimage1.png",
      description:
        "For invoice factoring to work there must be a factor, a debtor and an unpaid invoice. The factor is the financial institution that offers or agrees to buy business debt or unpaid invoices. The debtor is the client who owes money to a business in the form of an unpaid invoice. Lastly, the invoice is the document that shows transactions between a business and its clients.",
    },
    // {
    //   className: "flex flex-row-reverse justify-between items-center w-full",
    //   dataAos: "fade-right",
    //   dataAosImage: "fade-left",
    //   left: true,
    //   title: "What is Invoice Factoring?",
    //   image: "/infoimage2.png",
    //   description:
    //     "Invoice factoring is a way for UK based businesses to raise money by selling invoices owed to your business to a third party factoringcompany at a discount. Factoring usually includes your own accounts receivable credit control, this is where the lender chases unpaid invoices up on your behalf. UK factoring companies help release cash from your debtor book. Here is everything you need to know about invoice factoring.",
    // },
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center relative">
      <div
        className="w-full h-full absolute top-0"
        style={{
          background: "linear-gradient(360deg, #F1D692 -83.4%, #FF9900 100%)",
        }}
      ></div>
      <div className="w-full flex items-center justify-center gap-10 h-screen"></div>
    </div>
  );
};

export default Features;
