import { SectionSchema, type Section } from "@/types"

import { FormProvider, useForm, type SubmitHandler } from "react-hook-form"
import { typeboxResolver } from "@hookform/resolvers/typebox"


import { Button } from "../ui/button"
import { ControlledInput } from "../ui/form"

type Props = {
  onSubmit: SubmitHandler<Section>
  onCancel?: VoidFunction
  initialValues?: Section
  isLoading?: boolean;
}

export function SectionForm({ onSubmit, onCancel, initialValues, isLoading = false }: Props) {
  const form = useForm({
    resolver: typeboxResolver(SectionSchema),
    defaultValues: {
      id: initialValues?.id ?? 0,
      position: initialValues?.position ?? 0,
      title: initialValues?.title ?? ""
    },
  })

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FormProvider {...form}>
        <ControlledInput
          label="Title"
          name="title"
          placeholder="e.g., Media"
          register={form.register}
          error={form.formState.errors.title}
          type="text"
          autoFocus
        />

        <input type="hidden" {...form.register("id", { valueAsNumber: true })} />
        <input type="hidden" {...form.register("position", { valueAsNumber: true })} />

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
