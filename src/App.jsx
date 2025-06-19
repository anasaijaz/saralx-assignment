import { Helmet } from "react-helmet";
import ImageCarousel from "./components/ImageCarousel";

function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-5">
      <Helmet>
        <title>Interactive Image Carousel - Scenic Houses Collection</title>
        <meta
          name="description"
          content="Explore a beautiful collection of houses from around the world, featuring Icelandic turf houses, mountain cabins, and modern suburban homes. Accessible image carousel with keyboard navigation and screen reader support."
        />
        <meta
          name="keywords"
          content="image carousel, houses, architecture, accessible, slideshow, Icelandic houses, cabins"
        />
      </Helmet>
      <header className="text-center mb-8 text-black">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 text-black">
          Accessible React Image Carousel
        </h1>
        <p className="text-lg md:text-xl text-gray-800 font-medium">
          Built with react-slideshow-image, Tailwind CSS & full accessibility
          support
        </p>
      </header>
      <main className="w-full max-w-5xl" role="main">
        <ImageCarousel />
      </main>
    </div>
  );
}

export default App;
