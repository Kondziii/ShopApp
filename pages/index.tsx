import { InferGetStaticPropsType } from 'next';
import { AppCarousel } from '../components/AppCarousel';
import { NewsLetterForm } from '../components/NewsLetterForm';
import { TrustPilot } from '../components/TrustPilot';
import {
  GetCarouselDataDocument,
  GetCarouselDataQuery,
  GetCarouselDataQueryVariables,
} from '../generated/graphql';
import { apolloClient } from '../graphql/graphqlClient';

const Home = ({ slides }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <AppCarousel items={slides} />
      <TrustPilot />
      <NewsLetterForm />
    </>
  );
};

export default Home;

export const getStaticProps = async () => {
  const slides = await apolloClient.query<
    GetCarouselDataQuery,
    GetCarouselDataQueryVariables
  >({
    query: GetCarouselDataDocument,
  });

  return {
    props: {
      slides: slides.data.carousels,
    },
  };
};
