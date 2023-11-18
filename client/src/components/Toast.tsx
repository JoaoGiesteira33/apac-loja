export function Toast() {
    return (
        <>
            <div
                id="toast-message-cta"
                className="w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-400"
                role="alert">
                <div className="flex">
                    <img
                        className="w-8 h-8 rounded-full shadow-lg"
                        src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt="Imagem Perfil"
                    />

                    <div className="ml-3 text-sm font-normal">
                        <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                            APCA
                        </span>
                        <div className="mb-2 text-sm font-normal">
                            Olá, em que podemos ajudar? aaaaaaaaaaaaaaaaaaaaaaa
                            aaaaaaaaaaaaaaaaaa
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
