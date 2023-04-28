import { type NextPage } from "next";
import Notification from "@ui/Notification";
import useJiraRedirect from "~/hooks/useJiraRedirect";
import Page from "~/components/Page";

const JiraRedirect: NextPage<{ subdomain: string }> = ({ subdomain }) => {
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

export default JiraRedirect;
