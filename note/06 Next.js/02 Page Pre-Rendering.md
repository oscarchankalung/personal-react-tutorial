# Page Pre-Rendering

1. Request a page on some route
2. Return pre-rendered page for SEO
3. Hydrate with React code afterward for interactivity

- Two forms of pre-rendering:
  - **Static Site Generation (SSG)**: `getStaticPaths()` and `getStaticProps()`
  - **Server-Side Rendering (SSR)**: `getServerSideProps()`

## Static Site Generation (SSG)

- Executed on the server during the build process
- Need to rebuild and redeploy the page when data changes
- Add incremental static generation for frequent data changes
- Set the `revalidate` props to regenerate the page by seconds

```jsx
// use when data does not change frequently
// use when request object is not needed

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } }
    ],
  };
}

export async function getStaticProps(context) {
  const params = context.params;

  // fetch data from an API
  return {
    props: { ... },
    revalidate: 10,
  };
}
```

## Server-Side Rendering (SSR)

- Executed on the server after deployment
- Regenerate the page for every incoming request
- Provide access to the `request` object

```jsx
// use when data change multiple times every seconds
// use when request object is needed, e.g. authentication

export async function getServerSideProps(context) {
  const req = context.req;
  const res = context.res;

  // fetch data from an API
  return {
    props: { ... },
  };
}
```
