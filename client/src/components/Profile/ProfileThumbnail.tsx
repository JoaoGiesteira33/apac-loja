import { Paper, useTheme } from '@mui/material';
import Box from '@mui/system/Box';

type ProfileThumbnailProps = {
  title: string;
  description: string;
  icon: JSX.Element;
}

export default function ProfileThumbnail(props: ProfileThumbnailProps) {
  const theme = useTheme();

  return (
    <Paper
      component="div"
      className="mx-auto mb-10 overflow-hidden max-w-xs md:max-w-md">
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
    </Paper>
  );
}
