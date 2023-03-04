import Head from "next/head";

export const Page1 = () => {
  return <div className="h-[500px] w-full bg-blue-500">Page1</div>;
};

export const Page2 = () => {
  return <div className="h-[500px] w-full bg-blue-600">Page2</div>;
};

export const Page3 = () => {
  return <div className="h-[500px] w-full bg-blue-700">Page3</div>;
};

export const Page4 = () => {
  return <div className="h-[500px] w-full bg-blue-800">Page4</div>;
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Cue Breakers</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-full w-full bg-blue-200">
        <Page1></Page1>
        <Page2></Page2>
        <Page3></Page3>
        <Page4></Page4>
      </main>
    </>
  );
}