import { parseISO, intervalToDuration, formatDuration } from 'date-fns';

const getDurationString = (start: string, end: string) => {
    if (!start || !end) return 'N/A';

    const startDate = parseISO(start);
    const endDate = parseISO(end);

    const duration = intervalToDuration({ start: startDate, end: endDate });

    // Only include months and days for brevity
    return formatDuration(duration, { format: ['months', 'days'] });
};

export default getDurationString;