import Head from "next/head";
import { MainSection } from "@/components/mainSection";
import { usePageScrollPercentage } from "@/components/hooks/usePageScrollPercentage";
import NoSSR from "@/components/noSSR";
import { useRef } from "react";

const defaultHeight = "h-full";

export const Section2 = () => {
  return (
    <div
      className={`${defaultHeight} snap-child w-full items-center justify-center border-2 border-red-400`}
    >
      <div className=" h-[400px] w-[800px] p-[40px]">
        <div className=" p-5 pl-[400px]">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
        </div>
      </div>
    </div>
  );
};

const Container = () => {
  const mainRef = useRef<HTMLElement>(null);
  const pageProgress = usePageScrollPercentage(mainRef);
  const pagesCount = 5;

  console.log("pageProgress", pageProgress);

  return (
    <div className="relative h-screen w-screen">
      <MainSection pageProgress={pageProgress}></MainSection>
      <main
        style={{ zIndex: 4 }}
        ref={mainRef}
        className="snappy absolute h-full w-full text-white"
      >
        <Section2></Section2>
        <Section2></Section2>
        <Section2></Section2>
        <Section2></Section2>
        <Section2></Section2>
      </main>
    </div>
  );
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
      <Container></Container>
    </>
  );
}
