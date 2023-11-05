import UpdateProfileContainer from '@/components/Containers/UpdateProfileContainer';
import SidebarLayout from '@/components/Layouts/SidebarLayout/SidebarLayout';
import {NextPageWithLayout} from '../_app';
import {ReactElement} from 'react';

const ProfilePage: NextPageWithLayout = () => {
  return <UpdateProfileContainer />;
};

ProfilePage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default ProfilePage;
