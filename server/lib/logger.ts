export function logEvent(event: string, data: any) {
  console.log(
    JSON.stringify({
      event,
      ...data,
      timestamp: new Date() // .toISOString()
    })
  );
}
