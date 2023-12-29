import dynamic from "next/dynamic";

const LayoutComponent = dynamic(() => import("@/layout"));

export default function DetailNotes({ notes }) {
  console.log("data detail notes =>", notes);
  return (
    <LayoutComponent metaTitle="Detail Notes">
      <div style={{ border: "1px solid black", margin: "10px" }}>
        <p>tittle : {notes.data.title}</p>
        <p>desc : {notes.data.description}</p>
        <p>create at : {notes.data.created_at}</p>
      </div>
    </LayoutComponent>
  );
}

export async function getStaticPaths() {
  const res = await fetch("https://simpeg-be.vercel.app/api/v2/notes");
  const notes = await res.json();

  const paths = notes.data.map((item) => ({
    params: {
      id: item.id,
    },
  }));
  return {
    paths,
    fallback: false, // false or "blocking"
  };
}

export async function getStaticProps(context) {
  const { id } = context.params;
  const res = await fetch(`https://simpeg-be.vercel.app/api/v2/notes/${id}`);
  const notes = await res.json();
  return { props: { notes }, revalidate: 10 };
}
