"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  FaArrowUpRightFromSquare,
  FaFloppyDisk,
  FaPlus,
  FaRotateLeft,
  FaSpinner,
} from "react-icons/fa6";

import {
  ColorInput,
  FieldShell,
  HeadingHint,
  IconInput,
  ImageInput,
  ListItemCard,
  SelectInput,
  StringListInput,
  SwitchInput,
  TextAreaInput,
  TextInput,
  inputClass,
} from "@/components/admin/field-inputs";
import { Button } from "@/components/ui/button";
import { apiFetch, getPath, joinPath, setPath } from "@/lib/admin/client";
import type { FieldSpec, SectionSpec } from "@/lib/content/fields";
import type { ContentSection } from "@/lib/content/schema";
import { cn } from "@/lib/utils";

/**
 * One editor for every content section, driven by the field specs. It holds the
 * whole section as a single object in state and writes through dotted paths, so
 * adding a field to a spec is all it takes for it to become editable.
 */
export function SectionEditor({
  section,
  spec,
  initial,
}: {
  section: ContentSection;
  spec: SectionSpec;
  initial: Record<string, unknown>;
}) {
  const router = useRouter();
  const [value, setValue] = React.useState(initial);
  const [saved, setSaved] = React.useState(initial);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [saving, setSaving] = React.useState(false);
  const [resetting, setResetting] = React.useState(false);

  const dirty = React.useMemo(
    () => JSON.stringify(value) !== JSON.stringify(saved),
    [value, saved],
  );

  // Closing the tab mid-edit should not silently drop the work.
  React.useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const update = React.useCallback((path: string, next: unknown) => {
    setValue((current) => setPath(current, path, next));
    setErrors((current) => {
      if (!(path in current)) return current;
      const { [path]: _removed, ...rest } = current;
      return rest;
    });
  }, []);

  async function save() {
    setSaving(true);
    setErrors({});

    const result = await apiFetch<{ content: Record<string, unknown> }>(
      `/api/admin/content/${section}`,
      { method: "PUT", json: value },
    );

    setSaving(false);

    if (!result.ok) {
      setErrors(result.fields ?? {});
      toast.error(result.error);
      return;
    }

    setValue(result.data.content);
    setSaved(result.data.content);
    toast.success(`${spec.label} saved. The site is updated.`);
    router.refresh();
  }

  async function restoreDefaults() {
    if (
      !window.confirm(
        `Restore "${spec.label}" to the copy the site ships with? Your edits to this section will be lost.`,
      )
    ) {
      return;
    }

    setResetting(true);
    const result = await apiFetch<{ content: Record<string, unknown> }>(
      `/api/admin/content/${section}`,
      { method: "DELETE" },
    );
    setResetting(false);

    if (!result.ok) {
      toast.error(result.error);
      return;
    }

    setValue(result.data.content);
    setSaved(result.data.content);
    setErrors({});
    toast.success("Restored to the shipped defaults.");
    router.refresh();
  }

  return (
    <div className="pb-28">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-[640px]">
          <h1 className="text-[1.6rem] font-bold tracking-[-0.02em] text-ink">
            {spec.label}
          </h1>
          <p className="mt-1 text-[0.9rem] leading-[1.7] text-slate-500">
            {spec.description}
          </p>
        </div>

        <Button asChild variant="outline" size="sm">
          <Link href={spec.preview} target="_blank" rel="noreferrer">
            View page <FaArrowUpRightFromSquare />
          </Link>
        </Button>
      </div>

      <div className="space-y-5">
        {spec.fields.map((field, index) => (
          <Field
            key={`${field.name}-${index}`}
            spec={field}
            path={field.name}
            value={value}
            errors={errors}
            onChange={update}
            top
          />
        ))}
      </div>

      {/* Sticky so the save button is reachable from anywhere in a long form. */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur lg:left-[260px]">
        <div className="mx-auto flex max-w-[900px] flex-wrap items-center justify-between gap-3 px-5 py-3">
          <p className="text-[0.82rem] text-slate-500">
            {dirty ? (
              <span className="font-semibold text-amber-600">
                Unsaved changes
              </span>
            ) : (
              "All changes saved"
            )}
          </p>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={restoreDefaults}
              disabled={resetting || saving}
            >
              {resetting ? <FaSpinner className="animate-spin" /> : <FaRotateLeft />}
              Restore defaults
            </Button>
            <Button
              type="button"
              variant="brand"
              size="pill"
              onClick={save}
              disabled={saving || !dirty}
              className="px-6 py-2 text-[0.9rem]"
            >
              {saving ? <FaSpinner className="animate-spin" /> : <FaFloppyDisk />}
              Save changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  spec,
  path,
  value,
  errors,
  onChange,
  top = false,
}: {
  spec: FieldSpec;
  path: string;
  value: unknown;
  errors: Record<string, string>;
  onChange: (path: string, next: unknown) => void;
  top?: boolean;
}) {
  const current = getPath(value, path);
  const error = errors[path];
  const id = `field-${path.replace(/\./g, "-")}`;
  const set = (next: unknown) => onChange(path, next);

  switch (spec.kind) {
    case "group":
      return (
        <fieldset
          className={cn(
            "rounded-2xl border border-slate-200 bg-white p-5",
            top ? "shadow-[0_2px_12px_-8px_rgb(15_23_42_/_0.3)]" : "bg-slate-50/60",
          )}
        >
          <legend className="px-1 text-[0.95rem] font-bold tracking-[-0.01em] text-ink">
            {spec.label}
          </legend>
          {spec.help ? (
            <p className="mb-4 text-[0.8rem] leading-[1.6] text-slate-500">
              {spec.help}
            </p>
          ) : (
            <div className="mb-4" />
          )}
          <div
            className={cn(
              "space-y-4",
              spec.columns === 2 && "grid gap-4 space-y-0 sm:grid-cols-2",
            )}
          >
            {spec.fields.map((child, index) => (
              <Field
                key={`${child.name}-${index}`}
                spec={child}
                path={joinPath(path, child.name)}
                value={value}
                errors={errors}
                onChange={onChange}
              />
            ))}
          </div>
        </fieldset>
      );

    case "list": {
      const items = Array.isArray(current) ? current : [];

      const move = (from: number, to: number) => {
        if (to < 0 || to >= items.length) return;
        const next = [...items];
        const [item] = next.splice(from, 1);
        next.splice(to, 0, item);
        set(next);
      };

      return (
        <div
          className={cn(
            "rounded-2xl border border-slate-200 bg-white p-5",
            top && "shadow-[0_2px_12px_-8px_rgb(15_23_42_/_0.3)]",
          )}
        >
          <div className="mb-1 flex items-center justify-between gap-3">
            <h3 className="text-[0.95rem] font-bold tracking-[-0.01em] text-ink">
              {spec.label}
            </h3>
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[0.72rem] font-semibold text-slate-500">
              {items.length}
            </span>
          </div>
          {spec.help ? (
            <p className="mb-4 text-[0.8rem] leading-[1.6] text-slate-500">
              {spec.help}
            </p>
          ) : (
            <div className="mb-4" />
          )}

          <div className="space-y-2">
            {items.map((item, index) => (
              <ListItemCard
                key={index}
                index={index}
                count={items.length}
                title={String(
                  (item as Record<string, unknown>)?.[spec.titleKey] ?? "",
                )}
                onMove={(to) => move(index, to)}
                onRemove={() => set(items.filter((_, i) => i !== index))}
              >
                {spec.fields.map((child, childIndex) => (
                  <Field
                    key={`${child.name}-${childIndex}`}
                    spec={child}
                    path={joinPath(path, index, child.name)}
                    value={value}
                    errors={errors}
                    onChange={onChange}
                  />
                ))}
              </ListItemCard>
            ))}
          </div>

          {error ? (
            <p role="alert" className="mt-2 text-[0.75rem] text-destructive">
              {error}
            </p>
          ) : null}

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-3"
            onClick={() =>
              set([...items, structuredClone(spec.blank)])
            }
          >
            <FaPlus /> {spec.addLabel}
          </Button>
        </div>
      );
    }

    case "strings":
      return (
        <FieldShell label={spec.label} help={spec.help} error={error}>
          <StringListInput
            values={(current as string[]) ?? []}
            onChange={set}
            addLabel={spec.addLabel}
          />
        </FieldShell>
      );

    case "textarea":
      return (
        <FieldShell label={spec.label} help={spec.help} error={error} htmlFor={id}>
          <TextAreaInput
            id={id}
            value={String(current ?? "")}
            rows={spec.rows}
            invalid={Boolean(error)}
            onChange={set}
          />
        </FieldShell>
      );

    case "heading":
      return (
        <FieldShell
          label={spec.label}
          help={spec.help ?? "Wrap the highlighted words in [[double brackets]]."}
          error={error}
          htmlFor={id}
        >
          <TextAreaInput
            id={id}
            value={String(current ?? "")}
            rows={2}
            invalid={Boolean(error)}
            onChange={set}
          />
          <HeadingHint value={String(current ?? "")} />
        </FieldShell>
      );

    case "image":
      return (
        <FieldShell
          label={spec.label}
          help={spec.help ?? "A path under /public, or a full https:// URL."}
          error={error}
          htmlFor={id}
        >
          <ImageInput
            id={id}
            value={String(current ?? "")}
            invalid={Boolean(error)}
            onChange={set}
          />
        </FieldShell>
      );

    case "icon":
      return (
        <FieldShell label={spec.label} help={spec.help} error={error}>
          <IconInput value={String(current ?? "")} onChange={set} />
        </FieldShell>
      );

    case "color":
      return (
        <FieldShell label={spec.label} help={spec.help} error={error} htmlFor={id}>
          <ColorInput
            id={id}
            value={String(current ?? "")}
            invalid={Boolean(error)}
            onChange={set}
          />
        </FieldShell>
      );

    case "switch":
      return (
        <div className="flex items-start gap-3">
          <SwitchInput
            id={id}
            value={Boolean(current)}
            onChange={set}
            label={spec.label}
          />
          <div className="min-w-0">
            <label
              htmlFor={id}
              className="block text-[0.85rem] font-semibold text-slate-700"
            >
              {spec.label}
            </label>
            {spec.help ? (
              <p className="text-[0.75rem] leading-[1.5] text-slate-400">
                {spec.help}
              </p>
            ) : null}
          </div>
        </div>
      );

    case "number":
      return (
        <FieldShell label={spec.label} help={spec.help} error={error} htmlFor={id}>
          <input
            id={id}
            type="number"
            min={spec.min}
            max={spec.max}
            value={Number(current ?? 0)}
            aria-invalid={Boolean(error)}
            onChange={(event) => set(Number(event.target.value))}
            className={inputClass}
          />
        </FieldShell>
      );

    case "select":
      return (
        <FieldShell label={spec.label} help={spec.help} error={error} htmlFor={id}>
          <SelectInput
            id={id}
            value={String(current ?? "")}
            options={spec.options}
            onChange={set}
          />
        </FieldShell>
      );

    case "text":
    default:
      return (
        <FieldShell label={spec.label} help={spec.help} error={error} htmlFor={id}>
          <TextInput
            id={id}
            value={String(current ?? "")}
            placeholder={"placeholder" in spec ? spec.placeholder : undefined}
            invalid={Boolean(error)}
            onChange={set}
          />
        </FieldShell>
      );
  }
}
