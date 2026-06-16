export function contactTemplate(data: {
  message: string;
  type: "message";
  email: string;
  website?: string | undefined;
}) {
  return `
    <div style="font-family:Manrope,sans-serif;padding:1.25rem;">
      <h2 style="margin-bottom:1rem;">Nouveau message</h2>
      <p>
      <strong>Email:</strong>
      ${data.email}
      </p>
      <div style="margin-top:1rem;padding:0.75rem;background:#f5f5f5;">
        <p>${data.message.replace(/\n/g, "<br>")}</p>
      </div>
    </div>`;
}
