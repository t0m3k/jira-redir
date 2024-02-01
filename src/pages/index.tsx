import { type NextPage } from "next";
import Notification from "@ui/Notification";
import { useRouter } from "next/router";
import useJiraRedirect from "~/hooks/useJiraRedirect";
import Page from "~/components/Page";
import { useEffect, useState } from "react";

type LoadingState = {
  status: "loading";
};

type NotSetState = {
  status: "not-set";
};

type LoadedState = {
  status: "loaded";
  subdomain: string;
};

export type SubdomainState = LoadingState | NotSetState | LoadedState;

const Home: NextPage = () => {
  const router = useRouter();
  const [subdomain, setSubdomain] = useState<SubdomainState>({
    status: "loading",
  });

  useEffect(() => {
    const searchParams = (key: string) => {
      return router.query[key] ? router.query[key]?.toString() : "";
    };
    const getSubdomain = (): SubdomainState => {
      // check if subdomain is saved in local storage
      if (typeof window !== "undefined") {
        const customDomain = localStorage.getItem("customDomain");
        if (customDomain) {
          return { status: "loaded", subdomain: customDomain };
        }
      }

      const paramsSubdomain = searchParams("subdomain");

      if (paramsSubdomain !== undefined && paramsSubdomain !== "") {
        return { status: "loaded", subdomain: paramsSubdomain };
      } else if (
        process.env.NEXT_PUBLIC_SUBDOMAIN !== undefined &&
        process.env.NEXT_PUBLIC_SUBDOMAIN !== ""
      ) {
        return {
          status: "loaded",
          subdomain: process.env.NEXT_PUBLIC_SUBDOMAIN,
        };
      } else {
        return { status: "not-set" };
      }
    };

    setSubdomain(getSubdomain());
  }, [router.query]);

  const { errorText, showError, setShowError } = useJiraRedirect(subdomain);

  return (
    <>
      <Page setSubdomain={setSubdomain} subdomain={subdomain} />
      <Notification
        title={errorText[0]}
        message={errorText[1]}
        show={showError}
        setShow={setShowError}
      />
    </>
  );
};

export default Home;
