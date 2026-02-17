export function logEvent(event: string, data: Record<string, any>) {
  console.log(
    JSON.stringify({
      event,
      ...data,
      timestamp: new Date().toISOString()
    })
  );
}
