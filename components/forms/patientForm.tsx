"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button"
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";

export enum FormFieldTypes {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}


const PatientForm = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // 1. Definições de validação de form
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })
 
  async function onSubmit({name, email, phone}: z.infer<typeof UserFormValidation>) {
    //setIsLoading(true)

    try {
      const userData = {name, email, phone}

      const user = await createUser(userData)

      if(user) router.push(`/patients/${user.$id}/register`)
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error)
      
    }
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

        <SubmitButton isLoading={isLoading}>Começar</SubmitButton>
      </form>
    </Form>
  )
}

export default PatientForm

