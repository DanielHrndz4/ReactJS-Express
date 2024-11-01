const AddButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 right-4 bg-indigo-600 text-white text-4xl text-center rounded-full p-5 pt-3 pb-2 shadow-lg hover:bg-indigo-700 transition duration-200"
    >
      +
    </button>
  );
};

export default AddButton;
