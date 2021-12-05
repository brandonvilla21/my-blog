---
title: 'Build a website'
description: 'How I built my personal website in one day'
coverImage: '/webdev.png'
---


## Using NextJS + Markdown to build my website

In this post, I'm going to explain how I used NextJS and a couple of libraries to add Markdown
into my project in order to write posts easily.

Below, I'll list the tools that I used to build this website: 

- React
- TypeScript
- CSS
- NextJS
- Remark + Remark HTML
- Gray-matter

### ✏️ Why plain CSS?
I didn't want to spend too much time setting up my NextJS project with some Design System library like Material UI or
a set of CSS classes like TailwindCSS, Bulma, etc. Usually, with SPAs you are one `yarn add` away to install it and be
ready to use the tool but with Server-Side Rendering (SSR) you need to make sure that styles are loaded in the proper time so
the setup could take a bit longer. Maybe in the future, once I grow this project, I will use another CSS strategy to scale my
website
### 📝 Before starting the project

I wanted to create something that I could do in one day, so I decided to focus on one single feature I could add to my project
with a minimalist CSS. This feature was the ability to create pages using [**Markdown**](https://www.markdownguide.org/getting-started/#what-is-markdown).

I started to do some research on how I could add Markdown to my project and I found a couple of alternatives with Gatsby and some boilerplate projects of NextJS using Markdown but the reality was that these projects didn't satisfy what I wanted to do. Some projects didn't have TypeScript, others had too much boilerplate in order to just add Markdown support, etc. So I decided to do it from scratch and have better control over this functionality. 

### 👟 First steps

First, I created my project using Create Next App (CNA) `yarn create next-app --typescript`, I used the `--typescript` flag in order to tell CNA to add a `.tsconfig.json ` file to provide support for TS. 

I removed most of the code from the `index.tsx` file and started to create basic components to display my photo, some texts, links, and the component to show my Posts later. At that point, it looked something like this:

![Website image](http://brandonvilla.dev/website.png)

I did a couple of CSS classes in order to accommodate my UI components and have a minimalist look.

### ⚓️ Adding Markdown

> I added Markdown support into my project so I could easily create pages for my posts. 

For this, I installed a couple of libraries. I used `remark` and `remark-html` in order to process my 
Markdown content and convert that into an HTML output that later I could inject it into my website.

This is how I used these libraries in order to parse my content into HTML:
```javascript
import { remark } from "remark";
import remarkHtml from "remark-html";

export async function markdownToHtml(markdown: string) {
  const result = await remark().use(remarkHtml).process(markdown);
  return result.toString();
}
```

And later, I would call this function into my page component and inject it into a div from my React component:
```jsx
export async function getStaticProps({ params }) {
  // more code...
  const content = await markdownToHtml(content);

  return {
    props: {
      post: {
        content,
      },
    },
  };
}

function Post({ post }): JSX.Element {
  return <div dangerouslySetInnerHTML={{ __html: post.content }} />
}
```

This is a very simplified version of what I end up doing. If you want to see the final result, you can go [here](https://github.com/brandonvilla21/my-blog/blob/main/pages/posts/%5Bslug%5D.tsx#L37)


I also used `gray-matter` npm in order to parse front-matter content from my posts. This way I could add some data like title, description, and coverImage to each of my posts to later use that information in my React component.

With `gray-matter`, you can convert this type of files:
```md
---
title: Hello
slug: home
---
<h1>Hello world!</h1>
```

Into this:
```javascript
  {
    content: '<h1>Hello world!</h1>',
    data: { 
      title: 'Hello', 
      slug: 'home' 
    }
  }
```

So it's easier to handle from your JavaScript code. [Here's](https://github.com/brandonvilla21/my-blog/blob/main/utils/markdown-parser.ts#L22) an example of how I used it

### 🗒 Adding my posts

I already had a couple of posts that I've written in the past so I just moved the markdown files to my new website and then rendered those on the main page so users could click on them and render the page:

![Posts image](http://brandonvilla.dev/posts.png)

### 🚀 Deploy using Vercel

The deployment process was very easy! I used [Vercel](https://vercel.com/) to deploy my NextJS project in less than 5 minutes! I just logged into Vercel website, gave GitHub permissions to access my repository and import the project:

![Posts image](http://brandonvilla.dev/vercel-import.png)

After that, it started to deploy my website from my main branch and in less than 5 minutes it was live. Later I added my personal domain [brandonvilla.dev](https://brandonvilla.dev) which I will talk about how to set your domain in another post.

### 🏁 Wrap up

And that's how I was able to put all the pieces together in a couple of hours in order to deploy my website. I hope this could serve as a guide for someone looking to do something similar or just to enjoy reading this article I created 🙂.

This is the link to my GitHub repo where you can see the project finished: [https://github.com/brandonvilla21/my-blog](https://github.com/brandonvilla21/my-blog)