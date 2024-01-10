import { type FormEvent, Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";

export default function Preferences({
  open,
  setOpen,
  setSubdomain,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  setSubdomain: (subdomain: string) => void;
}) {
  const [customDomain, setCustomDomain] = useState("");
  // get custom domain from local storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const customDomain = localStorage.getItem("customDomain");
      if (customDomain) {
        setCustomDomain(customDomain);
      }
    }
  }, []);

  // save to local storage
  const saveCustomDomain = (e: FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      localStorage.setItem("customDomain", customDomain);
    }
    setSubdomain(customDomain);
    setOpen(false);
  };

  return (
    <>
      <button
        className="absolute right-5 top-5 text-white"
        onClick={() => setOpen(true)}
      >
        <Cog6ToothIcon width={50} height={50} />
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
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
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        {/* Input field for custom domain / prefix of the ticket */}
                        <form
                          className="absolute inset-0 px-4 sm:px-6"
                          onSubmit={saveCustomDomain}
                        >
                          <div>
                            <h3 className="text-lg font-medium leading-6 text-white">
                              Custom domain
                            </h3>
                            <p className="mt-1 text-sm text-gray-300">
                              Enter your custom domain here. This will be used
                              for the redirect.
                            </p>
                          </div>
                          <div className="mt-5 flex">
                            <input
                              type="text"
                              id="customDomain"
                              name="customDomain"
                              className="block w-full rounded-md border-gray-300 bg-gray-700 p-2 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              placeholder="subdomain.atlassian.net"
                              value={customDomain}
                              onChange={(e) => {
                                setCustomDomain(e.target.value);
                              }}
                            />
                          </div>
                          <div className="mt-5 flex">
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
