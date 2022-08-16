import { MongoClient, ObjectId } from 'mongodb';
import Head from 'next/head';

import MeetupDetail from '../components/meetups/MeetupDetail';

const MeetupDetails = ({ meetupData }) => {
  return (
    <>
      <Head>
        <title>{meetupData.title}</title>
        <meta name="description" content={meetupData.description} />
      </Head>
      <MeetupDetail
        image={meetupData.image}
        title={meetupData.title}
        address={meetupData.address}
        description={meetupData.description}
      />
    </>
  );
};

export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.MONGODBUSER}:${process.env.MONGODBPASS}@cluster0.uadyylv.mongodb.net/?retryWrites=true&w=majority`,
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map(meetup => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
};

export const getStaticProps = async context => {
  const { meetupId } = context.params;

  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.MONGODBUSER}:${process.env.MONGODBPASS}@cluster0.uadyylv.mongodb.net/?retryWrites=true&w=majority`,
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  console.log(meetupId, meetup);

  client.close();

  return {
    props: {
      meetupData: {
        title: meetup.title,
        image: meetup.image,
        description: meetup.description,
        address: meetup.address,
        id: meetup._id.toString(),
      },
    },
  };
};

export default MeetupDetails;
