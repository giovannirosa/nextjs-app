import Head from 'next/head';
import { useRouter } from 'next/router';
import NewMeetupForm from '../components/meetups/NewMeetupForm';

const NewMeetup = () => {
  const router = useRouter();

  const addMeetuptHandler = async data => {
    console.log(data);
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();

    console.log(json);

    router.push('/');
  };

  return (
    <>
      <Head>
        <title>Add a New Meetup</title>
        <meta
          name="description"
          content="Add your own meetups and create amzing networking opportunities."
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetuptHandler} />
    </>
  );
};

export default NewMeetup;
