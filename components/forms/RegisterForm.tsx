"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button"
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";
import { FormFieldTypes } from "./patientForm";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { GenderOptions } from "@/constants";
import { Label } from "../ui/label";


const RegisterForm = ({ user }: { user: User }) => {
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-12">
        <section className="space-y-4">
          <h1 className="header">Bem vindo</h1>
          <p className="text-dark-700">Nos conte mais sobre você</p>

        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Informações Pessoais</h2>
          </div>
        </section>

        <CustomFormField
          fieldType={FormFieldTypes.INPUT} 
          control={form.control}
          name="name"
          label="Nome Completo"
          placeholder="Maria Silva"
          iconSrc="/assets/icons/user.svg"
          iconAlt="User icon"
        />

        <div className="flex flex-col gap-6 xl:flex-row">
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
            placeholder="(85)99999-9999"
          /> 
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldTypes.DATE_PICKER} 
            control={form.control}
            name="birthDate"
            label="Data de Nascimento"
          />

          <CustomFormField
            fieldType={FormFieldTypes.SKELETON} 
            control={form.control}
            name="gender"
            label="Gênero"
            renderSkeleton={(field) => {
              <FormControl>
                <RadioGroup 
                  className="flex h-11 gap-6 xl:justify-between"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {
                    GenderOptions.map((option) =>(
                      <div key={option} className="radio-group">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))
                  }
                </RadioGroup>

              </FormControl>
            }}
          /> 
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
        
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
        
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
        
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
        
        </div>

        <SubmitButton isLoading={isLoading}>Começar</SubmitButton>
      </form>
    </Form>
  )
}

export default RegisterForm

