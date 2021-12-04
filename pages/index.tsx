import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import Footer from "../components/Footer";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Brandon Villa</title>
        <meta name="description" content="Brandon villa personal website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.main__introduction}>
          <h1>My Personal Website</h1>
          <p>
            By - <strong>Brandon Villa</strong>
          </p>
          <a href="#posts">Go to my posts</a>
        </div>
        <Posts />
      </main>
      <Footer />
    </div>
  );
};

function Posts() {
  return (
    <section id="posts">
      <h2>My Posts</h2>
      <div className={styles.main__posts}>
        <Card
          title="Module Federation"
          description="A first look into Module Federation"
          image="/module-federation.png"
          url="/posts/module-federation"
        />
        <Card
          title="Golang for JS Devs"
          description="My personal notes to learn the basics of Go"
          image="/golang.png"
          url="/posts/golang-notes"
        />
        <Card
          title="Build a website in one day"
          description="How I built my personal website in one day..."
          image="/webdev.png"
          url="/posts/build-a-website"
        />
      </div>
    </section>
  );
}

interface CardProps {
  title: string;
  description: string;
  image: string;
  url: string;
}

function Card(props: CardProps) {
  const { title, description, image, url } = props;
  const router = useRouter();
  const goToPost = () => {
    router.push(url);
  };
  return (
    <div className={styles.card} onClick={goToPost}>
      <Image
        className={styles.card__image}
        src={image}
        alt="Post image"
        width={500}
        height={300}
      />
      <div className={styles.card__container}>
        <strong>{title}</strong>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default Home;
