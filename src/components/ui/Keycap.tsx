export default function Keycap({ children }: { children: React.ReactNode }) {
  return (
    <div className="inset-y-0 right-0 flex">
      <kbd className="m-1 inline-flex items-center justify-center rounded border border-gray-200 p-1.5 font-sans text-sm font-bold text-gray-200">
        {children}
      </kbd>
    </div>
  );
}
