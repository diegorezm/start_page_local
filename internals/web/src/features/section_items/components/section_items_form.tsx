import { Button } from "@/components/ui/button";
import { ControlledInput } from "@/components/ui/form";
import { useGetAllSections } from "@/features/sections/api/get";
import { SectionItemSchema, type Section, type SectionItem } from "@/types";
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from "@headlessui/react";
import { typeboxResolver } from "@hookform/resolvers/typebox";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";

type Props = {
  onSubmit: SubmitHandler<SectionItem>
  onCancel?: VoidFunction
  initialValues?: SectionItem
  isLoading?: boolean;
}

export function SectionItemsForm({ onSubmit, onCancel, initialValues, isLoading = false }: Props) {
  const { data: sections = [], isLoading: isGetAllSectionsLoading, isError: isGetAllSectionError } = useGetAllSections()

  const form = useForm({
    resolver: typeboxResolver(SectionItemSchema),
    defaultValues: {
      id: initialValues?.id ?? 0,
      title: initialValues?.title ?? "",
      section_id: initialValues?.section_id ?? 0,
      url: initialValues?.url ?? ""
    },
  })
  const [query, setQuery] = useState("")

  const selectedSectionId = form.watch("section_id")
  const selectedSection = useMemo(() => sections.find(s => s.id === selectedSectionId) ?? null, [sections, selectedSectionId])

  const filteredSections = useMemo(() => {
    return query === ""
      ? sections
      : sections.filter(s =>
        s.title.toLowerCase().includes(query.toLowerCase())
      )
  }, [sections, query])

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FormProvider {...form}>
        <ControlledInput
          label="Title"
          name="title"
          placeholder="e.g., Github"
          register={form.register}
          error={form.formState.errors.title}
          type="text"
          autoFocus
        />

        <ControlledInput
          label="URL"
          name="url"
          placeholder="e.g., https://github.com"
          register={form.register}
          error={form.formState.errors.url}
          type="url"
        />


        <div className="w-full">
          <label className="block text-sm font-medium mb-1 text-foreground">Section</label>
          <Combobox
            value={selectedSection}
            onChange={(section) => {
              if (section) {
                form.setValue("section_id", section.id)
              }
            }}
            disabled={isGetAllSectionsLoading || isGetAllSectionError}
          >
            <div className="relative">
              <ComboboxInput
                className="w-full border border-foreground bg-surface text-on-surface rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                displayValue={(section: Section) => section?.title ?? ""}
                onChange={(event) => setQuery(event.target.value)}
              />
              <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronsUpDownIcon className="h-5 w-5 text-on-surface" aria-hidden="true" />
              </ComboboxButton>

              <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-surface py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {filteredSections.length === 0 && query !== "" ? (
                  <div className="relative cursor-default select-none px-4 py-2 text-on-surface">
                    Nothing found.
                  </div>
                ) : (
                  filteredSections.map((section) => (
                    <ComboboxOption
                      key={section.id}
                      className={({ focus }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${focus ? "bg-secondary text-on-secondary" : "text-on-surface"
                        }`
                      }
                      value={section}
                    >
                      {({ selected, focus }) => (
                        <>
                          <span
                            className={`block truncate ${selected ? "font-semibold" : "font-normal"
                              }`}
                          >
                            {section.title}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${focus ? "text-on-secondary" : "text-on-surface"
                                }`}
                            >
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </ComboboxOption>
                  ))
                )}
              </ComboboxOptions>
            </div>
          </Combobox>
        </div>

        <input type="hidden" {...form.register("id", { valueAsNumber: true })} />

        <div className="flex gap-2 w-2/3 mt-2 justify-start">
          <div>
            <Button type="submit" disabled={isLoading}>
              Submit
            </Button>
          </div>
          {onCancel !== undefined && (
            <div>
              <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
                Cancel
              </Button>
            </div>
          )}
        </div>
      </FormProvider>
    </form>
  )
}
