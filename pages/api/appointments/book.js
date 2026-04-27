import { v4 as uuidv4 } from "uuid";
import { bookAppointment } from "../../../lib/store";

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { patient_id, appointment_type, slot_datetime } = req.body;
  if (!patient_id || !appointment_type || !slot_datetime) {
    return res.status(400).json({ error: "patient_id, appointment_type, and slot_datetime are required" });
  }

  const numericId = Math.floor(1000 + Math.random() * 9000);
  const confirmation_id = `APT-${numericId}`;

  bookAppointment({
    id: confirmation_id,
    patient_id,
    appointment_type,
    slot_datetime,
  });

  return res.status(201).json({ confirmation_id });
}
