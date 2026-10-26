import { RobotMarsSection } from "@/components/dom/RobotMarsSection";

export default function Home() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
          3D in a Next.js page
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted">
          The canvas lives in its section and scrolls with the page. Scroll down.
        </p>
      </section>

      <RobotMarsSection />

      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <h2 className="text-2xl font-semibold">The page keeps scrolling</h2>
        <p className="mt-4 max-w-xl text-muted">
          The scene mounts only near the viewport and unmounts when it leaves.
        </p>
      </section>

      <footer className="border-t border-border">
        <p className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted sm:px-6">
          3D by{" "}
          <a
            href="https://tridimotion.com"
            target="_blank"
            rel="noopener"
            className="font-medium text-foreground underline underline-offset-4 hover:text-muted"
          >
            Tridimotion Studio
          </a>
        </p>
      </footer>
    </main>
  );
}
