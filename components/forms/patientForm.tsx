"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button"
import CustomFormField from "../CustomFormField";

export enum FormFieldTypes {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}
 
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})
 
const PatientForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })
 
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Olá!</h1>
          <p className="text-dark-700">Agende seu primeiro atendimento</p>

        </section>

        <CustomFormField
          fieldType={FormFieldTypes.INPUT} 
          control={form.control}
          name="name"
          label="Nome completo"
          placeholder="Maria Silva"
          iconSrc="/assets/icons/user.svg"
          iconAlt="User icon"
        />

        <CustomFormField
          fieldType={FormFieldTypes.INPUT} 
          control={form.control}
          name="email"
          label="Email"
          placeholder="maria.silva@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

<CustomFormField
          fieldType={FormFieldTypes.PHONE_INPUT} 
          control={form.control}
          name="phone"
          label="Telefone"
          placeholder="(85) 99999-9999"
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default PatientForm

