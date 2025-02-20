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
import { FormFieldTypes } from "./PatientForm";
import { Doctors } from "@/constants";
import { SelectItem } from "../ui/select";
import Image from 'next/image'


const AppointmentForm = ({ userId, patientId, type}: {
  userId: string
  patientId: string
  type: "create" | "cancel"
}) => {
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
          <h1 className="header">Nova Consulta</h1>
          <p className="text-dark-700">Solicite sua nova consulta em segundos</p>
        </section>

        { type !== "cancel" && (
          <>
            <CustomFormField
              fieldType={FormFieldTypes.SELECT} 
              control={form.control}
              name="primaryPhysician"
              label="Médico de família"
              placeholder="Selecione um médico"
            >
              {Doctors.map((doctor, i) => (
                <SelectItem key={doctor.name + i} value={doctor.name}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={doctor.image}
                      width={32}
                      height={32}
                      alt="doctor"
                      className="rounded-full border border-dark-500"
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>
          </>
        )}


        <SubmitButton isLoading={isLoading}>Começar</SubmitButton>
      </form>
    </Form>
  )
}

export default AppointmentForm

