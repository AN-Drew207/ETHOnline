import React, { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import Link from "next/link";

import { useRouter } from "next/router";
import { FormOutlined } from "@ant-design/icons";
import { Logo, LogoSidebar, NavbarItemSidebar } from "../../Layouts/index";
import { Button } from "components/common/button";
import { useWeb3React } from "@web3-react/core";

interface LayoutDashboardProps {
  title?: string;
  isLoading?: boolean;
  sidebarOpen?: boolean;
  setSidebarOpen?: any;
  initialFocus?: any;
  navItems?: any;
}
export const SidebarMobileLanding: React.FC<LayoutDashboardProps> = ({
  // title = '',
  // isLoading = false,
  // children,
  sidebarOpen = false,
  setSidebarOpen = {},
  initialFocus = null,
  navItems,
}) => {
  const router = useRouter();
  const { account } = useWeb3React();

  return (
    <>
      {/* Sidebar mobile */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed h-screen top-0 flex z-[1000] bg-overlay"
          open={sidebarOpen}
          onClose={setSidebarOpen}
          initialFocus={initialFocus}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 z-0 blur-xl bg-transparent-color-gray-200" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="bg-primary relative flex-1 flex flex-col max-w-xs w-full w-64">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    className="ml-1 text-white border  border-primary rounded-full bg-primary flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-1 h-0 py-10 overflow-y-auto">
                <nav className="flex-1 px-7">
                  <Link href="/">
                    <a className={clsx("cursor-pointer w-full")}>
                      <LogoSidebar />
                    </a>
                  </Link>
                  {navItems?.map((item, index) => {
                    return item.button ? (
                      <div className="w-full xl:pl-8 pl-0 flex items-center xl:justify-start md:justify-center justify-start items-start">
                        {account ? (
                          item.element
                        ) : (
                          <Button
                            href="/app/login"
                            decoration="fill"
                            size="small"
                          >
                            Log In
                          </Button>
                        )}
                      </div>
                    ) : (
                      <div
                        className={clsx(
                          {
                            ["opacity-100"]: router.asPath === item.link,
                          },
                          {
                            ["opacity-75"]: router.asPath !== item.link,
                          },
                        )}
                        key={"nav-mobile-" + index}
                      >
                        <NavbarItemSidebar
                          key={index}
                          name={item.name}
                          icon={item.icon}
                          link={item.link}
                          route={router.asPath}
                          onClick={() => setSidebarOpen(false)}
                        />
                        <div className="divider mx-3 mt-4"></div>
                      </div>
                    );
                  })}
                  <button
                    onClick={() => router.push("/app")}
                    className="btnLanding rounded-md Poppins px-6 py-2 hover:text-secondary hover:border-secondary text-white bg-secondary border border-transparent font-bold"
                  >
                    Try It!
                  </button>
                </nav>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </>
  );
};
