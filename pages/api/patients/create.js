import { v4 as uuidv4 } from "uuid";
import { createPatient } from "../../../lib/store";

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { first_name, last_name, phone, email, dob } = req.body;
  if (!first_name || !last_name || !phone || !email || !dob) {
    return res.status(400).json({ error: "first_name, last_name, phone, email, and dob are required" });
  }

  const patient = createPatient({ id: uuidv4(), first_name, last_name, phone, email, dob });

  return res.status(201).json({ patient_id: patient.id });
}
