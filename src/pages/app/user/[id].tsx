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

export async function getStaticPaths() {
  const paths = ["1"].map((b: any) => {
    return { params: { id: "1" } };
  });
  return {
    paths: paths,
    fallback: false, // can also be true or 'blocking'
  };
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps() {
  // const { query } = useRouter();

  return {
    // Passed to the page component as props
    props: {},
  };
}

export default Home;
