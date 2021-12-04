import { useRouter } from "next/router";
import ErrorPage from "next/error";
import {
  getPostBySlug,
  getAllPosts,
  markdownToHtml,
} from "../../utils/markdown-parser";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import stylesPost from "../../styles/Post.module.css";
import Footer from "../../components/Footer";

function Post({ post }: any): JSX.Element {
  const router = useRouter();

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <article className={styles.article}>
      <Head>
        <title>{post.title}</title>
      </Head>

      <main className={styles.main}>
        <Image
          className={styles.card__image}
          src={post.coverImage}
          alt="Post cover image"
          width={800}
          height={300}
        />
        <h1 className={stylesPost.title}>{post.title}</h1>
        <p className={stylesPost.description}>{post.description}</p>
        <div className={stylesPost.main__post_content} dangerouslySetInnerHTML={{ __html: post.content }} />
      </main>
      <Footer />
    </article>
  );
}

export async function getStaticProps({ params }: any) {
  const post = getPostBySlug(params.slug, [
    "title",
    "description",
    "slug",
    "content",
    "coverImage",
  ]);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}

export default Post;
