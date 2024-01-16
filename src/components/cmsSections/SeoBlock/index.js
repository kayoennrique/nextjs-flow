import Head from 'next/head';

export function SEOBlock(props) {
  return (
    <Head>
      <title>{props.title}</title>
    </Head>
  );
}
