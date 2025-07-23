import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="relative w-full min-h-screen py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-50 flex items-center justify-center">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-50">
        <div className="h-full w-full bg-[linear-gradient(to_right,#80808025_1px,transparent_1px),linear-gradient(to_bottom,#80808025_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      {/* Content */}
      <div className="container px-4 md:px-6 relative z-10 mx-auto">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gray-200 px-3 py-1 text-sm">
              Save & Organize
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-gray-900">
              Never Lose a Bookmark Again
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
              Save, organize, and access your favorite websites from anywhere.
              Keep your bookmarks synced across all your devices with our simple
              and powerful bookmark manager.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Link to="/signup">
              <button className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-900 disabled:pointer-events-none disabled:opacity-50">
                Sign Up
              </button>
            </Link>

            <Link to="/login">
              <button className="inline-flex h-10 items-center justify-center rounded-md border border-gray-300 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-900 disabled:pointer-events-none disabled:opacity-50">
                Log In
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
