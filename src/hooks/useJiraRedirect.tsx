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
      setError("Loading base domain...", "Please wait..");
      return;
    }

    let baseDomain = subdomain;

    // make sure base domains start with https://
    if (!baseDomain.startsWith("https://")) {
      baseDomain = `https://${baseDomain}`;
    }

    // make sure base doesn't end with /
    if (baseDomain.endsWith("/")) {
      baseDomain = baseDomain.slice(0, -1);
    }

    const sanitizeAndRedirect = (value: string) => {
      const sanitizedValue = value.replace(/\s/g, "");
      if (
        sanitizedValue.length < 2 ||
        sanitizedValue.length > 15 ||
        !/^[A-Z]+-[0-9]+$/.test(sanitizedValue)
      ) {
        setError("Error", "It doesn't look like a Jira issue key.");
        return;
      }

      const openInNewTab = document.getElementById(
        "newTab"
      ) as HTMLInputElement;
      if (openInNewTab.checked) {
        window.open(`${baseDomain}/${sanitizedValue}`);
        (document.getElementById("customKey") as HTMLInputElement).value = "";
      } else {
        window.location.href = `${baseDomain}/${sanitizedValue}`;
      }
    };

    setShowError(false);

    const listener = (e: ClipboardEvent) => {
      const clip = e.clipboardData?.getData("text");

      if (clip && clip !== "") {
        try {
          const url = new URL(clip);
          if (url.hostname === `${baseDomain}`) {
            const searchParams = url.search.split("&");
            const issue =
              searchParams
                .find((param) => param.includes("selectedIssue"))
                ?.split("=")[1] || "";

            if (issue !== "") {
              sanitizeAndRedirect(issue);
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
          sanitizeAndRedirect(clip);
        }
      } else {
        setError("Error", "Clipboard is empty.");
        return;
      }
    };

    document.addEventListener("paste", listener);

    const typeListener = (e: KeyboardEvent) => {
      const customKey = document.getElementById(
        "customKey"
      ) as HTMLInputElement;

      if (e.ctrlKey || e.metaKey) {
        return;
      }

      if (e.key === " ") {
        const openInNewTab = document.getElementById(
          "newTab"
        ) as HTMLInputElement;
        openInNewTab.click();
        return;
      }

      if (e.key === "Escape") {
        customKey.value = "";
        return;
      }

      if (e.key === "Enter") {
        sanitizeAndRedirect(customKey.value);
        return;
      }

      if (e.key === "Backspace") {
        if (customKey.value.length === 0) {
          customKey.value = "";
        } else {
          customKey.value = customKey.value.slice(0, -1);
        }
        return;
      }

      if (customKey.value.length > 14) {
        setError("Error", "Jira issue key can't be longer than 15 characters.");
        return;
      }

      const customKeyLastChar = customKey.value.at(-1);
      const lastCharIsDash = customKeyLastChar === "-";
      const lastCharIsLetter = customKeyLastChar?.match(/[a-z]/i);
      const lastCharIsNumber = customKeyLastChar?.match(/[0-9]/i);

      const newCharIsValid = e.key.length === 1 && e.key.match(/[a-z0-9\-]/i);
      const newCharIsDash = e.key === "-";
      const newCharIsLetter = e.key.match(/[a-z]/i);
      const newCharIsNumber = e.key.match(/[0-9]/i);

      if (newCharIsValid) {
        if (customKey.value.length === 0) {
          if (!newCharIsLetter) {
            return;
          }
        }

        if (lastCharIsDash || lastCharIsNumber) {
          if (newCharIsDash || newCharIsLetter) {
            return;
          }
        }

        if (lastCharIsLetter) {
          if (newCharIsNumber && customKey.value.length < 14) {
            customKey.value += "-";
          }
        }

        customKey.value += e.key.toUpperCase();
      }
    };

    document.addEventListener("keydown", typeListener);

    return () => {
      document.removeEventListener("paste", listener);
      document.removeEventListener("keydown", typeListener);
    };
  }, [subdomain]);

  return { errorText, showError, setShowError };
};

export default useJiraRedirect;
