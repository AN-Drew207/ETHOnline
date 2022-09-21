import AppLayout from "components/Layouts";
import ProfileComponent from "components/Profile/MyProfile";
import ProfileOtherUserComponent from "components/Profile/ProfileOtherUser";

const Home = () => {
  return (
    <>
      <AppLayout>
        <ProfileOtherUserComponent />
      </AppLayout>
    </>
  );
};

export default Home;
