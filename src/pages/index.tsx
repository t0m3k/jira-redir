import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Notification from "~/components/ui/notification";

const Home: NextPage = () => {
  const [errorTitle, setErrorTitle] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);

  const setError = (message: string, title: string) => {
    setErrorMessage(message);
    setErrorTitle(title);
    setShowError(true);
  };

  useEffect(() => {
    const listener = (e: ClipboardEvent) => {
      const clip = e.clipboardData?.getData("text");

      if (clip && clip !== "") {
        try {
          const url = new URL(clip);
          if (url.hostname === "ssalpha.atlassian.net") {
            const searchParams = url.search.split("&");
            const issue =
              searchParams
                .find((param) => param.includes("selectedIssue"))
                ?.split("=")[1] || "";

            if (issue !== "") {
              window.location.href = `https://ssalpha.atlassian.net/browse/${issue}`;
            } else {
              setError("Error", "Couldn't find issue key in the URL.");
              return;
            }
          } else {
            setError("Error", "It doesn't look like a Jira issue URL.");
            return;
          }
        } catch (e) {
          // check if it's a Jira issue key
          if (
            clip.length < 2 ||
            clip.length > 15 ||
            !clip.match(/^[A-Z]+-[0-9]+$/)
          ) {
            setError("Error", "It doesn't look like a Jira issue key.");
            return;
          }
          window.location.href = `https://ssalpha.atlassian.net/browse/${clip}`;
        }
      } else {
        setError("Error", "Clipboard is empty.");
        return;
      }
    };
    document.addEventListener("paste", listener);
    return () => {
      document.removeEventListener("paste", listener);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Tomasz&apos;s Jira Redirect</title>
        <meta
          name="description"
          content="Simple page to redirect directly to Jira issue"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br  from-[#0c0a11] to-[#5d0fc4]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            <span className="text-[hsl(187,74%,60%)]">Jira</span> Redirect
          </h1>

          <div className="flex gap-4 sm:grid-cols-2 md:gap-8">
            <div>
              <div className="relative mt-2 flex items-center">
                <div className=" inset-y-0 right-0 flex py-1.5 pr-1.5">
                  <kbd className="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400">
                    ⌘V
                  </kbd>
                </div>
                <p className=" inset-y-0 right-0 flex items-center pr-2 text-sm text-gray-400">
                  or
                </p>
                <div className=" inset-y-0 right-0 flex py-1.5 pr-1.5">
                  <kbd className="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400">
                    Ctrl+V
                  </kbd>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="inset-y-0 right-0 flex items-center pr-2 text-sm text-gray-400">
          Project on Github: &nbsp;
          <a
            href="https://github.com/t0m3k/jira-redirect"
            className="font-bold text-[#a88fe9] underline"
          >
            jira-redirect
          </a>
        </p>

        <Notification
          title={errorTitle}
          message={errorMessage}
          show={showError}
          setShow={setShowError}
        />
      </main>
    </>
  );
};

export default Home;
