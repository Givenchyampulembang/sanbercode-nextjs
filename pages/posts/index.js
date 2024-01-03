import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";

const LayoutComponent = dynamic(() => import("@/layout"));

export default function Notes({ req }) {
  console.log("data posts => ", req);
  return (
    <>
      <LayoutComponent metaTitle="Posts">
        {req.data.map((item) => (
          <div style={{ border: "1px solid black", marginBottom: "10px" }}>
            <p>id : {item.id}</p>
            <p>
              <b>Title : {item.title}</b>
            </p>
            <p> Description : {item.description}</p>
            <p> create_at : {item.created_at}</p>

            <br></br>
          </div>
        ))}
      </LayoutComponent>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes`);
  const req = await res.json();
  return { props: { req } };
}
