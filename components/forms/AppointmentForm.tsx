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
import { getAppointmentSchema } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createAppointment } from "@/lib/actions/appointment.actions";
import { FormFieldTypes } from "./PatientForm";
import { Doctors } from "@/constants";
import { SelectItem } from "../ui/select";
import Image from 'next/image'


const AppointmentForm = ({ userId, patientId, type}: {
  userId: string
  patientId: string
  type: "create" | "cancel" | "schedule"
}) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const AppointmentFormValidation = getAppointmentSchema(type)

  // 1. Definições de validação de form
  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician:"",
      schedule: new Date(),
      reason: "",
      note: "",
      cancellationReason: ""
    },
  })
 
  async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
    setIsLoading(true)

    let status
    switch (type) {
      case 'schedule':
        status = "scheduled"
        break;
      case 'cancel':
        status = "cancelled"
        break;
      case 'create':
        status = "pending"
        break;
    
      default:
        break;
    }

    try {
      if(type === 'create' && patientId) {
        const appointmentData = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          note: values.note,
          status: status as Status
        }
        const appointment = await createAppointment(appointmentData)

        if(appointment){https://cloud.appwrite.io/console/project-67a5f4f900196de6ffe5/storage
          form.reset()
          router.push(`/patients/new-appointment/sucess?appointmentId=${appointment.id}`)
        }
      }


    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error)
      
    }
  }

  let buttonLabel

  switch (type) {
    case 'cancel':
      buttonLabel = "Cancelar Consulta"      
      break;
    case 'create':
      buttonLabel = "Nova Consulta"
      break;
    case 'schedule':
      buttonLabel = "Agendar Consulta"
      break;

    default:
      break;
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
              label="Médico"
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

            <CustomFormField
              fieldType={FormFieldTypes.DATE_PICKER} 
              control={form.control}
              name="schedule"
              label="Data da Consulta"
              showTimeSelect
              dateFormat="dd/MM/yyyy HH:mm"
            />

            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                fieldType={FormFieldTypes.TEXTAREA} 
                control={form.control}
                name="reason"
                label="Motivo da Consulta"
                placeholder="Descreva o motivo da sua consulta"
              />

              <CustomFormField
                fieldType={FormFieldTypes.TEXTAREA} 
                control={form.control}
                name="note"
                label="Observações"
                placeholder="Adicione observações"
              />
            </div>
          </>
        )}

        { type === "cancel" && (
          <CustomFormField
            fieldType={FormFieldTypes.TEXTAREA} 
            control={form.control}
            name="reason"
            label="Motivo do Cancelamento"
            placeholder="Descreva o motivo do cancelamento"
          />
        )}


        <SubmitButton isLoading={isLoading} className={`${type === "cancel" 
          ? "shad-danger-btn" : "shad-primary-btn"} w-full`}>
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  )
}

export default AppointmentForm

