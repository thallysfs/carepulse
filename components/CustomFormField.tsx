"use client"

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "./ui/input"
import { Control } from "react-hook-form"
import { FormFieldTypes } from "./forms/patientForm"

interface CustomProps {
  control: Control<any>,
  fieldType: FormFieldTypes,
  name: string,
  label?: string,
  placeholder?: string,
  iconSrc?: string,
  iconAlt?: string,
  disabled?: boolean,
  dateFormat?: string,
  showTimeSelect?: boolean,
  children?: React.ReactNode,
  renderSkeleton?: (field: any) => React.ReactNode,

}

const RenderField = ({field, props}: {field: any; props: CustomProps }) =>{
  return (
    <Input
      type="text"
      placeholder="John Doe"
    />
  )
}

const CustomFormField = (props: CustomProps) => {
  const {
    control,
    fieldType,
    name,
    label,
  } = props
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          { fieldType === FormFieldTypes.CHECKBOX && label && (
        <FormLabel>{label}</FormLabel>
      )}

      <RenderField field={field} props={props} />

  </FormItem>
)}
/>
  )
}

export default CustomFormField