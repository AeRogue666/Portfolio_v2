export function contactTemplate(email: string, message: string) {
    return `
    <div style="font-family: Inter, sans-serif; padding: 24px">
      <h2 style="margin-bottom: 16px;">New Portfolio message</h2>
      <p><strong>From: </strong> ${email}</p>
      <div style="margin-top: 16px; padding: 16px; background:#f5f5f5;">
        <p>${message.replace(/\n/g, '<br>')}</p>
      </div>
    </div>`
}