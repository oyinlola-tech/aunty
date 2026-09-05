import Link from "next/link";
import { Soup } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="flex size-20 items-center justify-center rounded-full bg-cream-deep">
        <Soup className="size-10 text-palace-orange" />
      </div>
      <h1 className="mt-6 font-heading text-3xl font-bold text-bean-black">
        Page Not Found
      </h1>
      <p className="mt-2 max-w-sm text-warm-grey">
        Oops! Looks like this page got eaten. Let&apos;s get you back to the menu.
      </p>
      <div className="mt-6 flex gap-3">
        <Link href="/">
          <Button variant="default">Go Home</Button>
        </Link>
        <Link href="/menu">
          <Button variant="outline">View Menu</Button>
        </Link>
      </div>
    </section>
  );
}
