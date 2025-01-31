import Container from "../general/container";

export default function Footer() {
  return (
    <footer className="mt-8 mb-4  bottom-0 text-zinc-400">
      <Container className="flex justify-between items-center">
        <p className="text-sm">
          tooodooo &copy; {new Date().getFullYear()}. All rights reserved.
        </p>
        <p className="text-sm">Created by Sahil with NextJS, Xata & Clerk.</p>
      </Container>
    </footer>
  );
}
