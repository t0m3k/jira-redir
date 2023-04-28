export default function Keycap({ children }: { children: React.ReactNode }) {
  return (
    <div className="inset-y-0 right-0 flex">
      <kbd className="m-1 inline-flex items-center justify-center rounded-lg border border-gray-200 px-1.5 py-1 font-sans font-bold text-gray-200">
        {children}
      </kbd>
    </div>
  );
}
