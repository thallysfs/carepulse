"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl } from "@/components/ui/form"
import { Button } from "../ui/button"
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { PatientFormValidation, UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";
import { FormFieldTypes } from "./patientForm";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Doctors, GenderOptions, IdentificationTypes, PatientFormDefaultValues } from "@/constants";
import { Label } from "../ui/label";
import { SelectItem } from "../ui/select";
import Image from 'next/image'
import { FileUploader } from "../FileUploader";


const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // 1. Definições de validação de form
  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: "",
      email: "",
      phone: "",
    },
  })
 
  async function onSubmit({name, email, phone}: z.infer<typeof PatientFormValidation>) {
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
              return <FormControl>
                <RadioGroup
                  className="flex h-11 gap-6 xl:justify-between"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {GenderOptions.map((option) => (
                    <div key={option} className="radio-group">
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option} className="cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>;
            }}
          /> 
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldTypes.INPUT} 
            control={form.control}
            name="address"
            label="Endereço"
            placeholder="Av, Antônio Sales, 123"
          />

          <CustomFormField
            fieldType={FormFieldTypes.INPUT} 
            control={form.control}
            name="occupation"
            label="Ocupação"
            placeholder="Enegenheiro de software" 
        />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField
            fieldType={FormFieldTypes.INPUT} 
            control={form.control}
            name="emergencyContactName"
            label="Contato de Emergência"
            placeholder="João Silva"
          />

          <CustomFormField
            fieldType={FormFieldTypes.PHONE_INPUT} 
            control={form.control}
            name="emergencyContactNumber"
            label="Número de Emergência"
            placeholder="(85)99999-9999"
          /> 
        </div>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Informações Médicas</h2>
          </div>
        </section>

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


        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
              fieldType={FormFieldTypes.INPUT} 
              control={form.control}
              name="insuranceProvider"
              label="Plano de saúde"
              placeholder="Unimed. Hapvida ..."
            />

            <CustomFormField
              fieldType={FormFieldTypes.INPUT} 
              control={form.control}
              name="insurancePolicyNumber"
              label="Número da cateira de plano de saúde"
              placeholder="0362660651063289" 
            />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldTypes.TEXTAREA} 
              control={form.control}
              name="allergies"
              label="Alergias"
              placeholder="Penicilinam Dipirona etc..."
            />

            <CustomFormField
              fieldType={FormFieldTypes.TEXTAREA} 
              control={form.control}
              name="currentMedication"
              label="Toma alguma medicalção atualmente?"
              placeholder="Ibuprofeno 200mg, Paracetamol 500mg" 
            />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
              fieldType={FormFieldTypes.TEXTAREA} 
              control={form.control}
              name="familyMedicalHistory"
              label="Histórico de doença na família"
              placeholder="minha mãe tem asma, meu pai tem diabetes"
            />

            <CustomFormField
              fieldType={FormFieldTypes.TEXTAREA} 
              control={form.control}
              name="pastMedicalHistory"
              label="Histórico de doenças passadas"
              placeholder="Já tive pneumonia, já fiz cirurgia de apendicite" 
            />
        </div>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identificação e Verificação</h2>
          </div>
        </section>

        <CustomFormField
            fieldType={FormFieldTypes.SELECT} 
            control={form.control}
            name="identificationType"
            label="Tipo de identificação"
            placeholder="Selecione um tipo de identificação"
          >
            {IdentificationTypes.map((type, i) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
        </CustomFormField>

        <CustomFormField
          fieldType={FormFieldTypes.INPUT} 
          control={form.control}
          name="name"
          label="identificationNumber"
          placeholder="123456789"
        />

        <CustomFormField
            fieldType={FormFieldTypes.SKELETON} 
            control={form.control}
            name="identificationDocument"
            label="Digitalização do documento de identificação"
            renderSkeleton={(field) => (
              <FormControl>
                <FileUploader files={field.value} onChange={field.onChange} />
              </FormControl>
            )}
          />

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consentimento e privacidade</h2>
          </div>
        </section>

        <CustomFormField 
          fieldType={FormFieldTypes.CHECKBOX}
          control={form.control}
          name="treatmentConsent"
          label="Aceito os termos"
        />


        <CustomFormField 
          fieldType={FormFieldTypes.CHECKBOX}
          control={form.control}
          name="disclosureConsent"
          label="Eu concordo com a divulgação de informações"
        />


        <CustomFormField 
          fieldType={FormFieldTypes.CHECKBOX}
          control={form.control}
          name="privacyConsent"
          label="Eu concordo com a política de privacidade"
        />
        

        <SubmitButton isLoading={isLoading}>Começar</SubmitButton>
      </form>
    </Form>
  )
}

export default RegisterForm

