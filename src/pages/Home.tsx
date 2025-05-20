import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center  ">
      <div className="flex flex-col items-center justify-center gap-3">
        <h2 className="font-bold text-4xl ">
          Never Lose a Link Again , Everything You Save All in One Place.
        </h2>
        <div>
          <p className="px-72">
            Save, organize, and access your favorite websites effortlessly.
            Whether you're researching, planning, or just browsing, BookmarkFlow
            keeps everything just a click away.
          </p>
        </div>
      </div>

      <div className="flex justify-center items-center gap-3 mt-3">
        <Link to="/login">
          <Button className="px-6 py-3 text-base rounded-none">Login</Button>
        </Link>
        <Link to="/signup">
          <Button>signup</Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
