import { findPatientByName } from "../../../lib/store";

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { first_name, last_name } = req.body;
  if (!first_name || !last_name) {
    return res.status(400).json({ error: "first_name and last_name are required" });
  }

  const patient = findPatientByName(first_name, last_name);
  if (!patient) {
    return res.status(404).json({ error: "Patient not found" });
  }

  return res.status(200).json({
    patient_id: patient.id,
    dob: patient.dob,
    phone: patient.phone,
  });
}
