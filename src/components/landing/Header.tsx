import React from "react";
import Link from "next/link";
import { Layout } from "antd";
import { useRouter } from "next/dist/client/router";
import clsx from "clsx";
import { Button } from "../common/button/button";
import { MenuIcon } from "@heroicons/react/outline";
import { SidebarMobile } from "../Layouts/sidebars/mobile";
import { ApartmentOutlined, HomeOutlined } from "@ant-design/icons";
import { SidebarMobileLanding } from "./sidebars/mobile";
const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Roboto, sans-serif",
    color: "#041836",
  },
  // headerRight: {
  //   display: "flex",
  //   gap: "20px",
  //   alignItems: "center",
  //   fontSize: "15px",
  //   fontWeight: "600",
  // },
};

const navItems = [
  { name: "Home", link: "/#home", icon: <HomeOutlined /> },
  {
    name: "About",
    link: "/#About",
    icon: (
      <div className="flex gap-1 cursor-pointer">
        <img
          className="md:h-12 md:w-12 h-10 w-10"
          src={"/icons/logo_simple_white.svg"}
          alt="logo"
        />
      </div>
    ),
  },
  {
    name: "Features",
    link: "/#Features",
    icon: <ApartmentOutlined />,
  },
];

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const refSidebarMobile = React.useRef(null);
  const [isExecuted, setIsExecuted] = React.useState(false);
  const [notAvailable, setNotAvailable] = React.useState({
    message: "",
    value: false,
  });
  const router = useRouter();

  return (
    <>
      <nav
        className={clsx(
          "fixed top-0 z-[500]",
          "bg-primary",
          "w-[100%] px-8 py-2 flex flex-row items-center justify-between shadow-md",
        )}
      >
        <Logo />
        <div className="md:flex hidden gap-4 items-center">
          {navItems.map((item, index) => {
            return (
              <>
                <NavbarItem
                  key={index}
                  name={item.name}
                  link={item.link}
                  route={router.asPath}
                />
              </>
            );
          })}
          <button
            onClick={() => router.push("/app")}
            className="btnLanding rounded-md Poppins px-4 py-1 hover:text-secondary hover:border-secondary text-white bg-secondary border border-transparent font-bold"
          >
            Try It!
          </button>
        </div>
        <div
          className="md:hidden flex"
          onClick={() => {
            setSidebarOpen(true);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#FF8A00"
            className="w-10 h-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
      </nav>
      <SidebarMobileLanding
        initialFocus={refSidebarMobile}
        setSidebarOpen={setSidebarOpen}
        sidebarOpen={sidebarOpen}
        navItems={navItems}
      />
    </>
  );
}

export const Message: React.FunctionComponent<{
  content: string;
  open: boolean;
}> = (props) => {
  const { content, open } = props;

  return (
    <div
      className={clsx(
        `absolute bottom-3.5 left-3.5 bg-purple-300 px-10 py-4 rounded-md`,
        "ease-out duration-300",
        open ? "scale-100" : "scale-0",
      )}
    >
      {content}
    </div>
  );
};

export const Logo = () => (
  <Link href="/dashboard">
    <div className="mr-4 md:py-0 py-2 flex gap-2 items-center cursor-pointer">
      <img className="h-7" src="/icons/logo.svg" alt="logo" />
    </div>
  </Link>
);

export const NavbarItem = ({ name, link, route }) => {
  return (
    <a className={clsx("py-2 relative")} href={link}>
      <div className={clsx("gap-2 flex items-center text-white")}>
        <h3 className={clsx("text-md font-[450]")}>{name}</h3>
      </div>
    </a>
  );
};
