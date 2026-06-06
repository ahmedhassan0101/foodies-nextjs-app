import Image from "next/image";
import classes from "./page.module.css";

export const metadata = {
  title: "Community | NextLevel Food",
  description: "Join our community and share your favorite recipes!",
};

// فصلنا البيانات في Array عشان الكود يكون أنضف وأسهل في التعديل
const COMMUNITY_PERKS = [
  {
    id: "p1",
    icon: "/icons/meal.png",
    title: "Share & discover recipes",
    alt: "A delicious meal",
  },
  {
    id: "p2",
    icon: "/icons/community.png",
    title: "Find new friends & like-minded people",
    alt: "A crowd of people, cooking",
  },
  {
    id: "p3",
    icon: "/icons/events.png",
    title: "Participate in exclusive events",
    alt: "A crowd of people at a cooking event",
  },
];

export default function CommunityPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          One shared passion: <span className={classes.highlight}>Food</span>
        </h1>
        <p>Join our community and share your favorite recipes!</p>
      </header>

      <main className={classes.main}>
        <h2>Community Perks</h2>
        <ul className={classes.perks}>
          {COMMUNITY_PERKS.map((perk) => (
            <li key={perk.id} className={classes.perkCard}>
              <Image
                src={perk.icon}
                width={80}
                height={80}
                alt={perk.alt}
              />
              <p>{perk.title}</p>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}