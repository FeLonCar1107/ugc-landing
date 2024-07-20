export default function Loader() {
  return (
    <div className="loader">
      <div className="modelViewPort">
        <div className="eva">
          <div className="head-eva">
            <div className="eyeChamber-eva">
              <div className="eye-eva"></div>
              <div className="eye-eva"></div>
            </div>
          </div>
          <div className="body-eva">
            <div className="hand-eva"></div>
            <div className="hand-eva"></div>
            <div className="scannerThing"></div>
            <div className="scannerOrigin"></div>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center py-4">
        <p className="m-auto text-jazzberry-jam-800 font-semibold">Cargando...</p>
      </div>
    </div>
  );
}
