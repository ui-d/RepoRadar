/**
 * function to get last week date
 * @returns {string} last week date
 */

export const getLastWeekDate = (): string => {
    const lastWeek = new Date()
    lastWeek.setDate(lastWeek.getDate() - 7)
    return lastWeek.toISOString().split('T')[0]
}
