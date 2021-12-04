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
          <Image
            className={styles.main__picture}
            src="/brandon.png"
            alt="Brandon image"
            width={300}
            height={300}
          />
          <h1>{"Hello! I'm Brandon Villa"}</h1>
          <p>
            I am a Software Engineer which loves to learn new things that help
            me to grow my skills as an engineer. I am a very enthusiastic person
            and I always try to get involved in interesting projects where I can
            collaborate with awesome people.
          </p>
          <div className={styles.main__social}>
            <a
              href="https://www.linkedin.com/in/brandon-villa-622522155/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            {" · "}
            <a
              href="https://twitter.com/brandonVilCa21"
              target="_blank"
              rel="noreferrer"
            >
              Twitter
            </a>
            {" · "}
            <a
              href="https://github.com/brandonvilla21"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>
          <strong>
            <a className={styles.main__button} href="#posts">See my latest posts!</a>
          </strong>
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
      <h2 className={styles.posts__title}>My Posts</h2>
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
          description="How I built my personal website in one day"
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
