import UpdateProfileContainer from '@/components/Containers/UpdateProfileContainer';
import {SidebarLayout} from '@/components/SidebarLayout/SidebarLayout';

const ProfilePage = () => {
  return (
    <SidebarLayout currentTab="settings">
      <UpdateProfileContainer />
    </SidebarLayout>
  );
};

export default ProfilePage;
