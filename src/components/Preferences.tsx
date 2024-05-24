import { type FormEvent, Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { type SubdomainState } from "~/pages";

export default function Preferences({
  open,
  setOpen,
  setSubdomain,
  setProjectId,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  setProjectId: (projectId: string) => void;
  setSubdomain: (subdomain: SubdomainState) => void;
}) {
  const [customDomain, setCustomDomain] = useState("");
  const [customProjectId, setCustomProjectId] = useState("");
  // get custom domain from local storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const customDomain = localStorage.getItem("customDomain");
      if (customDomain) {
        setCustomDomain(customDomain);
      }
      const projectId = localStorage.getItem("projectId");
      if (projectId) {
        setCustomProjectId(projectId);
      }
    }
  }, []);

  // save to local storage
  const saveCustomDomain = (e: FormEvent) => {
    e.preventDefault();

    if (typeof window !== "undefined") {
      localStorage.setItem("customDomain", customDomain);
      localStorage.setItem("projectId", customProjectId);
    }

    setProjectId(customProjectId);

    if (customDomain === "") {
      setSubdomain({ status: "not-set" });
      setOpen(false);
      return;
    }

    setSubdomain({ status: "loaded", subdomain: customDomain });
    setOpen(false);
  };

  return (
    <>
      <button
        className="absolute right-3 top-3 text-white"
        onClick={() => setOpen(true)}
      >
        <Cog6ToothIcon width={30} height={30} />
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-slate-700 bg-opacity-80 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-0" />

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-gray-800 py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-base font-semibold leading-6 text-white">
                            Config
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative rounded-md bg-slate-800 text-white hover:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              onClick={() => setOpen(false)}
                            >
                              <span className="absolute -inset-2.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 py-10 sm:px-6">
                        {/* Input field for custom domain / prefix of the ticket */}
                        <form
                          className="absolute inset-0 px-4 sm:px-6"
                          onSubmit={saveCustomDomain}
                        >
                          <div>
                            <div>
                              <h3 className="text-lg font-medium leading-6 text-white">
                                Enter your Jira base URL
                              </h3>
                              <p className="mt-1 text-sm text-gray-300">
                                This will be used for redirects before the
                                ticket number.
                              </p>
                            </div>
                            <div className="mt-5 flex">
                              <input
                                type="text"
                                id="customDomain"
                                name="customDomain"
                                className="block w-full rounded-md border-gray-300 bg-gray-700 p-2 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder="https://company.atlassian.net/browse"
                                value={customDomain}
                                onChange={(e) => {
                                  setCustomDomain(e.target.value);
                                }}
                              />
                            </div>
                            <div className="space-y-4 p-2 text-sm text-gray-300">
                              <div>
                                <p>
                                  For example, if you can see tickets under URL:
                                </p>
                                <p>
                                  <span className="font-bold text-white">
                                    https://company.atlassian.net/browse
                                  </span>
                                  <span className="text-slate-300">
                                    /ABC-1000
                                  </span>
                                </p>
                              </div>
                              <div>
                                <p>Enter: </p>
                                <p className="font-bold text-white">
                                  https://company.atlassian.net/browse
                                </p>
                              </div>
                              <p>
                                The URL is stored in your browser&apos;s local
                                storage.
                              </p>
                            </div>
                          </div>
                          <div>
                            <div>
                              <h3 className="pt-10 text-lg font-medium leading-6 text-white">
                                Default project ID
                              </h3>
                              <p className="mt-1 text-sm text-gray-300">
                                Enter your most-used project ID (e.g.,{" "}
                                <span className="font-mono font-bold text-white">
                                  SAMPLE
                                </span>
                                ).
                              </p>
                            </div>
                            <div className="mt-5 flex">
                              <input
                                type="text"
                                id="customProjectId"
                                name="customProjectId"
                                className="block w-full rounded-md border-gray-300 bg-gray-700 p-2 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder="SAMPLE"
                                value={customProjectId}
                                onChange={(e) => {
                                  setCustomProjectId(e.target.value);
                                }}
                              />
                            </div>
                            <div className="space-y-4 p-2 text-sm text-gray-300">
                              <div>
                                <p>
                                  For example, if you often work with tickets:
                                </p>
                                <p>
                                  <span className="font-bold text-white">
                                    SAMPLE
                                  </span>
                                  <span className="text-slate-300">-1000</span>
                                </p>
                              </div>
                              <div>
                                <p>Enter: </p>
                                <p className="font-bold text-white">SAMPLE</p>
                              </div>
                              <p>You can then type number and press enter.</p>
                            </div>
                          </div>
                          <div>
                            <h3 className="pt-10 text-lg font-medium leading-6 text-white">
                              Usage
                            </h3>
                            <ul className="ml-4 mt-1 list-disc space-y-2 text-sm text-gray-300">
                              <li className="">
                                Paste the full ticket number (e.g., ABC-1000) to
                                open the ticket in a new tab.
                              </li>
                              <li className="">
                                Type the full ticket number (e.g., TEST-1000)
                                and press Enter.
                              </li>
                              <li className="">
                                Type just the ticket number (e.g., 1000) if
                                using the default project and press Enter.
                              </li>
                            </ul>
                          </div>
                          <div>
                            <h3 className="pt-10 text-lg font-medium leading-6 text-white">
                              Privacy Note
                            </h3>
                            <ul className="ml-4 mt-1 list-disc space-y-2 text-sm text-gray-300">
                              <li className="">
                                No data is sent to any server.
                              </li>
                              <li className="">
                                Everything runs locally on your machine and is
                                stored in your browser’s local storage.
                              </li>
                            </ul>
                          </div>
                          <div className="mt-5 flex pb-10">
                            <button
                              type="submit"
                              className="inline-flex justify-center rounded-md border border-transparent bg-slate-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                              Save
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
