import Navbar from "./Navbar";
import Post from "./Post";

export default function App() {
  return(
    <>
    <Navbar />
    <Post user={"w"} content={"h"} tags={["3", "3", "4"]}/>
    </>
  )
}