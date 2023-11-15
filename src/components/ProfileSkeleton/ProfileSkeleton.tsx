import {Box, Skeleton, Stack} from '@mui/material';

type ProfileSkeleton = {
  avatarWidth?: string;
  avatarHeight?: string;
  textWidth?: string;
  textHeigth?: string;
};

export const ProfileSkeleton = ({
  avatarWidth = '120px',
  avatarHeight = '120px',
  textHeigth = '23px',
  textWidth = '141px',
}: ProfileSkeleton) => {
  return (
    <Box sx={{width: 1}}>
      <Stack direction="row" sx={{gap: '28px', alignItems: 'end'}}>
        <Skeleton
          variant="circular"
          width={avatarWidth}
          height={avatarHeight}
        />
        <Stack sx={{marginBottom: '15px'}}>
          <Skeleton variant="text" width={textWidth} height={textHeigth} />
          <Skeleton variant="text" width={textWidth} height={textHeigth} />
        </Stack>
      </Stack>
    </Box>
  );
};
