import * as sdk from "node-appwrite";

// export const {
//   NEXT_PUBLIC_ENDPOINT: ENDPOINT,
//   PROJECT_ID,
//   API_KEY,
//   DATABASE_ID,
//   PATIENT_COLLECTION_ID,
//   DOCTOR_COLLECTION_ID,
//   APPOINTMENT_COLLECTION_ID,
//   NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
// } = process.env;

const PROJECT_ID="67a5f4f900196de6ffe5"
const API_KEY="standard_ea4c7f2088775fcf33d06437a777782aa45c0d16ae17beb345664558efc637d3f5f3532d813f497ca90a5c96517f7aac201ccbfe0930b106d376997c0bca832e695d8568044882aac97a8156ea2dd57f4bb042095aa2072fc769d780068c178569a384f4ef3b99d0b302a0ca1367c78268c5c0972b420893fbe1874d2643a6e9"
const DATABASE_ID="67a5f5d200256bf3f036"
const PATIENT_COLLECTION_ID="67a5f602002974cc9de8"
const DOCTOR_COLLECTION_ID="67a5f642003afd3f5f1b" 
const APPOINTMENT_COLLECTION_ID="67a94e1b0021f459fa0e"
const NEXT_PUBLIC_BUCKET_ID="67a9501e0009cddf765b"
const ENDPOINT="https://cloud.appwrite.io/v1"

const client = new sdk.Client();

if (!ENDPOINT || !PROJECT_ID || !API_KEY) {
  throw new Error("Variáveis de ambiente obrigatórias não definidas.");
}

client.setEndpoint(ENDPOINT!).setProject(PROJECT_ID!).setKey(API_KEY!);

export const databases = new sdk.Databases(client);
export const users = new sdk.Users(client);
export const messaging = new sdk.Messaging(client);
export const storage = new sdk.Storage(client);