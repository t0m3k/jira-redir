import type { NextPage } from "next";
import Head from "next/head";
import Keycap from "./ui/Keycap";
import { Switch } from "@headlessui/react";
import { useEffect, useState } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Page: NextPage = () => {
  const [enabled, setEnabled] = useState(false);

  const changeNewTabStatus = (newStatus: boolean) => {
    const newTab = document.getElementById("newTab") as HTMLInputElement;
    if (newTab) {
      newTab.checked = newStatus;
      setEnabled(newTab.checked);

      // save to local storage
      if (typeof window !== "undefined") {
        localStorage.setItem("newTab", newTab.checked.toString());
      }
    }
  };

  useEffect(() => {
    // get new tab status from local storage
    if (typeof window !== "undefined") {
      const newTabStatus = localStorage.getItem("newTab");
      if (newTabStatus) {
        changeNewTabStatus(newTabStatus === "true");
      }
    }
  }, []);

  return (
    <>
      <Head>
        <title>t90.dev&apos;s Jira Redirect</title>
        <meta
          name="description"
          content="Simple page to redirect directly to Jira issue"
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#0c0a11] to-[#5d0fc4]  selection:bg-none hover:cursor-default">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 py-4 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            <span className="text-[hsl(187,74%,60%)]">Jira</span>{" "}
            <span className="text-red-400">Re</span>direct
          </h1>

          <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-[2.5rem]">
            <input
              type="text"
              id="customKey"
              disabled={true}
              className="bg-transparent text-center text-[hsl(187,74%,60%)]"
            ></input>
          </h1>

          <div className="flex gap-4 sm:grid-cols-2 md:gap-8">
            <div className="relative mt-2 flex items-center text-lg text-gray-100">
              <Keycap>⌘V</Keycap>
              <p className="inset-y-0 right-0 flex items-center p-2 font-bold ">
                OR
              </p>
              <Keycap>Ctrl+V</Keycap>
            </div>
          </div>
        </div>

        {/* Tick box input item for when new tab should be open */}

        <div className="flex flex-col items-center justify-center gap-4 py-4">
          <div className="flex items-center justify-center gap-2">
            <Switch
              checked={enabled}
              onChange={changeNewTabStatus}
              className={classNames(
                enabled ? "bg-red-400" : "bg-gray-200",
                "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
              )}
            >
              <span className="sr-only">Open in new tab</span>
              <span
                aria-hidden="true"
                className={classNames(
                  enabled ? "translate-x-5" : "translate-x-0",
                  "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                )}
              />
            </Switch>

            {/* Invisible placeholder */}
            <input
              type="checkbox"
              name="newTab"
              id="newTab"
              className="hidden"
            />

            <label htmlFor="newTab" className="text-gray-100">
              Open in new tab
            </label>
          </div>
        </div>

        <p className="inset-y-0 right-0 flex items-center pr-2 pt-4 text-sm text-gray-400 hover:cursor-default">
          Made with&nbsp;
          <span className="text-lg hover:animate-ping">❤️</span>
          &nbsp;by&nbsp;
          <a
            href="https://github.com/t0m3k/"
            className="font-bold text-[#a88fe9] underline transition-all hover:text-white"
          >
            Tomasz Tracz
          </a>
        </p>
        <p className="inset-y-0 right-0 flex items-center pr-2 pt-2 text-sm text-gray-400 hover:cursor-default">
          <a
            href="https://github.com/t0m3k/jira-redirect"
            className="font-bold text-[#a88fe9] underline transition-all hover:text-white"
          >
            Source
          </a>
        </p>
      </main>
    </>
  );
};

export default Page;
