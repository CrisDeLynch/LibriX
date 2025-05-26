import Navbar from "../components/Navbar";
import Biblioteca from "../components/Library";
import Footer from "../components/Footer"; 

const Books = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <div className="libros">
          <Biblioteca />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Books;
