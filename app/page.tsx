import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <section className="text-center">
        <h1 className="font-display text-5xl font-bold text-stone-200 md:text-6xl">
          Mahabharat Card Explorer
        </h1>
        <p className="mt-4 text-lg text-stone-500">
          Discover the Pandavas and their legendary weapons
        </p>
      </section>

      <section className="mt-16 grid gap-8 md:grid-cols-2">
        <Link
          href="/characters"
          className="group block overflow-hidden rounded-sm border border-stone-600/50 bg-stone-800/80 p-8 transition hover:border-stone-500"
        >
          <h2 className="font-display text-2xl font-semibold text-stone-200 group-hover:text-stone-100">
            Characters
          </h2>
          <p className="mt-2 text-stone-500">
            Explore Pandavas, Kauravas, and key figures—Arjuna, Karna, Krishna, Bhishma, and more
          </p>
        </Link>

        <Link
          href="/weapons"
          className="group block overflow-hidden rounded-sm border border-stone-600/50 bg-stone-800/80 p-8 transition hover:border-stone-500"
        >
          <h2 className="font-display text-2xl font-semibold text-stone-200 group-hover:text-stone-100">
            Weapons
          </h2>
          <p className="mt-2 text-stone-500">
            Discover Astras and Shastras — Gandiva, Brahmastra, Pashupatastra, Gada
          </p>
        </Link>
      </section>
    </div>
  );
}
