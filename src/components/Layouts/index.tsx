import React from "react";
import Link from "next/link";
import { Layout } from "antd";
import { useRouter } from "next/dist/client/router";
import clsx from "clsx";
import { Button } from "../common/button/button";
import { SidebarMobile } from "./sidebars/mobile";
import {
  AppstoreFilled,
  AreaChartOutlined,
  BellOutlined,
  GoldenFilled,
  HomeOutlined,
  MessageOutlined,
  NotificationOutlined,
  SettingFilled,
  SettingOutlined,
  ShopOutlined,
  TwitterOutlined,
  UserOutlined,
  WalletOutlined,
} from "@ant-design/icons";

const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Roboto, sans-serif",
    color: "#041836",
  },
};

const navItems = [
  {
    name: "Home",
    link: "/",
    menu: true,
    icon: <HomeOutlined />,
  },
  {
    name: "Notifications",
    link: "/notifications",
    icon: <BellOutlined />,
  },
  { name: "Messages", link: "/messages", icon: <MessageOutlined /> },
  {
    link: "/profile",
    name: "Profile",
    icon: <UserOutlined />,
  },
  {
    link: "/settings",
    name: "Settings",
    icon: <SettingOutlined />,
  },
  {
    link: "/settings",
    name: "Make a Post",
    onClick: () => {
      console.log("a");
    },
    button: true,
  },
];

export default function AppLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const refSidebarMobile = React.useRef(null);
  const [isExecuted, setIsExecuted] = React.useState(false);
  const [notAvailable, setNotAvailable] = React.useState({
    message: "",
    value: false,
  });

  const router = useRouter();

  return (
    <div
      style={{
        minHeight: "100vh",
        // overflow: "auto",
      }}
      className="flex md:flex-row flex-col relative md:bg-primary md:p-4"
    >
      <nav
        className={clsx(
          "xl:w-auto md:w-80 w-full shrink-0 xl:pl-10 pl-8 flex md:flex-col flex-row items-center md:py-8 py-2 bg-primary md:pr-0 pr-8",
        )}
      >
        <div className="flex md:flex-col items-center md:justify-start justify-between w-full sticky top-12">
          <Logo />
          <div className="md:flex flex-col pt-10 hidden items-start w-full relative">
            {navItems.map((item, index) => {
              return (
                <>
                  {item.button ? (
                    <div className="w-full pl-8">
                      <Button
                        decoration="fill"
                        size="small"
                        onClick={item.onClick}
                      >
                        {item.name}
                      </Button>
                    </div>
                  ) : (
                    <>
                      <NavbarItem
                        key={index}
                        name={item.name}
                        icon={item.icon}
                        link={item.link}
                        route={router.asPath}
                      />
                    </>
                  )}
                </>
              );
            })}
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
        </div>
      </nav>
      <SidebarMobile
        initialFocus={refSidebarMobile}
        setSidebarOpen={setSidebarOpen}
        sidebarOpen={sidebarOpen}
        navItems={navItems}
      />
      <div
        className="bg-overlay md:px-10 px-6 w-full rounded-xl"
        style={styles.content}
      >
        {children}
      </div>
    </div>
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
    <div className="md:py-0 py-2 pl-8 flex gap-1 cursor-pointer md:w-full">
      <img
        className="md:hidden block md:h-12 md:w-12 h-10 w-10"
        src={"/icons/logo_simple.svg"}
        alt="logo"
      />
      <img
        className="md:block hidden h-12"
        src={"/icons/logo.svg"}
        alt="logo"
      />
    </div>
  </Link>
);

export const NavbarItem = ({ name, link, route, icon }) => {
  return (
    <Link href={link}>
      <React.Fragment>
        <div className="h-4 w-full bg-white">
          <div
            className={clsx("h-full relative bg-primary", {
              "rounded-br-[1000px]": link === route,
            })}
          ></div>
        </div>

        <a
          className={clsx(
            { "text-white": link !== route },
            { "bg-white text-primary rounded-l-full": link === route },
            "pl-8 xl:pr-12 pr-8 py-2 relative w-full",
          )}
          href={link}
        >
          <div className={clsx("gap-2 flex items-center")}>
            <div className="flex items-center md:text-[46px] text-[38px]">
              {icon}
            </div>
            <h3 className={clsx("md:text-xl text-lg font-bold")}>{name}</h3>
          </div>
        </a>
        <div className="h-4 w-full bg-white">
          <div
            className={clsx("h-full relative bg-primary", {
              "rounded-tr-[1000px]": link === route,
            })}
          ></div>
        </div>
      </React.Fragment>
    </Link>
  );
};
