export default function Hero() {
    return (
        <div className="flex flex-col md:flex-row md:items-stretch justify-center md:justify-between w-full">
            <div className="flex justify-center">
                <img
                    src="https://picsum.photos/2000/1000"
                    alt="Hero"
                    className="md:max-h-[35rem] w-full h-auto object-cover"
                />
            </div>
            <div className="flex font-poppins p-5 md:p-10 text-[#FFF6DE] bg-[#FF3D00] grow flex-col items-center md:items-start justify-center md:justify-end">
                <h1 className="text-3xl text-center md:text-left md:text-5xl font-bold">
                    Pintar o 7
                </h1>
                <p className="text-center font-light md:text-left mt-2">
                    Uma iniciativa Associação Portuguesa das Artes e da Cultura
                </p>
                <div className="flex flex-col font-light md:flex-row md:items-center mt-6">
                    <a
                        href="#"
                        className="px-8 py-2 border-[1px] border-inherit">
                        saber mais
                    </a>
                </div>
            </div>
        </div>
    );
}
