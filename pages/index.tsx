import { useQuery, gql } from '@apollo/client';

const Home = () => {
  const { loading, error, data } = useQuery(gql`
    query getAllProducts {
      products {
        id
        name
        price
        slug
      }
    }
  `);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{JSON.stringify(error)}</div>;
  return (
    <>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
};

export default Home;
