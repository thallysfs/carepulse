"use server"

import { ID, Query } from "node-appwrite"
import { DATABASE_ID, databases, APPOINTMENT_COLLECTION_ID } from "../appwrite.config"
import { parseStringify } from "../utils"
import { Appointment } from "@/types/appwrite.types"
import { revalidatePath } from "next/cache"

export const createAppointment = async (appointment: CreateAppointmentParams) => {
  try {
    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      {
        ...appointment
      }
    )
    return parseStringify(newAppointment)
  } catch (error) {
    console.log(error)
  }
}

export const getAppointments = async (appointmentId: string) => {
  try {
    const appointments = await databases.getDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId
    )

    return parseStringify(appointments)

  } catch (error) {
    console.log(error)
  }
}

export const getRecentAppoitmentsList = async () => {
  try {
    const appointments = await databases.listDocuments(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [
        Query.orderDesc('$createdAt')
      ]
    )

    const initialCounts = {
      scheduleCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    }

    const counts = (appointments.documents as Appointment[]).reduce((acc, appointment) => {
      if(appointment.status === "scheduled"){
        acc.scheduleCount += 1
      } else if(appointment.status === "pending"){
        acc.pendingCount += 1
      } else if(appointment.status === "cancelled"){
        acc.cancelledCount += 1
      }

      return acc
    }, initialCounts)

    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents
    }

    return parseStringify(data)
  } catch (error) {
    console.log(error)
  }
}

export const updateAppointment = async ({appointmentId, userId, appointment, type}: UpdateAppointmentParams) => {
  try {
    const updatedAppointment = await databases.updateDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      appointment
    )

    if(!updatedAppointment){
      throw new Error("Failed to update appointment")
    }

    // TODO SMS notification

    revalidatePath('/admin')
    return parseStringify(updatedAppointment)
  } catch (error) {
    console.log(error)
    
  }
}