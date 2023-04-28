import { type NextPage } from "next";
import Notification from "@ui/Notification";
import { useRouter } from "next/router";
import useJiraRedirect from "~/hooks/useJiraRedirect";
import Page from "~/components/Page";

const Home: NextPage = () => {
  const router = useRouter();

  const searchParams = (key: string) => {
    return router.query[key] ? router.query[key]?.toString() : "";
  };

  const getSubdomain = () => {
    if (searchParams("subdomain") !== "") {
      return searchParams("subdomain");
    } else if (process.env.NEXT_PUBLIC_SUBDOMAIN !== "") {
      return process.env.NEXT_PUBLIC_SUBDOMAIN;
    } else {
      return;
    }
  };

  const subdomain = getSubdomain();

  const { errorText, showError, setShowError } = useJiraRedirect(subdomain);

  return (
    <>
      <Page />
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
