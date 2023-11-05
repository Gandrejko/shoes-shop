import UpdateProfileContainer from '@/components/Containers/UpdateProfileContainer';
import {NextPageWithLayout} from '../_app';
import {ReactElement} from 'react';
import {SidebarLayout} from '@/components/SidebarLayout/SidebarLayout';

const ProfilePage: NextPageWithLayout = () => {
  return <UpdateProfileContainer />;
};

ProfilePage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout currentTab="settings">{page}</SidebarLayout>;
};

export default ProfilePage;
