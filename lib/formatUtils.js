export function formatData(data, containVolunteers = false) {
  if (containVolunteers) {
    return data.reduce(
      (result, user) => {
        if (user?.reports) {
          result.reports.push(...user.reports);
        }
        if (user?.volunteeringForms) {
          result.volunteeringForms.push(...user.volunteeringForms);
        }
        return result;
      },
      { reports: [], volunteeringForms: [] }
    );
  } else {
    return data.reduce((result, user) => {
      if (user?.reports) {
        result.push(...user.reports);
      }
      if (user?.volunteeringForms) return result;
    }, []);
  }
}

export function capitalizeFirstLetter(string) {
  if (!string) return string;
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getVolunteerFormData(data) {
  return data.reduce((result, user) => {
    let userForms = [];
    if (user?.volunteeringForms) {
      user.volunteeringForms.forEach((form) => {
        userForms.push({ ...form, username: user.username });
      });
      result.push(...userForms);
    }
    return result;
  }, []);
}
