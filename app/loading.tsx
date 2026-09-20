export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-8 px-4 py-12">
      <div className="sk h-7 w-2/3 max-w-md" />
      <div className="sk h-16 w-full max-w-xl" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="sk h-40" />
        <div className="sk h-40" />
        <div className="sk h-40" />
      </div>
      <div className="sk h-72 w-full" />
    </div>
  );
}