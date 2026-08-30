import { getIcon } from "@/lib/icons";

/** Renders a content-defined icon by its registry name. */
export function Icon({
  name,
  className,
}: {
  name: string | undefined | null;
  className?: string;
}) {
  const Component = getIcon(name);
  return <Component className={className} aria-hidden />;
}
