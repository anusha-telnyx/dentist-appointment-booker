// In-memory store — data resets on each cold start.
// Replace these with real DB queries when ready.

const patients = new Map();
const appointments = new Map();

export function findPatientByName(firstName, lastName) {
  for (const patient of patients.values()) {
    if (
      patient.first_name.toLowerCase() === firstName.toLowerCase() &&
      patient.last_name.toLowerCase() === lastName.toLowerCase()
    ) {
      return patient;
    }
  }
  return null;
}

export function createPatient({ id, first_name, last_name, phone, email, dob }) {
  const patient = { id, first_name, last_name, phone, email, dob };
  patients.set(id, patient);
  return patient;
}

export const DURATIONS = {
  routine_cleaning: 45,
  emergency: 30,
  consultation: 60,
};

export function getAvailableSlots(appointmentType) {
  const slots = [];
  const base = new Date();
  base.setDate(base.getDate() + 1);
  base.setHours(9, 0, 0, 0);

  const times = ["09:00", "14:00", "16:30"];
  for (let i = 0; i < 3; i++) {
    const d = new Date(base);
    d.setDate(d.getDate() + i);
    const [h, m] = times[i].split(":").map(Number);
    d.setHours(h, m, 0, 0);
    slots.push({
      datetime: d.toISOString(),
      label: d.toLocaleString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }),
      duration_minutes: DURATIONS[appointmentType] ?? 45,
    });
  }
  return slots;
}

export function bookAppointment({ id, patient_id, appointment_type, slot_datetime }) {
  const record = { id, patient_id, appointment_type, slot_datetime, booked_at: new Date().toISOString() };
  appointments.set(id, record);
  return record;
}
