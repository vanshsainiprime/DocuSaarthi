export type Activity = {
  id: string
  type: 'UPLOAD' | 'RENAME' | 'CATEGORY' | 'DELETE' | 'SHARE'
  message: string
  createdAt: string
}

export function getActivities(
  userId: string,
): Activity[] {
  const saved =
    localStorage.getItem(
      `docusaarthi-activity-${userId}`,
    )

  if (!saved) {
    return []
  }

  try {
    const activities = JSON.parse(saved)

    if (Array.isArray(activities)) {
      return activities
    }

    return []
  } catch {
    return []
  }
}

export function addActivity(
  userId: string,
  type: Activity['type'],
  message: string,
): void {
  const activities =
    getActivities(userId)

  const newActivity: Activity = {
    id: crypto.randomUUID(),
    type,
    message,
    createdAt:
      new Date().toISOString(),
  }

  const updatedActivities = [
    newActivity,
    ...activities,
  ].slice(0, 10)

  localStorage.setItem(
    `docusaarthi-activity-${userId}`,
    JSON.stringify(
      updatedActivities,
    ),
  )
}