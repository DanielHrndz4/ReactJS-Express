import { useState, useEffect } from "react";
import ListSelector from "../components/home/ListSelector";
import BookList from "../components/home/ItemsList";
import Header from "../components/Header";
import { CreateBookForm } from "../components/forms/CreateBookForm";
import { CreateAuthorForm } from "../components/forms/CreateAuthorForm";
import AddButton from "../components/helper/AddButton";
import useFetch from "../hooks/useFetch";

const Home = () => {
  const [selectedMenu, setSelectedMenu] = useState("books");
  const [active, setActive] = useState(false);
  const [booksData, setBooksData] = useState([]);
  const [authorsData, setAuthorsData] = useState([]);

  //ACA SE DEBE IMPLEMENTAR EL HOOK DE FETCH PARA OBTENER LOS DATOS 
  //Y SE DEBEN ALMACENAR EN LOS ESTADOS DE booksData y authorsData
  //SE DEBE USAR LA VARIABLE DE ENTORNO
  //SE PUEDE UTILIZAR UN USEEFFECT PARA QUE SE EJECUTE ALMACENADO AL CARGAR LA PAGINA
  //EL USEEFFECT DEBE EJECUTARSE UNA SOLA VEZ O CUANDO SE CAMBIE EL VALOR DE selectedMenu O EL VALOR DE data
  const { data, error, loading } = useFetch(
    selectedMenu === "books"
      ? `${import.meta.env.VITE_BASE_URL}/book/books`
      : `${import.meta.env.VITE_BASE_URL}/author/authors`
  );

  useEffect(() => {
    if (selectedMenu === 'books') {
      setBooksData(data || []);
    } else {
      setAuthorsData(data || []);
    }
  }, [selectedMenu, data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  //FIN DE LA IMPLEMENTACION

  const handleMenuSelect = (menu) => {
    setSelectedMenu(menu);
  };

  const toggleForm = () => {
    setActive(!active);
  };

  const handleDelete = (id) => {
    selectedMenu === "books"
      ? setBooksData(booksData.filter((book) => book._id !== id))
      : setAuthorsData(authorsData.filter((author) => author._id !== id));
  }

  const handleUpdate = (update) => {
    selectedMenu === "books"
      ? setBooksData(booksData.map((book) => book._id === update._id ? update : book))
      : setAuthorsData(authorsData.map((author) => author._id === update._id ? update : author));
  }

  return (
    <div className="w-full h-screen">
      <Header />
      <ListSelector
        handleMenuSelect={handleMenuSelect}
        selectedMenu={selectedMenu}
      />
      <main className="p-4">
        {selectedMenu === "books" ? (
          <>
            <BookList items={booksData} selectedMenu={selectedMenu} onDeleted={handleDelete} />
            {active && <CreateBookForm onClose={toggleForm} setBooksData={setBooksData} />}
            <AddButton onClick={toggleForm} />
          </>
        ) : (
          <>
            <BookList items={authorsData} selectedMenu={selectedMenu} onDeleted={handleDelete} />
            {active && <CreateAuthorForm onClose={toggleForm} setAuthorsData={setAuthorsData} />}
            <AddButton onClick={toggleForm} />
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
