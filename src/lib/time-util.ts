export const isTimeWithinRange = (startTime: string, endTime: string) => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);

  const nowMinutes = currentHour * 60 + currentMinute;
  const startMinutes = startHour * 60 + startMinute;
  const endMinutes = endHour * 60 + endMinute;

  console.log("Current Minutes:", nowMinutes);
  console.log("Start Minutes:", startMinutes);
  console.log("End Minutes:", endMinutes);
  console.log("Is Available:", nowMinutes >= startMinutes && nowMinutes <= endMinutes);

  return nowMinutes >= startMinutes && nowMinutes <= endMinutes;
};