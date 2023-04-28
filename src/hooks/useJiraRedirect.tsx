import { useEffect, useState } from "react";

const useJiraRedirect = (subdomain: string | undefined) => {
  const [errorText, setErrorText] = useState<[string, string]>(["", ""]);
  const [showError, setShowError] = useState<boolean>(false);

  const setError = (title: string, message: string) => {
    setErrorText([title, message]);
    setShowError(true);
  };

  useEffect(() => {
    if (!subdomain || subdomain === "") {
      setError("Error", "Subdomain is not set.");
      return;
    }

    setErrorText(["", ""]);
    setShowError(false);

    const listener = (e: ClipboardEvent) => {
      if (!subdomain || subdomain === "") {
        setError("Error", "Subdomain is not set.");
        return;
      }

      const clip = e.clipboardData?.getData("text");

      if (clip && clip !== "") {
        try {
          const url = new URL(clip);
          if (url.hostname === `${subdomain}.atlassian.net`) {
            const searchParams = url.search.split("&");
            const issue =
              searchParams
                .find((param) => param.includes("selectedIssue"))
                ?.split("=")[1] || "";

            if (issue !== "") {
              window.location.href = `https://${subdomain}.atlassian.net/browse/${issue}`;
            } else {
              setError("Error", "Couldn't find issue key in the URL.");
              return;
            }
          } else {
            setError("Error", "It doesn't look like a Jira issue URL.");
            return;
          }
        } catch (_) {
          // check if it's a Jira issue key
          const sanitizedClip = clip.replace(/\s/g, "");
          if (
            sanitizedClip.length < 2 ||
            sanitizedClip.length > 15 ||
            !/^[A-Z]+-[0-9]+$/.test(sanitizedClip)
          ) {
            setError("Error", "It doesn't look like a Jira issue key.");
            console.log(`Clipboard: ${clip}`); // print the clipboard value before sanitization
            return;
          }
          window.location.href = `https://${subdomain}.atlassian.net/browse/${sanitizedClip}`;
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
  }, [subdomain]);

  return { errorText, showError, setShowError };
};

export default useJiraRedirect;
