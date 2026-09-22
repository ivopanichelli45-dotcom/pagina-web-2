function Header() {
  return (
    <header className="bg-black border-b border-zinc-800">

      <div className="max-w-7xl mx-auto px-4 py-5">

        <div className="flex flex-col lg:flex-row items-center gap-5">

          {/* Logo */}
          <div className="flex items-center gap-3">

            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-black font-black text-2xl">
                U
              </span>
            </div>

            <div>
              <h1 className="text-3xl font-black text-white">
                ULTRA<span className="text-green-500">TECH</span>
              </h1>

              <p className="text-xs text-zinc-500">
                HARDWARE & TECNOLOGÍA
              </p>
            </div>

          </div>

          {/* Buscador */}
          <div className="flex-1 w-full max-w-2xl">

            <div className="relative">

              <input
                type="text"
                placeholder="Buscar productos..."
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-5 py-3 text-white outline-none focus:border-green-500"
              />

              <button
                className="absolute right-0 top-0 h-full px-5 bg-green-500 hover:bg-green-400 text-black rounded-r-lg font-bold"
              >
                🔍
              </button>

            </div>

          </div>

          {/* Cuenta y carrito */}
          <div className="flex items-center gap-3">

            <button className="hidden md:flex items-center gap-2 px-3 py-2 text-zinc-300 hover:text-green-500">

              <span className="text-2xl">
                👤
              </span>

              <div>
                <p className="text-xs text-zinc-500">
                  Mi cuenta
                </p>

                <p className="text-sm font-semibold">
                  Ingresar
                </p>
              </div>

            </button>

            <button className="relative bg-zinc-900 border border-zinc-700 hover:border-green-500 rounded-lg p-3">

              <span className="text-2xl">
                🛒
              </span>

              <span className="absolute -top-2 -right-2 bg-green-500 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>

            </button>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Header;