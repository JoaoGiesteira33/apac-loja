import Box from '@mui/system/Box';

export default function ProfileThumbnail(props: {
    title: string;
    description: string;
    icon: JSX.Element;
}) {
    return (
        <Box
            color={'secondary'}
            component="div"
            className="mx-auto mb-10 rounded-xl shadow-md overflow-hidden max-w-xs md:max-w-md">
            <Box component="div" className="flex">
                <Box
                    component="div"
                    className="shrink-0 flex items-center justify-center px-2">
                    {props.icon}
                </Box>
                <Box component="div" className="p-2 pr-8">
                    <p className="block mt-1 text-lg leading-tight font-medium">
                        {props.title}
                    </p>
                    <p className="mt-2">{props.description}</p>
                </Box>
            </Box>
        </Box>
    );
}
