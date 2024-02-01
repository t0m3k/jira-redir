import { type NextPage } from "next";
import Notification from "@ui/Notification";
import { useRouter } from "next/router";
import useJiraRedirect from "~/hooks/useJiraRedirect";
import Page from "~/components/Page";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const router = useRouter();
  const [subdomain, setSubdomain] = useState<string | undefined>(undefined);

  useEffect(() => {
    const searchParams = (key: string) => {
      return router.query[key] ? router.query[key]?.toString() : "";
    };
    const getSubdomain = () => {
      // check if subdomain is saved in local storage
      if (typeof window !== "undefined") {
        const customDomain = localStorage.getItem("customDomain");
        if (customDomain) {
          return customDomain;
        }
      }

      if (searchParams("subdomain") !== "") {
        return searchParams("subdomain");
      } else if (process.env.NEXT_PUBLIC_SUBDOMAIN !== "") {
        return process.env.NEXT_PUBLIC_SUBDOMAIN;
      } else {
        return undefined;
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
