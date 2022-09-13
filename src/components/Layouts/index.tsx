import React from "react";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import clsx from "clsx";
import { Button } from "../common/button/button";
import { SidebarMobile } from "./sidebars/mobile";
import {
  BellOutlined,
  FormOutlined,
  HomeOutlined,
  MessageOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import WalletModal from "components/WalletModal";
import { useWeb3React } from "@web3-react/core";

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

const AppLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const { account } = useWeb3React();
  const refSidebarMobile = React.useRef(null);
  const router = useRouter();

  console.log(account, "xd");

  return (
    <div
      style={{
        minHeight: "100vh",
        // overflow: "auto",
      }}
      className={clsx(
        { ["!flex-col"]: router.asPath === "/messages" },
        "flex md:flex-row flex-col relative md:bg-primary md:p-4",
      )}
    >
      {router.asPath === "/messages" ? (
        <nav
          className={clsx(
            "w-full shrink-0 px-8 flex flex-row items-center md:pb-4 md:py-0 py-2 bg-primary",
          )}
        >
          <div className="flex items-center justify-between w-full sticky top-12">
            <Logo />
            <div
              className="flex cursor-pointer"
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
      ) : (
        <nav
          className={clsx(
            "xl:w-auto md:w-40 xl:w-80  w-full shrink-0 xl:pl-10 md:pl-0 pl-8 flex md:flex-col flex-row items-center md:py-8 py-2 bg-primary md:pr-0 pr-8",
          )}
        >
          <div className="flex md:flex-col items-center md:justify-start justify-between w-full sticky top-12">
            <Logo />
            <div className="md:flex flex-col pt-10 hidden items-start w-full relative">
              {navItems.map((item, index) => {
                return (
                  <>
                    {item.button ? (
                      <div className="w-full xl:pl-8 md:pl-0 pl-8 flex items-center xl:justify-start md:justify-center">
                        <Button
                          decoration="fill"
                          size="small"
                          onClick={item.onClick}
                        >
                          <FormOutlined className="text-white xl:hidden md:flex hidden text-2xl" />

                          <p className="xl:block md:hidden block">
                            {item.name}
                          </p>
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
              className="md:hidden flex cursor-pointer"
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
      )}
      <SidebarMobile
        initialFocus={refSidebarMobile}
        setSidebarOpen={setSidebarOpen}
        sidebarOpen={sidebarOpen}
        navItems={navItems}
      />
      <div
        className={clsx(
          { ["md:px-10 px-6"]: router.asPath !== "/messages" },
          "bg-overlay  w-full rounded-xl",
        )}
        style={styles.content}
      >
        {children}
      </div>
      <WalletModal showModal={!Boolean(account)} setShowModal={() => 1} />
    </div>
  );
};

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
  <Link href="/">
    <div className="md:py-0 py-2 xl:pl-8 md:pl-0 pl-8 flex gap-1 cursor-pointer xl:w-full md:w-auto ">
      <img
        className="xl:hidden block md:h-12 md:w-12 h-10 w-10"
        src={"/icons/logo_simple.svg"}
        alt="logo"
      />
      <img
        className="xl:block hidden h-12"
        src={"/icons/logo.svg"}
        alt="logo"
      />
    </div>
  </Link>
);

export const LogoSidebar = () => (
  <Link href="/">
    <div className="md:py-0 py-2 md:pl-0 pl-8 flex gap-1 cursor-pointer xl:w-full md:w-auto ">
      <img
        className="xl:hidden block md:h-12 md:w-12 h-10 w-10"
        src={"/icons/logo_simple.svg"}
        alt="logo"
      />
      <img
        className="xl:block hidden h-12"
        src={"/icons/logo.svg"}
        alt="logo"
      />
    </div>
  </Link>
);

export const NavbarItem = ({ name, link, route, icon }) => {
  return (
    <React.Fragment>
      <div className="h-4 w-full md:block hidden bg-white">
        <div
          className={clsx("h-full  relative bg-primary", {
            "rounded-br-[1000px]": link === route,
          })}
        ></div>
      </div>
      <Link href={link}>
        <a
          className={clsx(
            { "text-white": link !== route },
            {
              "md:bg-white md:text-primary text-white rounded-l-full":
                link === route,
            },
            "pl-8 xl:pr-12 pr-8 py-2 relative w-full",
          )}
          // href={link}
        >
          <div
            className={clsx(
              "gap-2 flex items-center xl:justify-start md:justify-center",
            )}
          >
            <div className="flex items-center md:text-[46px] text-[38px]">
              {icon}
            </div>
            <h3
              className={clsx(
                "md:text-xl xl:flex md:hidden flex text-lg font-bold",
              )}
            >
              {name}
            </h3>
          </div>
        </a>
      </Link>

      <div className="h-4 md:block hidden w-full bg-white">
        <div
          className={clsx("h-full relative bg-primary", {
            "rounded-tr-[1000px]": link === route,
          })}
        ></div>
      </div>
    </React.Fragment>
  );
};

export const NavbarItemSidebar = ({ name, link, route, icon, onClick }) => {
  return (
    <Link href={link}>
      {/* <React.Fragment> */}
      <a
        className={clsx(
          { "text-white": link !== route },
          {
            "text-white rounded-l-full": link === route,
          },
          "pl-8 xl:pr-12 pr-8 py-2 relative w-full",
        )}
        // href={link}
        onClick={onClick}
      >
        <div className={clsx("gap-2 flex items-center")}>
          <div className="flex items-center md:text-[46px] text-[38px]">
            {icon}
          </div>
          <h3 className={clsx("text-lg font-bold")}>{name}</h3>
        </div>
      </a>
      {/* </React.Fragment> */}
    </Link>
  );
};

export default AppLayout;
