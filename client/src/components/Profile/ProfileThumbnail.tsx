export default function ProfileThumbnail(props: {
    title: string;
    description: string;
    icon: JSX.Element;
}) {
    return (
        <div className="mx-auto bg-gray-200 mb-10 rounded-xl shadow-md overflow-hidden max-w-xs md:max-w-md">
            <div className="flex">
                <div className="shrink-0 flex items-center justify-center px-2">
                    {props.icon}
                </div>
                <div className="p-2">
                    <p className="block mt-1 text-lg leading-tight font-medium text-black">
                        {props.title}
                    </p>
                    <p className="mt-2 text-slate-500">{props.description}</p>
                </div>
            </div>
        </div>
    );
}
