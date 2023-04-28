import { type NextPage } from "next";
import Notification from "@ui/Notification";
import { useRouter } from "next/router";
import useJiraRedirect from "~/hooks/useJiraRedirect";
import Page from "~/components/Page";
import { useState } from "react";

const Home: NextPage = () => {
  const router = useRouter();

  const [show, setShow] = useState(true);

  const subdomain = router.query.id?.toString();

  const { errorText, showError, setShowError } = useJiraRedirect(subdomain);

  if (!subdomain) {
    return (
      <>
        <Page />
        <Notification
          title="Loading..."
          message="Please wait..."
          show={show}
          setShow={setShow}
        />
      </>
    );
  }

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
