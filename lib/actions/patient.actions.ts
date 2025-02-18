"use server"

import { ID, Query } from "node-appwrite"
import { DATABASE_ID, databases, ENDPOINT, PATIENT_COLLECTION_ID, PROJECT_ID, storage, users } from '../appwrite.config'
import { parseStringify } from "../utils"
import { BUCKET_ID } from "../appwrite.config"

import { InputFile } from "node-appwrite/file"

export const createUser = async(user: CreateUserParams) => {

  try {
    const newUser = await users.create(
      ID.unique(), 
      user.email, 
      user.phone, 
      undefined, 
      user.name
    )
    console.log({newUser})

    return parseStringify(newUser)
  } catch (error: any) {
    console.log("🚀 ~ createUser ~ error:", error)
    if(error && error?.code === 409){
      const documents = await users.list([
        Query.equal('email', [user.email])
      ])

      return documents?.users[0]
    }
  }
}

export const getUser = async(userId: string) => {
  try {
    const user = await users.get(userId)
    
    return parseStringify(user)
  } catch (error) {
    console.log(error)
  }
}

console.log("🚀 ~ registerPatient ~ BUCKET_ID:", BUCKET_ID)
export const registerPatient = async({identificationDocument, ...patient}: RegisterUserParams) => {
  try {
    let file

    if(identificationDocument){
      const inputfile = InputFile.fromBuffer(
        identificationDocument?.get('blobFile') as Blob,
        identificationDocument?.get('name') as string,
      )

      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputfile)
    }
    console.log(`${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`)
    
    const newPatient = await databases.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id || null,
        identificationDocumentUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
        ...patient
      }
    )

    return parseStringify(newPatient)
  } catch (error) {
    console.log(error)
  }
}