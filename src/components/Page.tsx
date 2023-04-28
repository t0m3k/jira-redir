import type { NextPage } from "next";
import Head from "next/head";
import Keycap from "./ui/Keycap";

const Page: NextPage = () => (
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
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          <span className="text-[hsl(187,74%,60%)]">Jira</span>{" "}
          <span className="text-red-400">Re</span>direct
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

      <p className="inset-y-0 right-0 flex items-center pr-2 text-sm text-gray-400 hover:cursor-default">
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

export default Page;
