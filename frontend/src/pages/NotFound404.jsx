import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <section className="flex items-center h-full p-16= dark:text-gray-100">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl text-black">
            Sorry, we couldn't find this page.
          </p>

          <p className="mt-4 mb-8 dark:text-gray-400">
            But dont worry, you can find plenty of other things on our homepage.
          </p>
          <Link
            rel="noopener noreferrer"
            to={"/"}
            className="px-8 py-3 font-semibold rounded dark:bg-purple-600 dark:text-white-900"
          >
            Back to homepage
          </Link>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </section>
  );
}
