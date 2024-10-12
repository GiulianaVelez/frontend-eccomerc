
import SearchIcon from '@mui/icons-material/Search';

function Busqueda({filtro, setFiltro  }) {


  return (
    <div className="flex items-center border border-pink-500 rounded-lg overflow-hidden">
    <div className="flex items-center p-2 bg-pink-500">
      <SearchIcon className="text-white" />
    </div>
    <input
      type="text"
      className="p-2 w-full focus:outline-none"
      placeholder="Buscar productos"
      value={filtro}
      onChange={(e) => setFiltro(e.target.value)}
    />
    </div>
  );
}

export default Busqueda;