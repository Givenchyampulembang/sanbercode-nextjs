import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";

const LayoutComponent = dynamic(() => import("@/layout"));

export default function Notes({ req }) {
  console.log("data posts => ", req);
  return (
    <>
      <LayoutComponent metaTitle="Posts">
        {req.hero.map((item) => (
          <div style={{ border: "1px solid black", marginBottom: "10px" }}>
            <p>id : {item.hero_id}</p>
            <p>
              <b>Nama Hero : {item.hero_name}</b>
            </p>
            <p> Role Hero : {item.hero_role}</p>
            <p> Hero Specialis : {item.hero_specially}</p>

            <br></br>
          </div>
        ))}
      </LayoutComponent>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch("https://api.dazelpro.com/mobile-legends/hero");
  const req = await res.json();
  return { props: { req } };
}
