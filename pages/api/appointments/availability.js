import { getAvailableSlots, DURATIONS } from "../../../lib/store";

const VALID_TYPES = Object.keys(DURATIONS);

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { appointment_type, patient_id } = req.body;
  if (!appointment_type || !patient_id) {
    return res.status(400).json({ error: "appointment_type and patient_id are required" });
  }
  if (!VALID_TYPES.includes(appointment_type)) {
    return res.status(400).json({ error: `appointment_type must be one of: ${VALID_TYPES.join(", ")}` });
  }

  const slots = getAvailableSlots(appointment_type);
  return res.status(200).json({ slots });
}
