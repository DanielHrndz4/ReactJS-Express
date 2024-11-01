import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import useUpdate from "../../hooks/useUpdate";

const EditModal = ({ context, label, setVisibility, elementId }) => {
  const [itemSelect, setItemselect] = useState("");

  //SE DEBE IMPLEMENTAR EL HOOK DE FETCH PARA OBTENER LOS DATOS
  const { data, error, loading } = useFetch(
    context === "author"
      ? `${import.meta.env.VITE_BASE_URL}/book/books`
      : `${import.meta.env.VITE_BASE_URL}/author/authors`
  );

  console.log(data);
  //SE DEBE IMPLEMENTAR EL HOOK DE UPDATE useUpdate
  //SE DEBE USAR LA VARIABLE DE ENTORNO

  const { updateData, updateError, updateLoading } = useUpdate(
    context === "libro"
      ? `${import.meta.env.VITE_BASE_URL}/book/${itemSelect}`
      : `${import.meta.env.VITE_BASE_URL}/author/${itemSelect}`
  );

  const handleSubmit = async () => {
    try {
      await updateData(elementId);
      alert('success');
    } catch (e) {
      alert(e)
    }
  };

  useEffect(()=>{
    console.log(elementId);
    console.log(itemSelect);
  },[itemSelect])

  //SE DEBE ENVIAR EL ID DEL ELEMENTO A ACTUALIZAR CON LA FUNCION QUE PROPORCIONA EL HOOK useUpdate
  //SE DEBE MANEJAR EL ESTADO DE LA RESPUESTA Y EL ERROR
  const handleSubmitUpdate = async () => {
    try {
      setVisibility(false);
    } catch (e) {
    }
  };

  const handleCancel = () => {
    setVisibility(false);
  };

  if (error) alert("Error al cargar los datos del servidor");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">{`Editando el ${context} ${label}`}</h2>
        {loading && <p>Loading...</p>}
        {!data && <p className="font-bold">No hay datos</p>}

        <div className="flex justify-center items-center gap-5 p-5">
          <select
            value={itemSelect}
            onChange={(e) => setItemselect(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="" disabled>
              Seleccionar {context}
            </option>
            {data &&
              data.map((item) => {
                return (
                  <option key={item._id} value={item._id} onClick={()=>setItemselect(item._id)}>
                  {context === "book" ? item.name : item.title}
                </option>
                )
              })}
          </select>
          <button className="bg-gray-300 text-black p-3 rounded" onClick={()=>handleSubmit()}>
            Agregar
          </button>
        </div>
        <div className="flex justify-center">
          <button
            className="bg-green-700 text-white px-4 py-2 rounded mr-2"
            onClick={handleSubmitUpdate}
          >
            Confirmar
          </button>
          <button
            className="bg-gray-300 text-black px-4 py-2 rounded"
            onClick={handleCancel}
          >
            Salir
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
